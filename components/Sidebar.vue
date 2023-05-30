<template>
    <aside class="h-full text-center space-y-2 max-w-[25vw] w-full">
        <h1 class="text-lg max-w-xs mx-auto">
            <span class="text-6xl font-bold">{{ state.answer?.split("")[0] }}</span> is for
        </h1>
        <img src="https://picsum.photos/200" class="rounded mx-auto"/>
        <details class="w-full" v-for="hint,i in levels[state.level].hints">
            <summary class="font-medium">💡 Hint {{ i+1 }}</summary>
            <p class="text-gray-600">{{ hint }}</p>
        </details>
    </aside>
</template>

<script setup lang="ts">
const state = useGameState()
</script>