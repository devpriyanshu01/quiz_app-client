import { useState } from "react";
import axios from "axios"
import Spinner from "../utils/Spinner";
import { CheckCheck } from 'lucide-react';
import { Info } from 'lucide-react';

export default function CreateNewQuiz() {
  const [quizTitle, setQuizTitle] = useState({title : ""})
  const [quizData, setQuizData] = useState({})

  //variable for rendering spinner
  const [spinner, setSpinner] = useState(false)

  async function handleCreateQuiz() {
    // Handle quiz creation logic here
    setSpinner(true)
    console.log("Creating quiz:", quizTitle)
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/createquiz`, quizTitle, { withCredentials: true })
    if (res.data.QuizID) {
      console.log(res.data)
      setQuizData(res.data)
      setSpinner(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-10">

      <div className="flex items-center justify-center flex-col gap-2 mx-4 w-80 md:w-120 ">
        <input
          type="text"
          value={quizTitle.title}
          onChange={(e) => setQuizTitle({title : e.target.value})}
          placeholder="Enter the title of the Quiz"
          className="w-full py-3 px-4 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 transition-all duration-200"
        />

        <button
          onClick={handleCreateQuiz}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-md text-sm font-bold hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Create Quiz Now {spinner && <Spinner w={5} h={5} />}
        </button>
        {Object.keys(quizData).length > 0 ? <div className="flex justify-center items-center gap-1">
          <span className="text-green-600 font-semibold">Quiz Created</span> <CheckCheck />
        </div>: ""}
      </div>
      {/* below div is for info */}
      <div className="flex items-center justify-center gap-2 mx-4 shadow-sm px-6 py-3 mt-3">
          <div><Info /></div>
        <p className="text-xs">Once Quiz is created successfully, Go to Homepage & click on Show Saved Quizes. Then Click on that Quiz and Start adding Questions.</p>
      </div>
    </div>
  )
}
