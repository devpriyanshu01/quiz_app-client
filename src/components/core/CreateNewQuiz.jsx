import { useState } from "react";
import axios from "axios"

export default function CreateNewQuiz() {
  const [quizTitle, setQuizTitle] = useState({title : ""})
  const [quizData, setQuizData] = useState({})

  async function handleCreateQuiz() {
    // Handle quiz creation logic here
    console.log("Creating quiz:", quizTitle)
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/createquiz`, quizTitle, { withCredentials: true })
    if (res.data.QuizID) {
      console.log(res.data)
      setQuizData(res.data)
    }
  }

  return (
    <div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={quizTitle.title}
          onChange={(e) => setQuizTitle({title : e.target.value})}
          placeholder="Enter quiz title"
          className="w-full py-3 px-4 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200"
        />

        <button
          onClick={handleCreateQuiz}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Create Quiz Now
        </button>
        {Object.keys(quizData).length > 0 ? "Quiz Created" : ""}
      </div>
    </div>
  )
}
