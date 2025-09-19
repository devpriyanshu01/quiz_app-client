import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../utils/Spinner";

export default function JoinQuiz(){
  const socket = useRef(null)
  const quizId = useParams()

  const [spinner, setSpinner] = useState(false)

  //handle enter name
  function handleEnterName(){
    setSpinner(true) 
    //call backend - /players/save
  }

    useEffect(() => {
      /*steps
        1. Ask the user to enter his/her name.
        2. Call the backend to create an entry in the db with below body
            {name : "raman kumar", quiz_id : quizId } 
        3. if step 2 is successful then start a websocket connection.
        4. When the owner of the quiz tiggers to start the quiz/questions 
           then questions will be displayed.
        5.   
      */
    //get params
    // Step 1: Connect to WebSocket server
    socket.current = new WebSocket(`ws://localhost:3001/quiz/join/${quizId}`); // Replace with your Go backend URL

    // Step 2: When connection opens
    socket.current.onopen = () => {
      console.log(`Connected to WebSocket for quiz: ${quizId}`);
      socket.current.send(`I'm ${quizId} Client`)
    };

    // Step 3: When a message is received
    socket.current.onmessage = (event) => {
      console.log('📨 Message from server:', event.data);
    };

    // Step 4: Handle errors
    socket.current.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    // Step 5: Cleanup when component unmounts
    return () => {
      socket.current.close();
      console.log('🔌 WebSocket disconnected');
    };
  }, []);


    return (
        <div className="w-screen h-screen flex justify-center mt-10">
          <div className="w-[80%] h-[60%] md:w-[40%] md:h-[30%] shadow-2xl flex flex-col justify-center">
            <input type="text" 
              className="mx-4 my-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transiton-all duration-200"
              placeholder="Enter your name"
            />
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 mx-4 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 font-bold flex justify-center gap-2 items-center"
              onClick={handleEnterName}
            >
              Enter Quiz
              {spinner ? <Spinner w={4} h={4}/> : <div></div>}
            </button>
          </div>
        </div>
    )
}