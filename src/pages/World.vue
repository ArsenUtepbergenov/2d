<template>
  <canvas ref="canvasRef" :width="size.w" :height="size.h" tabindex="0" />
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount, onUnmounted, onMounted } from 'vue'
import Game from '@/entities/game/Game'
import { System } from '@/models/system'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({ w: window.innerWidth, h: window.innerHeight })
let timer: number

function resize() {
  window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    size.w = window.innerWidth
    size.h = window.innerHeight
  }, System.RESIZE_TIME)
}

let game: Game

onMounted(() => {
  game = new Game(canvasRef.value!, {
    w: size.w,
    h: size.h,
    alpha: true,
  })
  game.run()
})

onBeforeMount(() => {
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
