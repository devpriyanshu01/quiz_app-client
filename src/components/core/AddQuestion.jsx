import { useRef, useState } from "react"
import { Eye, Save, CheckLine } from 'lucide-react';

export default function AddQuestion() {
    const [options, setOptions] = useState([
        {id : "A", correct : false},
        {id : "B", correct : false},
        {id : "C", correct : false},
        {id : "D", correct : false},
    ])

    function optionClicked(option) {
        console.log('correct option', option.id)
        setOptions(prev => (
            prev.map(opt => (
                (opt.id == option.id) ? ({...opt, correct : !opt.correct}) : (opt)
            ))
        ))

    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <div className="mt-10 flex justify-center text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                <h1>Create Quiz</h1>
            </div>
            <div className="text-center mb-10 mt-1">Add Questions and Options for your Quiz.</div>
            <div className="w-[50%] flex flex-col justify-center items-center border border-gray-200 shadow-xl rounded-lg">
                <div className="my-5 w-full px-6">
                    <p className="font-semibold">Question</p>
                    <div>
                        <input type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transiton-all duration-200"
                            placeholder="Enter your question"
                        />
                    </div>
                </div>
                <div className="w-full px-6">
                    <p className="font-semibold">Options</p>
                    {options.map((option) => (
                        <div className="w-full flex justify-center items-center flex-cols gap-2 mb-3">
                            <input type="text"
                                className={option.correct ? "w-[85%] px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transiton-all duration-200" : "w-[75%] px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transiton-all duration-200"}
                                placeholder={`Option ${option.id}`}
                            />
                            <button className={option.correct ? "flex items-center justify-center bg-emerald-500 w-[15%] font-semibold rounded-md px-6 py-3" :"w-[25%] font-semibold px-6 py-3 rounded-md bg-gray-300 hover:bg-gray-400"}
                                onClick={() => optionClicked(option)} 
                            >
                                {option.correct ? <CheckLine className="w-6 h-6" />  : "Mark Correct"}
                            </button>
                    </div>  
                    ))}
                </div>
                <div className="w-full mb-3">
                    <div className="flex items-center justify-center gap-2 my-6 w-full px-6">
                        <button className="flex items-center justify-center gap-2 w-[70%] px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md">{<Save className="w-6 h-6"/>}Save Question</button>
                        <button className="flex items-center justify-center gap-2  w-[30%] bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-md">{<Eye className="w-6 h-6"/>}Preview</button>
                    </div>
                </div>
            </div>
        </div>
    )
}