<template>
  <canvas ref="canvasRef" :width="size.w" :height="size.h" tabindex="0" />
</template>

<script setup lang="ts">
import { System } from '@/utils'
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
} from 'vue'
import Canvas from '@/entities/Canvas'
import PrimitivesDrawer from '@/entities/drawers/PrimitivesDrawer'
import Particle from '@/entities/physics/Particles'
import Engine from '@/entities/physics/Engine'
import Renderer from '@/entities/Renderer'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
})
let canvas: Canvas
let timer: number
let drawer: PrimitivesDrawer
let engine: Engine
let renderer: Renderer

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
  canvas = new Canvas(canvasRef.value!, {
    width: size.w,
    height: size.h,
    alpha: true,
  })
  drawer = new PrimitivesDrawer(canvas.c2d)
  engine = new Engine()
  renderer = new Renderer()

  const particle = new Particle()
  particle.addTrait(engine.getPhysicsTrait())
  particle.position = System.convertToCm({ x: 5, y: 6 })

  renderer.applyDrawer(drawer)
  renderer.drawParticle(particle)
})

onUpdated(() => {})
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
