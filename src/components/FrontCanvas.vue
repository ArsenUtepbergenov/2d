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
import Canvas from '@/entities/Canvas'
import { System } from '@/utils'
import Vector from '@/entities/math/Vector'
import VectorDrawer from '@/entities/drawers/VectorDrawer'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
})
let canvas: Canvas
let vectorDrawer: VectorDrawer
let timer: number
const vectors = [new Vector(2, 3), new Vector(-4, 6)]

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
  console.log('onUnmounted')

  window.removeEventListener('resize', resize)
})

onMounted(() => {
  canvas = new Canvas(canvasRef.value!, {
    width: size.w,
    height: size.h,
    alpha: true,
  })
  vectorDrawer = new VectorDrawer(canvas.c2d)
  vectors.forEach(v => vectorDrawer.draw2(v))
})

onUpdated(() => {
  vectorDrawer.update()
  vectors.forEach(v => vectorDrawer.draw2(v))
})
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
