<template>
  <section ref="world" class="world"></section>
</template>

<script setup lang="ts">
import Game from '@/game/Game'
import { ref, onMounted } from 'vue'

const world = ref()

let game: Game

onMounted(() => {
  game = new Game(world.value as HTMLElement)
  game.run()
})
</script>

<style lang="scss">
.world {
  background-color: black;
  height: 100vh;

  canvas {
    image-rendering: pixelated;
  }
}
</style>
