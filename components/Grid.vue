<template>
    <section ref="grid">
        <p>{{ builtString.join("") }} {{ pressed }}</p>
        <div class="space-x-2 space-y-2" v-for="row,rowIndex in rows">
            <div 
             @mousedown="letterHover(rowIndex,letterIndex,true)"
             @dragenter="letterHover(rowIndex,letterIndex)"
             @mouseenter="letterHover(rowIndex,letterIndex)" 
             
             v-for="letter,letterIndex in row" class="w-16 inline-block cursor-select h-16 text-3xl text-center relative font-bold capitalize rounded transition"
            :class="{
                'bg-slate-400': !isSelected(rowIndex,letterIndex),
                'bg-green-400 text-white': isSelected(rowIndex,letterIndex),
            }"
            >
                <p class="select-none absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">{{ letter }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import WordSearch from '@/utils/wordsearch'
import { useMousePressed } from '@vueuse/core'

const grid = ref<HTMLElement>()
const selected = ref<string[]>([])

onMounted(()=>{
    createGame()
})

const { pressed } = useMousePressed()

watchEffect(()=>{
    if(!pressed.value){
        selected.value = []
    }
})

const builtString = computed(()=>selected.value.map(e=>{
    const rowIndex = parseInt(e.split(",")[0])
    const letterIndex = parseInt(e.split(",")[1])
    
    return rows.value[rowIndex][letterIndex]
}))

const letterHover = async (rowIndex:number,letterIndex:number,force?:boolean)=>{
    if(pressed.value || force){
        if(isSelected(rowIndex,letterIndex)) return;
        selected.value.push(`${rowIndex},${letterIndex}`)
    }
}

const isSelected = (rowIndex:number,letterIndex:number) =>  selected.value.includes(`${rowIndex},${letterIndex}`)

const rows = ref<string[][]>([
    ['A','B','C','D'],
    ['E','F','G','H']
])

const createGame = () => {
    const game = new WordSearch({
        cols: 6,
        rows: 6,
        disabledDirections: ["N", "W", "NW", "SW"],
        dictionary: ["Hello", "crêpe", "Škoda", "word", "search"],
        maxWords: 20,
        backwardsProbability: 0.3,
        upperCase: true,
        diacritics: true
    })
    rows.value = game.grid
}
</script>