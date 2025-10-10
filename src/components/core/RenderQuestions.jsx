import { useEffect, useRef, useState } from "react";
import Leaderboard from "../utils/Leaderboard";

export default function RenderQuestions({ question, socket, quizId, leaderboardData, token }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [timeleft, setTimeLeft] = useState(0)

    //save ans body
    const saveAnsBody = {
        token: token.current, 
        question_id: question.id,
        quiz_id: parseInt(quizId),
        choosen_ans: selectedOption,
        marks: 0
    }

    //printing save ans body
    // console.log(saveAnsBody)

    //variable for storing whether the question was answered or not
    const quesAnswered = useRef(false)

    const options = [
        { id: "a", text: question.option_a },
        { id: "b", text: question.option_b },
        { id: "c", text: question.option_c },
        { id: "d", text: question.option_d }
    ];

    //variable for showing leaderboard
    const [showLeaderboard, setShowLeaderboard] = useState(false)

    function handleOptionSelect(optionId) {
        setSelectedOption(optionId);
    }

    function handleSubmit() {
        if (selectedOption) {
            console.log("Selected answer:", selectedOption);
            console.log("Correct answer:", question.correct_answer);
            console.log("Points:", question.points_correct);
            if (selectedOption == question.correct_answer) {
                saveAnsBody.marks = 75 + timeleft
            }
        }
        quesAnswered.current = true
        console.log(saveAnsBody)
        socket.current.send(JSON.stringify(saveAnsBody))
    }
    //useEffect for sending a msg to server when question is not answered
    useEffect(() => {
        quesAnswered.current = false
        setShowLeaderboard(false)
        const timerId = setTimeout(() => {
            if (!quesAnswered.current) {
                socket.current.send(JSON.stringify(saveAnsBody))
            }
            console.log("sent trigger for sending leaderboard")
            socket.current.send("send leaderboard")
            setShowLeaderboard(true)
            setSelectedOption("")
        }, 25000)
        return () => {
            clearTimeout(timerId)
        }
    }, [question])

    useEffect(() => {
        setTimeLeft(25)
        const intervalId = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [question])

    return (
        <div>
            {!showLeaderboard &&
                <div className="w-screen h-screen flex justify-center mt-10">
                    <div className="w-[90%] md:w-[60%] shadow-2xl p-6 rounded-lg">
                        <div className="mb-6 flex justify-between items-center pr-3">
                            <div>
                                <h2 className="text-xl font-bold mb-4">{question.question_text}</h2>
                                <p className="text-gray-600 text-sm">Points: {question.points_correct}</p>
                            </div>
                            <div className="rounded-4xl border p-2 border-slate-200">
                                <p className="text-green-600 font-semibold text-2xl"> {timeleft}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            {options.map((option) => (
                                <div
                                    key={option.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedOption === option.id
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    onClick={() => handleOptionSelect(option.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === option.id
                                                    ? "border-blue-500 bg-blue-500"
                                                    : "border-gray-300"
                                                }`}
                                        >
                                            {selectedOption === option.id && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <span className="font-semibold">{option.id}.</span>
                                        <span>{option.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSubmit}
                            disabled={!selectedOption}
                        >
                            Submit Answer
                        </button>
                    </div>
                </div>
            }
            {/* {showLeaderboard && <div className="text-3xl">Leader - Board</div>} */}
            {showLeaderboard && <div>
              <Leaderboard leaderData={leaderboardData.Data} />
                </div>}
        </div>
    );
}
