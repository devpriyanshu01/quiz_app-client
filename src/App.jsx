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
        <Route path="/createquiz" element={<CreateQuiz />} />
      </Routes>
    </div>
  )
}

export default App
