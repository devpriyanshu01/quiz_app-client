import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { currQuizId, startTrigger } from "../../Store/Store"
import { Trash } from 'lucide-react';
import { Activity } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import Spinner from "../utils/Spinner";
import { Info } from 'lucide-react';


export default function HomePage(){
    const navigate = useNavigate()
    const [myQuizzes, setMyQuizzes] = useState([])
    //from store
    const setQuizId = currQuizId((state) => (state.setQuizId))


    async function handleCreateQuiz(){
      // const res = axios.post(`${import.meta.env.VITE_BASE_URL}/create-quiz`, {withCredentials : true})

      navigate('/create-quiz')
    }

    //variable for rendering loader
    const [spinner, setSpinner] = useState(false)
    
    async function getCreatedQuizzes() {
      setSpinner(true)
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/listmyquizzes`, {withCredentials : true})
      console.log(res.data)
      if (res.data?.length > 0){
        console.log('payload arrived')
        setMyQuizzes(res.data)
      }
      setSpinner(false)
    }

    function addQuestions(quizId) {
      console.log("Quiz Id: ", quizId)
      setQuizId(quizId)
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
      //set trigger for starting quiz
      navigate(`/initquiz/${quiz.id}`)
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
            <div className="flex gap-4 bg-white rounded-lg shadow-md p-6">
              <button
                onClick={handleCreateQuiz}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
              >
                Create New Quiz
              </button>
              <div className="flex items-center gap-1">
                <Info />
                <p className="text-xs">Clicking this button will re-direct you to New Quiz Creation Page</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex gap-5">
              <button
                onClick={getCreatedQuizzes}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
              >
                Show All Saved Quizzes {spinner && <Spinner w={5} h={5} />}
              </button>
              <div className="flex items-center gap-1 justify-center">
                <Info />
                <p className="text-xs">Clicking on this button will list all the quizzes a admin has created.</p>
              </div>
            </div>

            {myQuizzes.length > 0 && (
              <div className="space-y-3">
                <div className="font-extrabold text-2xl text-slate-600 ml-1">My Saved Quizzes</div>
                {myQuizzes.map((quiz, index) => (
                  <div key={quiz.id} className="flex  items-center space-x-2 bg-white rounded-lg shadow-md p-6">
                    <button 
                      onClick={() => addQuestions(quiz.id)}
                      className="flex items-center justify-center gap-5 bg-emerald-400 hover:bg-emerald-500 text-slate-500 hover:text-slate-500 font-bold px-6 py-3 rounded-lg "
                    >
                      {quiz.title} 
                    </button>
                    <div className="relative group flex items-center">
                      <Trash 
                        className="w-11 h-11 bg-slate-300 p-2 rounded-4xl hover:bg-red-400 cursor-pointer" 
                        onClick={() => handleQuizDelete(quiz.id)}
                      />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-12 z-10 hidden group-hover:flex flex-col items-center">
                        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap animate-fade-in">
                          Delete this Quiz
                        </div>
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                    <div className="relative group flex items-center">
                      <ShieldCheck 
                        className="w-11 h-11 bg-slate-300 p-2 rounded-4xl hover:bg-green-400 cursor-pointer" 
                        onClick={() => ActivateQuiz(quiz.id)}
                      />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-12 z-10 hidden group-hover:flex flex-col items-center">
                        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap animate-fade-in">
                          Activate this quiz before starting the quiz.
                        </div>
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
                      </div>
                    </div>
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