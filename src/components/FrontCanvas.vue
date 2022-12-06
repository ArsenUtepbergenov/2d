<template>
  <canvas ref="canvasRef" :width="props.w" :height="props.h" tabindex="0" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Scene from '@/entities/Scene'

const props = withDefaults(
  defineProps<{ w: number; h: number; animated?: boolean }>(),
  {
    w: 0,
    h: 0,
    animated: true,
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
let scene: Scene

onMounted(() => {
  scene = new Scene(canvasRef.value!, {
    w: props.w,
    h: props.h,
    alpha: true,
  })
  scene.show()
})

watch(
  () => props.animated,
  value => (value ? scene.unfreeze() : scene.freeze()),
)

watch(
  () => props.w,
  value => scene.setSize(value, props.h),
)
</script>

<style lang="scss" scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
