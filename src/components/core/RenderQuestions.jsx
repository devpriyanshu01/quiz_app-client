import { useState } from "react";

export default function RenderQuestions({ question }) {
    const [selectedOption, setSelectedOption] = useState("");

    const options = [
        { id: "A", text: question.option_a },
        { id: "B", text: question.option_b },
        { id: "C", text: question.option_c },
        { id: "D", text: question.option_d }
    ];

    function handleOptionSelect(optionId) {
        setSelectedOption(optionId);
    }

    function handleSubmit() {
        if (selectedOption) {
            console.log("Selected answer:", selectedOption);
            console.log("Correct answer:", question.correct_answer);
            console.log("Points:", question.points_correct);
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center mt-10">
            <div className="w-[90%] md:w-[60%] shadow-2xl p-6 rounded-lg">
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">{question.question_text}</h2>
                    <p className="text-gray-600 text-sm">Points: {question.points_correct}</p>
                </div>

                <div className="space-y-3 mb-6">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                selectedOption === option.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedOption === option.id
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
    );
}
