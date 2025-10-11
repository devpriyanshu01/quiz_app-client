import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { quizStart } from "../../Store/Store";

export default function InitQuiz() {
  const params = useParams();
  const socket = useRef();

  //establish websocket connection
  useEffect(() => {
    initiateWebsocket();
  }, []);

  //initate websocket connection
  function initiateWebsocket() {
    // Step 1: Connect to WebSocket server
    // socket.current = new WebSocket(`http://localhost:3001/quiz/join/${params.quizId}`); // Replace with your Go backend URL
    socket.current = new WebSocket(
      `${import.meta.env.VITE_BASE_URL}/quiz/join/${params.quizId}`
    ); // Replace with your Go backend URL

    // Step 2: When connection opens
    socket.current.onopen = () => {
      console.log(`Connected to WebSocket for quiz: ${params.quizId}`);
    };

    // Step 3: When a message is received
    socket.current.onmessage = (event) => {
      console.log("📨 Message from server:", event.data);
    };

    // Step 4: Handle errors
    socket.current.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };
  }

  function beginQuestion() {
    socket.current.send("start quiz");
    setTimeout(() => {
      socket.current.send("next ques");
    }, 3000);
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-8 mb-8 bg-white/80 rounded-2xl shadow-sm border border-blue-100 p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 text-2xl font-bold shadow">
            ℹ️
          </span>
          <h3 className="text-2xl font-bold text-blue-700 tracking-wide">
            Info for Admins/Teachers
          </h3>
        </div>
        <ul className="list-disc pl-8 space-y-2 text-gray-700 text-base">
          <li>
            <span className="font-semibold text-blue-600">Start Quiz:</span>{" "}
            Click the <span className="font-semibold">Initiate Quiz</span>{" "}
            button to begin the quiz session.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Quiz ID:</span> The
            Quiz ID for your selected quiz will be shown here. Share it with
            your students/participants to join.
          </li>
          <li>
            <span className="font-semibold text-blue-600">
              Question Timing:
            </span>{" "}
            After you click <span className="font-semibold">Initiate Quiz</span>
            , questions will appear on students' screens after{" "}
            <span className="font-semibold">45 seconds</span>.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Answer Window:</span>{" "}
            Each question will be available to answer for{" "}
            <span className="font-semibold">25 seconds</span>.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Leaderboard:</span>{" "}
            After each question, the leaderboard will be displayed to all
            participants.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Next Question:</span>{" "}
            The next question will begin automatically after the leaderboard is
            shown.
          </li>
        </ul>
      </div>
        <div className="flex justify-center mb-8">
        <button
          onClick={beginQuestion}
              className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 px-10 py-5 rounded-xl text-white text-2xl font-extrabold shadow-lg hover:from-teal-600 hover:via-cyan-600 hover:to-blue-700 transition-all duration-200"
        >Initiate Quiz</button>
        </div>

        {/* Info for Players/Students */}
        <div className="max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-2xl border border-green-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 text-2xl font-bold shadow">ℹ️</span>
            <h3 className="text-2xl font-bold text-green-700 tracking-wide">Instructions for Students/Participants</h3>
          </div>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 text-base">
            <li>To join the quiz, students/participants should go to <a href="https://quiz-compete.netlify.com/enter-quizid" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">https://quiz-compete.netlify.com/enter-quizid</a></li>
            <li>Enter the <span className="font-semibold text-green-600">QuizId</span> provided by the teacher/quiz-admin.</li>
            <li>Click <span className="font-semibold text-green-600">Join Now</span> Button.</li>
            <li>Students should enter their name & then click <span className="font-semibold text-green-600">Enter Quiz</span>.</li>
            <li>Now students have joined the quiz. <span className="italic text-green-700">"Quiz will Begin soon"</span> prompt confirms this.</li>
            <li>Students will get <span className="font-semibold text-green-600">25s</span> to answer each question.</li>
          </ul>
        </div>
      
      
    </div>
  );
}
