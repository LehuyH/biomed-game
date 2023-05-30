<template>
    <section ref="grid">
        <p><span class="select-none px-2 py-1 bg-blue-500 text-white font-bold rounded">{{gameState.level}}/20</span> {{ builtString.join("") }}</p>
        <div class="space-x-2 space-y-2 row" v-for="row,rowIndex in gameState.grid">
            <div 
             @mousedown="letterHover(rowIndex,letterIndex,true)"
             @dragenter="letterHover(rowIndex,letterIndex)"
             @mouseenter="letterHover(rowIndex,letterIndex)" 
             v-for="letter,letterIndex in row" class="letter opacity-0 w-8 inline-block cursor-select h-8 text-center relative font-bold capitalize rounded transition"
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
import anime from 'animejs'
import { useMousePressed } from '@vueuse/core'

const grid = ref<HTMLElement>()
const gameState = useGameState()
const selected = ref<string[]>([])

onMounted(async ()=>{
    setGrid(levels[1].answer)
    await nextTick()
    revealGridAnimation()
})

const { pressed } = useMousePressed()

const builtString = computed(()=>selected.value.map(e=>{
    const rowIndex = parseInt(e.split(",")[0])
    const letterIndex = parseInt(e.split(",")[1])
    
    return gameState.value.grid[rowIndex][letterIndex]
}))

watchEffect(()=>{
    if(!pressed.value){
        checkCorrect(selected.value.map(e=>{
        const rowIndex = parseInt(e.split(",")[0])
        const letterIndex = parseInt(e.split(",")[1])
        return gameState.value.grid[rowIndex][letterIndex]}).join(""))

        selected.value = []
    }
})

const letterHover = async (rowIndex:number,letterIndex:number,force?:boolean)=>{
    if(pressed.value || force){
        if(isSelected(rowIndex,letterIndex)) return;
        if(!isValid(rowIndex,letterIndex)) return;
        selected.value.push(`${rowIndex},${letterIndex}`)
    }
}

const isSelected = (rowIndex:number,letterIndex:number) =>  selected.value.includes(`${rowIndex},${letterIndex}`)

const isValid = (rowIndex:number,letterIndex:number) =>{
    if(selected.value.length === 0 ) return true
    const lastRowIndex = parseInt(selected.value[selected.value.length-1].split(',')[0])
    const lastLetterIndex = parseInt(selected.value[selected.value.length-1].split(',')[1])

    return (Math.abs(lastLetterIndex - letterIndex) <= 1 && Math.abs(lastRowIndex - rowIndex) <= 1)
}

const revealGridAnimation = () =>{
    anime({
        targets:['.row','.letter'],
        translateY:["200%","0%"],
        opacity:[0,1],
        easing:'cubicBezier(.5, .05, .1, .3)',
        delay:anime.stagger(100)
    })
}
</script>