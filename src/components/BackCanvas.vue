<template>
  <canvas ref="canvasRef" :width="size.w" :height="size.h" />
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
import Canvas from '@/entities/Canvas'
import CoordinateSystemDrawer from '@/entities/drawers/CoordinateSystemDrawer'
import { Colors } from '@/models/enums'
import { System } from '@/utils'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
})
let canvas: Canvas
let csd: CoordinateSystemDrawer
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
  canvas = new Canvas(canvasRef.value!, { w: size.w, h: size.h })
  csd = new CoordinateSystemDrawer(canvas.c2d)
  canvas.fill(Colors.light)
  csd.draw({ w: size.w, h: size.h })
})

onUpdated(() => {
  canvas.fill(Colors.light)
  csd.draw({ w: size.w, h: size.h })
})
</script>

<style lang="scss" scoped>
canvas {
  border: 2px solid #795548;
}
</style>
