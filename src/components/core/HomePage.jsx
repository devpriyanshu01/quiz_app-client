import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function HomePage(){
    const navigate = useNavigate()

    
    return (
        <div>
            <button
              onClick={() => navigate('/createquiz')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Login 
            </button>
        </div>
    )
}