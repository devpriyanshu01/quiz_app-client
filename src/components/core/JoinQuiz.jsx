import { useEffect, useRef, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import Spinner from "../utils/Spinner";
import axios from "axios";
import RenderQuestions from "./RenderQuestions";

export default function JoinQuiz(){
  const socket = useRef(null)
  const params = useParams()
  console.log("below params printing")
  console.log(params)

  const [spinner, setSpinner] = useState(false)
  const [name, setName] = useState("")

  //quiz trigger
  const startTrigger = useRef(false)

  //render question
  const [question, setQuestion] = useState({})
  console.log("logging question updated:")
  console.log(question)

  //render enter name div
  const [nameDiv, setNameDiv] = useState(true)

  //leaderboard data
  const [leaderboardData, setLeaderBoardData] = useState({})
  
  //variable for storing the token
  const tokenCookie = useRef("")

  //navigation variable
  const navigate = useNavigate()

  //variable to wait for the question to arrive
  const [waiting, setWaiting] = useState(false)


  //handle enter name
  async function handleEnterQuiz(){
    setSpinner(true) 
    //call backend - /players/save
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/players/save`, {name : name, quiz_id : parseInt(params.quizId)}, {withCredentials : true})
    if (res.data.success) {
      console.log(res.data)
      tokenCookie.current = res.data.token
      setNameDiv(false)
      setWaiting(true)
      initiateWebsocket()
    }else{
      console.log("no response received")
    }
    setSpinner(false)
  }

  //initate websocket connection
  function initiateWebsocket(){
      // Step 1: Connect to WebSocket server
      // socket.current = new WebSocket(`http://localhost:3001/quiz/join/${params.quizId}`); // Replace with your Go backend URL
      socket.current = new WebSocket(`${import.meta.env.VITE_BASE_URL}/quiz/join/${params.quizId}`); // Replace with your Go backend URL
  
      // Step 2: When connection opens
      socket.current.onopen = () => {
        console.log(`Connected to WebSocket for quiz: ${params.quizId}`);
        socket.current.send(`I'm ${name} for ${params.quizId} Client`)
      };
  
      // Step 3: When a message is received
      socket.current.onmessage = (event) => {
        console.log('📨 Message from server:', event.data)
        const parsedData = JSON.parse(event.data)
        if (parsedData.type == "question"){
          setQuestion(parsedData)
          console.log(parsedData)
        }else if(parsedData.type == "leaderboard"){
          setLeaderBoardData(parsedData)
          console.log("printing leaderboard data")
          console.log(leaderboardData)
        }
        if(event.data == "EOQ"){
          console.log("all questions ended")
          alert("End of Questions")
          //so navigate to enter quiz app 
          navigate("/enter-quizid")
        }
        setWaiting(false)
      };
  
      // Step 4: Handle errors
      socket.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        alert("Websocket Error", error)
      };
  }


    return (
        <div className="w-screen h-screen flex justify-center mt-10">
          {nameDiv && (
            <div className="w-[80%] h-[60%] md:w-[40%] md:h-[30%] shadow-2xl flex flex-col justify-center">
            <input type="text" 
              className="mx-4 my-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transiton-all duration-200"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 mx-4 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 font-bold flex justify-center gap-2 items-center"
              onClick={handleEnterQuiz}
            >
              Enter Quiz
              {spinner ? <Spinner w={4} h={4}/> : <div></div>}
            </button>
          </div>
          )} 

          <div className="flex items-center justify-center">
          {waiting && <div 
            className="font-bold px-2 text-md md:text-xl lg:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Quiz will start soon...
          </div>}

          </div>

          { Object.keys(question).length > 0 && question && <RenderQuestions question = {question} socket={socket} quizId={params.quizId} leaderboardData={leaderboardData} token={tokenCookie}/>}
          
        </div>
    )
}