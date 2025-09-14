import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/core/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import HomePage from './components/core/HomePage'
import CreateQuiz from './components/core/CreateQuiz'
import CreateNewQuiz from './components/core/CreateNewQuiz'
import AddQuestion from './components/core/AddQuestion'
import JoinQuiz from './components/core/JoinQuiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* {location.pathname !== "/login" && location.pathname !== "signup" && <Navbar />} */}
      <Navbar />
      
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/test-add-questions" element={<CreateQuiz />} />
        <Route path="/add-questions" element={<AddQuestion/>} />

        <Route path="/create-quiz" element={<CreateNewQuiz />} />
        <Route path="/join-quiz/:quizId" element={<JoinQuiz />} />
        
      </Routes>
    </div>
  )
}

export default App
