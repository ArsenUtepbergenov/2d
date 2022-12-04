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
import Renderer from '@/entities/Renderer'
import PrimitivesDrawer from '@/entities/drawers/PrimitivesDrawer'
import Particle from '@/entities/physics/Particles'
import getPoint from '@/entities/math/Point'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
})
let renderer: Renderer
let timer: number

function resize() {
  window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    size.w = window.innerWidth
    size.h = window.innerHeight
    renderer.setSize(size.w, size.h)
  }, System.RESIZE_TIME)
}

onBeforeMount(() => {
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

onMounted(() => {
  renderer = new Renderer(canvasRef.value!, {
    w: size.w,
    h: size.h,
    alpha: true,
  })
  renderer.applyDrawer(new PrimitivesDrawer(renderer.c2d))
  const params = {
    w: System.CM,
    h: System.CM,
    radius: System.CM,
  }
  const particle = new Particle(params)

  renderer.render(particle)
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
