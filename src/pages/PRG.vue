<template>
  <section ref="world"></section>
</template>

<script setup lang="ts">
import Game from '@/entities/game/Game'
import { ref, onMounted } from 'vue'

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
