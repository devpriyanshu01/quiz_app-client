import { use, useRef, useState } from "react"
import { Eye, Save, CheckLine, OptionIcon } from 'lucide-react';
import { currQuizId } from "../../Store/Store";
import axios from "axios";
import PreviewPage from "./PreviewPage";
import Spinner from "../utils/Spinner";
import { CloudCheck } from 'lucide-react';

export default function AddQuestion() {
    const [options, setOptions] = useState([
        {id : "A", correct : false, name : "option_a"},
        {id : "B", correct : false, name : "option_b"},
        {id : "C", correct : false, name : "option_c"},
        {id : "D", correct : false, name : "option_d"},
    ])

    //handle mark correct answer
    function optionClicked(option) {
        console.log('correct option', option.id)
        setOptions(prev => (
            prev.map(opt => (
                (opt.id == option.id) ? ({...opt, correct : !opt.correct}) : (opt)
            ))
        ))
        setSaveQuestions({...saveQuestions, correct_answer : option.id})
    }
    
    //get curr quiz_id
    const quiz_Id = currQuizId(state => state.quizId)

    const [saveQuestions, setSaveQuestions] = useState({
        quiz_id : quiz_Id,
        question_text : "",
        option_a : "",
        option_b : "",
        option_c : "",
        option_d : "",
        correct_answer : ""
    })

    const [preview, setPreview] = useState(false)

    //variable for rendering spinner
    const [spinner, setSpinner] = useState(false)

    //variable to show that question was saved or not
    const [saved, setSaved] = useState(false)

    //handle preview
    function handlePreview(){
        setPreview(true)
        setTimeout(() => {
            setPreview(false)
        }, 2000000)
    }

    //handle save question button click
    async function handleSaveQuestion() {
        setSpinner(true)
        console.log(saveQuestions)
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/savequestion`, saveQuestions, {withCredentials : true})
        if (res.data){
            console.log(res.data)
            if(res.data.IsSaved){
                setSaved(true)
                //clear input fields
                setSaveQuestions({...saveQuestions, question_text : "", option_a : "", option_b : "", option_c : "", option_d : "", correct_answer : ""})
            }
        }
        //remove tick mark from prev correct answer button
        setOptions((prev) => (
            prev.map(option => (
               option.correct ? ({...option, correct : false}) : option 
            ))
        ))
        setSpinner(false)
        setSaved(false)
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <div className="mt-5 flex justify-center text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                <h1>Create Quiz</h1>
            </div>
            <div className="text-center mb-5 mt-1">Add Questions and Options for your Quiz.</div>
            {preview ? <PreviewPage /> : (
                <div className="w-[50%] flex flex-col justify-center items-center border border-gray-200 shadow-xl rounded-lg">
                    <div className="my-5 w-full px-6">
                        <p className="font-semibold">Question</p>
                        <div>
                            <input type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transiton-all duration-200"
                                placeholder="Enter your question"
                                onChange={(e) => setSaveQuestions({...saveQuestions, question_text : e.target.value})}
                                value={saveQuestions.question_text}
                            />
                        </div>
                    </div>
                    <div className="w-full px-6">
                        <p className="font-semibold">Options</p>
                        {options.map((option) => (
                            <div key={option.id} className="w-full flex justify-center items-center flex-cols gap-2 mb-3">
                                <input type="text"
                                    className={option.correct ? "w-[85%] px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transiton-all duration-200" : "w-[75%] px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transiton-all duration-200"}
                                    placeholder={`Option ${option.id}`}
                                    onChange={(e) => setSaveQuestions({...saveQuestions, [option.name] : e.target.value })}
                                    value={saveQuestions[option.name]}
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
                            <button className="flex items-center justify-center gap-2 w-[70%] px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md"
                                onClick={handleSaveQuestion} 
                            >
                                {<Save className="w-6 h-6"/>}Save Question {spinner && <Spinner w={5} h={5}/>} {saved && <CloudCheck />}
                            </button>
                            <button className="flex items-center justify-center gap-2  w-[30%] bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-md"
                                onClick={handlePreview}
                            >
                                {<Eye className="w-6 h-6"/>}Preview
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}