<template>
  <div class="min-h-screen flex items-center justify-center gap-x-4">
      <div v-if="state.level === 21" class="text-center gap-y-2">
          <h1 class="text-3xl font-bold">You Won 🏆</h1>
          <h2 class="text-xl">And it only took you {{ state.seconds }} seconds!</h2>
          <img class="max-h-[50vh]" src="https://gifdb.com/images/high/victory-success-johnny-drama-chase-dxoxx617969vhr39.gif"/>
      </div>
      <Grid v-if="state.level <= 20"/>
      <Sidebar v-if="state.level <= 20"/>
  </div>
</template>

<script setup lang="ts">
const state  = useGameState()
</script>