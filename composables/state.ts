import WordSearch from '@/utils/wordsearch'

export const useGameState = () => useState('gameState',()=>{
    return{
        grid:[] as string[][]
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
}