<template>
  <section ref="world"></section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Game from '@/entities/game/Game'

const world = ref()

let game: Game

onMounted(() => {
  game = new Game(world.value as HTMLElement)
  game.run()
})
</script>

<style lang="scss">
canvas {
  width: 100%;
  height: 100%;
}
</style>
