<template>
  <canvas ref="canvasRef" :width="props.w" :height="props.h" />
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue'
import Canvas from '@/entities/Canvas'
import CoordinateSystemDrawer from '@/entities/drawers/CoordinateSystemDrawer'
import { Colors } from '@/models/enums'

const props = withDefaults(defineProps<{ w: number; h: number }>(), {
  w: 0,
  h: 0,
})
const canvasRef = ref<HTMLCanvasElement | null>(null)
let canvas: Canvas
let csd: CoordinateSystemDrawer

onMounted(() => {
  canvas = new Canvas(canvasRef.value!, { w: props.w, h: props.h })
  csd = new CoordinateSystemDrawer(canvas.c2d)
  canvas.fill(Colors.light)
  csd.draw({ w: props.w, h: props.h })
})

onUpdated(() => {
  canvas.setSize(props.w, props.h)
  canvas.fill(Colors.light)
  csd.draw({ w: props.w, h: props.h })
})
</script>

<style lang="scss" scoped>
canvas {
  border: 2px solid #795548;
}
</style>
