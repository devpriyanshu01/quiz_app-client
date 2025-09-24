import React, { useEffect, useState } from 'react';
import { Menu, X, Play, Trophy, User, LogIn, Axis3DIcon, LogOut, LogOutIcon, LogInIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //is user logged in?
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  async function checkLoginStatus(){
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/validatecookie`, {withCredentials : true})
    
    if (res.data.Valid){
      console.log("user is logged in")
      setIsLoggedIn(true)
    }else {
      console.log("user not logged in")
      setIsLoggedIn(false)
      const path = window.location.pathname
      console.log(path)
      if (path == "/enter-quizid" || path.startsWith("/join-quiz/")){

      }
      else {
        navigate('/login')
      }
    }
    console.log(res.data)
  }
  //check if user is logged in
  useEffect(() => {
      checkLoginStatus()
  }, [isLoggedIn])

  async function handleLoginLogout() {
    if (isLoggedIn) {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`)
      if (res.data.Success) {
        console.log('logout successful')
        console.log(res.data)
        navigate('/login')
      }else {
        console.log('failed to logout')
      }
    }else {
      navigate('/login')
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Play className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LiveQuiz.com
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="flex justify-between items-center">
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/home"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                About
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={handleLoginLogout}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                {/* <LogIn className="h-4 w-4" />
                <span>{isLoggedIn ? "Logout" : "Login"}</span> */}
                <>
                  {isLoggedIn ? <LogOutIcon /> : <LogInIcon />}
                  {isLoggedIn ? <span>Logout</span> : <span>Login</span>}
                </>
              </button>
              <button 
                onClick={handleSignup}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Get Started
              </button>
            </div>
          </div>
          

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                About
              </a>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-2 pb-2 border-t border-gray-100 space-y-1">
                <button className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>{isLoggedIn ? "Logout" : "Login"}</span>
                </button>
                <button 
                  onClick={handleSignup}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
