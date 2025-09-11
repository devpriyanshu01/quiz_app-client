import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { currQuizId } from "../../Store/Store"


export default function HomePage(){
    const navigate = useNavigate()
    const [myQuizzes, setMyQuizzes] = useState([])
    //from store
    const setStore = currQuizId((state) => (state.setQuizId))
    console.log(setStore)
    async function handleCreateQuiz(){
      // const res = axios.post(`${import.meta.env.VITE_BASE_URL}/create-quiz`, {withCredentials : true})

      navigate('/create-quiz')
    }
    
    async function getCreatedQuizzes() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/listmyquizzes`, {withCredentials : true})
      console.log(res.data)
      if (res.data?.length > 0){
        console.log('payload arrived')
        setMyQuizzes(res.data)
      }
    }

    function addQuestions(quizId) {
      setStore(quizId)
      navigate("/add-questions")
    }
    
    return (
      <div>
        <div className="flex flex-col gap-1">
            <button
              onClick={handleCreateQuiz}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Create New Quiz 
            </button>

            <button
              onClick={getCreatedQuizzes}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 py-3 px-4 rounded-lg text-sm font-medium hover:from-emerald-200 hover:to-teal-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Show My Quizzes 
            </button>

            {myQuizzes.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Your Created Quizzes</h2>
                <div className="space-y-3 flex flex-col items-center">
                  {myQuizzes.map((quiz, index) => (
                    <div key={index} onClick={() => (addQuestions(quiz.ID))} className="w-96 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg">
                      {quiz.Title}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    )
}