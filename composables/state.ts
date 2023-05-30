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
    },{
        answer:'DNA',
        hints:['Stores genetic information','Is a double helix shape']
    },{
        answer:'Empathy',
        hints:['Imporant skill for medical doctors during patient interviews','Understand another person\'s perspective and emotions']
    },{
        answer:'Fungus',
        hints:['Living multicellular organism that can cause tissue damage on its hosts','Can lead to athlete\'s foot']
    },{
        answer:'Genotype',
        hints:['Shows a possible allele combination','Example would be AA or Aa']
    },{
        answer:'Hypertension',
        hints:['Common condition leading to high blood pressure','Can be resolved by eating a healthy diet and exercising']
    },{
        answer:'Isotonic',
        hints:['This is the type of solution normal saline is','Pressure is the same on the inside as the outside']
    },{
        answer: 'Karyotype',
        hints:['A chart that shows all chromosomes','Useful for finding trisomies and monosomies']
    },{
        answer:'Leukocytes',
        hints:['An elevated level of this can indicate an infection','Cells that fight off foreign invaders']
    },{
        answer:'Monosomy',
        hints:['Term for missing chromosome','Can lead to conditions like turner syndrome']
    },{
        answer:'Nucleus',
        hints:['Organelle located at the center of the cell','The control center of the cell']
    },{
        answer:'Oncology',
        hints:['One of these rooms was the origin of the hospital breakout at GNMH','The study of cancer/tumors']
    },{
        answer:'Plasma',
        hints:['Makes up the majority of blood','Liqud portion of blood that helps maintain blood pressure, volume, and pH balance']
    },{
        answer:'RigorMortis',
        hints:['Occurs a few hours after death','Leads to stiff joints/muscles']
    },{
        answer:'Systemic',
        hints:['Related to body','A classification for arteries that pump into the body']
    },{
        answer:'Transcription',
        hints:['First step of protein synthesis','Leads to creation of mRNA']
    },{
        answer:'Vein',
        hints:['Carries deoxygenated blood','Blood travels here to reach the lungs for oxygen']
    },{
        answer:'Wheel',
        hints:['Type of crime scene investigation strategy','Begin in the middle of the scene and search outwards']
    }
]