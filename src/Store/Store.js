import {create} from 'zustand'
export const currQuizId = create((set) => ({
    quizId : 0,
    setQuizId : (id) => set({quizId : id}),
    getQuizId : () => (quizId)
}))

//for starting the quiz
export const startTrigger = create((set) => ({
    start : false,
    setStart : ((trg) => set({start : trg}))
}))

//when quiz-owner has clicked on begin quiz
export const quizStart = create((set) => ({
    quizBegan : false,
    setQuizBegan : () => set({quizBegan : true})
}))