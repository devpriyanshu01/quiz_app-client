import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { currQuizId } from "../../Store/Store"
import { Trash } from 'lucide-react';
import { Activity } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';


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

    //handle quiz delete
    function handleQuizDelete(quizId) {
      axios.post(`${import.meta.env.VITE_BASE_URL}/quiz/delete`, {quiz_id : quizId}, {withCredentials : true})
    }
    
    //start quiz
    function startQuiz(quiz){
      console.log('quiz data')
      console.log(quiz)
      if (quiz.active) {
        navigate(`/join-quiz/${quiz.id}`)
      }
      console.log(quiz.id)
    }

    //activate quiz
    async function ActivateQuiz(quizId) {
      console.log("activate quiz")
      console.log(quizId)
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/quiz/activate`, {id : quizId}, {withCredentials : true})
      if (res.data) {
        console.log(res.data)
      }
    }
    
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex gap-6 justify-center mt-5">
          {/* Main Content */}
          <div className="flex-1 max-w-2xl space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={handleCreateQuiz}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
              >
                Create New Quiz
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={getCreatedQuizzes}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
              >
                Show All Saved Quizzes
              </button>
            </div>

            {myQuizzes.length > 0 && (
              <div className="space-y-3">
                {myQuizzes.map((quiz, index) => (
                  <div key={index} className="flex  items-center space-x-2 bg-white rounded-lg shadow-md p-6">
                    <button 
                      onClick={() => addQuestions(quiz.ID)}
                      className="flex items-center justify-center gap-5 bg-gradient-to-tr from-slate-500 to-stone-500 hover:from-gray-400 hover:to-stone-400 text-white px-6 py-3 rounded-lg font-medium"
                    >
                      {quiz.title} 
                    </button>
                    <Trash className="w-11 h-11 bg-slate-300 p-2 rounded-4xl hover:bg-red-400" onClick={() => handleQuizDelete(quiz.id)}/>
                    <ShieldCheck className="w-11 h-11 bg-slate-300 p-2 rounded-4xl hover:bg-green-400" onClick={() => ActivateQuiz(quiz.id)}/>
                    <button onClick={() => startQuiz(quiz)} 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
                    >
                      Start Quiz
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-md p-6 h-[55vh] space-y-12">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-blue-600">👤</span>
                <span className="font-medium">User Management</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-blue-600">⚙️</span>
                <span className="font-medium">Settings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}