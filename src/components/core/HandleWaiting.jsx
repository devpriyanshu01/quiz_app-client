import { useEffect } from "react"

export default function HandleWaiting(){
    const timeToFirstQuestion = useState(40)
    useEffect(() => {
        const setIntervalId = setInterval(() => {
            setTimeToFirstQuestion(timeToFirstQuestion-1)
        },1000)
        return () => clearInterval(setIntervalId)
    }, [])

    return (
        <div>
            <div>First Question in {timeToFirstQuestion}s.</div>
        </div>
    )
}