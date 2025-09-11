import {create} from 'zustand'
export const currQuizId = create((set) => ({
    quizId : 0,
    setQuizId : (id) => set({quizId : id}),
    getQuizId : () => (quizId)
}))