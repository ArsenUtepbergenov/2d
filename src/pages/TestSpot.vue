<template>
  <section class="canvases">
    <BackCanvas :w="size.w" :h="size.h" />
    <FrontCanvas :w="size.w" :h="size.h" :animated="animated" />
  </section>
  <section class="controls">
    <button type="button" @click="toggle">Toggle animation</button>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, onUnmounted } from 'vue'
import BackCanvas from '@/components/BackCanvas.vue'
import FrontCanvas from '@/components/FrontCanvas.vue'
import { System } from '@/utils'

const animated = ref<boolean>(true)
const size = reactive({ w: window.innerWidth, h: System.CANVAS_HEIGHT })
let timer: number

function resize() {
  window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    size.w = window.innerWidth
    size.h = System.CANVAS_HEIGHT
  }, System.RESIZE_TIME)
}

onBeforeMount(() => {
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

function toggle() {
  animated.value = !animated.value
}
</script>

<style lang="scss">
$height: 700px;

main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: $height 1fr;
  align-items: center;
  justify-items: center;
  height: 100vh;
}

canvas {
  width: 100%;
  height: $height;
}
</style>
