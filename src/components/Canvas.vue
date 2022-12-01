<template>
  <canvas ref="canvasRef" :width="size.w" :height="size.h" tabindex="0" />
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
} from 'vue'
import Canvas from '../entities/Canvas'
import { Colors } from '../models/enums'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
})
let canvas: Canvas

function resize() {
  size.w = window.innerWidth
  size.h = window.innerHeight
  canvas.setSize(size.w, size.h)
}

onBeforeMount(() => {
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

onMounted(() => {
  canvas = new Canvas(canvasRef.value!, { width: size.w, height: size.h })
  canvas.fill(Colors.lightGrey)
})

onUpdated(() => {
  canvas.fill(Colors.lightGrey)
})
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
