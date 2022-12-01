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
import Drawer from '../entities/Drawer'
import { System, Colors } from '../models/enums'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
})
let canvas: Canvas
let drawer: Drawer
let timer: number

function resize() {
  window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    size.w = window.innerWidth
    size.h = window.innerHeight
    canvas.setSize(size.w, size.h)
  }, System.RESIZE_TIME)
}

onBeforeMount(() => {
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

onMounted(() => {
  canvas = new Canvas(canvasRef.value!, { width: size.w, height: size.h })
  drawer = new Drawer()
  canvas.fill(Colors.lightGrey)
  drawer.drawCoordinateSystem(canvas.c2d, { w: size.w, h: size.h })
})

onUpdated(() => {
  canvas.fill(Colors.lightGrey)
  drawer.drawCoordinateSystem(canvas.c2d, { w: size.w, h: size.h })
})
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
