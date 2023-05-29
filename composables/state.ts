import WordSearch from '@/utils/wordsearch'

export const useGameState = () => useState('gameState',()=>{
    return{
        grid:[] as string[][],
        level:1,
        answer:null as string|null
    }
})

export const setGrid = (text:string)=>{
    const game = new WordSearch({
        cols: 6,
        rows: 6,
        dictionary: [text],
        maxWords: 20,
        backwardsProbability: 0.3,
        upperCase: true,
        diacritics: true
    })
    useGameState().value.grid = game.grid
    useGameState().value.answer = text
}

export const checkCorrect = (submission:string) =>{
    const state = useGameState()
    if(submission.toLowerCase() === state.value.answer?.toLowerCase()){
        state.value.level++
        setGrid("answer")
    }
}