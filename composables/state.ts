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
        cols: text.length,
        rows: text.length,
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
        setGrid(levels[state.value.level].answer)
    }
}

interface Level{
    answer:string
    hints:string[]
}

export const levels:Level[] = [
    {   
        //Level starts at one so this is to push the index
        answer:'Placeholder',
        hints:[]
    },
    {
        answer:'Atrium',
        hints:['Upper chamber of the heart where blood enters','The heart has two, the left connecting to the lungs and the right connecting to the veins']
    },{
        answer:'BloodTypeO',
        hints:['One of the major blood types','The only universal blood donor']
    },{
        answer:'Centromere',
        hints:['Center of the chromosome','The place where two sister chromatids meet']
    }
]