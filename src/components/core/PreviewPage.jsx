import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { currQuizId } from '../../Store/Store';
import axios from 'axios';

const PreviewPage = () => {
  // Get the current quiz ID from global state
  const quizId = currQuizId((state) => state.quizId)
  
  // State to store questions fetched from database
  const [fetchedQuestions, setFetchedQuestions] = useState([])
  
  // State to track which question is currently being displayed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // State to store user's selected answers for each question
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Fetch questions when component mounts
  useEffect(() => {
    fetchQuestion()
  }, [])

  // Function to fetch questions from database using quiz ID
  async function fetchQuestion(){
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/getquestions`, {quiz_id : quizId}, {withCredentials : true})
    if (res.data.success){
      console.log('questions fetched successfully')
      setFetchedQuestions(res.data.payload)
      console.log('Fetched questions:', res.data.payload)
    }else {
      console.log('failed to fetch questions from db')
    }
  }

  // Function to handle when user selects an answer option
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  // Function to navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < fetchedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Function to navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Function to handle quiz submission
  const handleSubmit = () => {
    console.log("Quiz submitted with answers:", selectedAnswers);
  };

  // Function to go back to previous page
  const handleReturnToPrevious = () => {
    window.history.back();
  };

  // Get current question object and calculate progress percentage
  const currentQ = fetchedQuestions[currentQuestion];
  const progress = fetchedQuestions.length > 0 ? ((currentQuestion + 1) / fetchedQuestions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={handleReturnToPrevious}
            className="bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-300 hover:border-blue-300 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Creating Question</span>
          </button>
        </div>
      </div>

      {/* Progress bar showing quiz completion status */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {fetchedQuestions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          {/* Visual progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main question content area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show loading message if questions haven't loaded yet */}
        {fetchedQuestions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8 text-center">
            <p className="text-gray-600">Loading questions...</p>
          </div>
        ) : (
          /* Display current question and answer options */
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8">
            {console.log('Current question:', currentQ)}
            {/* Question text - handles both question_text and question properties */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQ?.question_text || currentQ?.question}
            </h2>

            {/* Answer options */}
            <div className="space-y-4">
              {[currentQ?.option_a, currentQ?.option_b, currentQ?.option_c, currentQ?.option_d]
                .filter(option => option && option.trim() !== '')
                .map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons for previous/next question or submit */}
        <div className="flex justify-between items-center mt-8">
          {/* Previous button - disabled on first question */}
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {/* Show Submit button on last question, Next button otherwise */}
          {currentQuestion === fetchedQuestions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Submit Quiz</span>
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Question navigation dots - allows jumping to any question */}
        <div className="flex justify-center mt-8 space-x-2">
          {fetchedQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentQuestion
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600' // Current question
                  : selectedAnswers[index] !== undefined
                  ? 'bg-green-500' // Answered question
                  : 'bg-gray-300 hover:bg-gray-400' // Unanswered question
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
