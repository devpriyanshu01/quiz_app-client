
// File: src/components/WebSocketDemo.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function JoinQuiz() {
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const {quizId} = useParams()
  console.log(quizId)

  useEffect(() => {
    //get params
    // Step 1: Connect to WebSocket server
    socket.current = new WebSocket(`ws://localhost:3001/quiz/join/${quizId}`); // Replace with your Go backend URL

    // Step 2: When connection opens
    socket.current.onopen = () => {
      console.log('✅ Connected to WebSocket');
      socket.current.send('Hello from React!');
    };

    // Step 3: When a message is received
    socket.current.onmessage = (event) => {
      console.log('📨 Message from server:', event.data);
      setMessages((prev) => [...prev, event.data]);
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
    <div>
      <h2>📡 WebSocket Messages</h2>
    </div>
  );
};