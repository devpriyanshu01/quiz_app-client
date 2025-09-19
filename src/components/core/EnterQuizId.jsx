
// File: src/components/WebSocketDemo.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../utils/Spinner';
import axios from 'axios';

export default function EnterQuizId() {
  const navigate = useNavigate()

  //state variable for getting quizId
  const [quizId, setQuizId] = useState(0)
  //spinner rendering
  const [spinner, setSpinner] = useState(false)
  //if entered quiz id is invalid
  const [isQuizIdValid, setIsQuizIdValid] = useState(true)
  async function validateQuizId(){
    setSpinner(true)
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/validate/${quizId}`, {withCredentials : true})
    if (res.data.is_valid){
        console.log(res.data)
        setJoinQuiz(true)
        setSpinner(false)
        navigate(`/join-quiz/${quizId}`) 
    }
  }

  //state variable for entering quizId
  const [joinQuiz, setJoinQuiz] = useState(false)

  

  return (
    <div className="flex justify-center border h-screen w-screen">
        {joinQuiz ? 
        
        (<div></div>) 
        
        :
        
        (<div className="flex flex-col justify-center px-5 py-2 shadow-2xl rounded-lg mt-15 h-[30%] w-[90%] md:h-[30%] md:w-[30%]">
            <input type="text" 
                className = "w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transiton-all duration-200"
                placeholder="Enter Quiz ID"
                onChange={(e) => setQuizId(e.target.value)}
            />
            <button className="flex justify-center items-center gap-2 px-6 py-4 w-full border border-slate-400 rounded-md font-bold text-white my-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={validateQuizId}
            >
                Join Now {spinner ? <Spinner w={5} h={5}/> : <div></div>} 
            </button>
            {isQuizIdValid ? "" : <div>Invalid Quiz Id</div>}
        </div>)}
    </div>
  );
};

