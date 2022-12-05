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
import { System } from '@/utils'
import Scene from '@/entities/Scene'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
})
let timer: number
let scene: Scene

function resize() {
  window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    size.w = window.innerWidth
    size.h = window.innerHeight
    scene.setSize(size.w, size.h)
  }, System.RESIZE_TIME)
}

onMounted(() => {
  scene = new Scene(canvasRef.value!, {
    w: size.w,
    h: size.h,
    alpha: true,
  })

  scene.show()
})

onUpdated(() => {})

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
  position: absolute;
  top: 0;
  left: 0;
}
</style>
