import React, { useState } from 'react';
import { Plus, Eye, Save, Check } from 'lucide-react';

const CreateQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: null
  });
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleQuestionChange = (e) => {
    setCurrentQuestion(prev => ({
      ...prev,
      question: e.target.value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleCorrectAnswerSelect = (index) => {
    setCurrentQuestion(prev => ({
      ...prev,
      correctAnswer: index
    }));
  };

  const handleSaveQuestion = () => {
    if (currentQuestion.question && currentQuestion.options.every(opt => opt) && currentQuestion.correctAnswer !== null) {
      setSavedQuestions(prev => [...prev, { ...currentQuestion, id: Date.now() }]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: null
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
              <Plus className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Quiz
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add questions and options for your quiz
          </p>
        </div>

        {!showPreview ? (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Question Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <input
                type="text"
                value={currentQuestion.question}
                onChange={handleQuestionChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter your question"
              />
            </div>

            {/* Options */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Options
              </label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => handleCorrectAnswerSelect(index)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      currentQuestion.correctAnswer === index
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {currentQuestion.correctAnswer === index ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      'Mark Correct'
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSaveQuestion}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Save className="h-5 w-5" />
                Save Question
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
              >
                <Eye className="h-5 w-5" />
                Preview
              </button>
            </div>

            {/* Saved Questions Count */}
            {savedQuestions.length > 0 && (
              <div className="text-center text-sm text-gray-600 pt-4 border-t">
                {savedQuestions.length} question{savedQuestions.length !== 1 ? 's' : ''} saved
              </div>
            )}
          </div>
        ) : (
          /* Preview Section */
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Quiz Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Edit
              </button>
            </div>
            
            {savedQuestions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No questions saved yet</p>
            ) : (
              <div className="space-y-6">
                {savedQuestions.map((q, index) => (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">
                      {index + 1}. {q.question}
                    </h4>
                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-2 rounded ${
                            q.correctAnswer === optIndex
                              ? 'bg-green-100 text-green-800 font-medium'
                              : 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {q.correctAnswer === optIndex && ' ✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
