<template>
  <canvas
    ref="canvasRef"
    :width="size.w"
    :height="System.CANVAS_HEIGHT"
    tabindex="0"
  />
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

const props = withDefaults(defineProps<{ animated?: boolean }>(), {
  animated: true,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive({
  w: window.innerWidth,
})
let timer: number
let scene: Scene

function resize() {
  window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    size.w = window.innerWidth
    scene.setSize(size.w, System.CANVAS_HEIGHT)
  }, System.RESIZE_TIME)
}

onMounted(() => {
  scene = new Scene(canvasRef.value!, {
    w: size.w,
    h: System.CANVAS_HEIGHT,
    alpha: true,
  })

  scene.show()
})

onUpdated(() => {
  if (props.animated) scene.unfreeze()
  else scene.freeze()
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
  position: absolute;
  top: 0;
  left: 0;
}
</style>
