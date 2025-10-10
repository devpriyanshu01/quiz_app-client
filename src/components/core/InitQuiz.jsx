import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { quizStart } from "../../Store/Store";

export default function InitQuiz(){
const params = useParams()
const socket = useRef()

//establish websocket connection
useEffect(() => {
   initiateWebsocket() 
}, [])

//initate websocket connection
  function initiateWebsocket(){
      // Step 1: Connect to WebSocket server
      // socket.current = new WebSocket(`http://localhost:3001/quiz/join/${params.quizId}`); // Replace with your Go backend URL
      socket.current = new WebSocket(`${import.meta.env.VITE_BASE_URL}/quiz/join/${params.quizId}`); // Replace with your Go backend URL

  
      // Step 2: When connection opens
      socket.current.onopen = () => {
        console.log(`Connected to WebSocket for quiz: ${params.quizId}`);
      };
  
      // Step 3: When a message is received
      socket.current.onmessage = (event) => {
        console.log('📨 Message from server:', event.data)
      };
  
      // Step 4: Handle errors
      socket.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };
  }

  function beginQuestion(){
    socket.current.send("start quiz")
    setTimeout(() => {
        socket.current.send("next ques")
    }, 3000)
  }

    return (
        <div>
            <div>
                <button
                    onClick={beginQuestion} 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-md text-white font-semibold hover:from-blue-700 hover:to-purple-700"
                >Begin Question</button>
            </div>
        </div>
    )
}
