<template>
  <section class="canvases">
    <BackCanvas />
    <FrontCanvas :animated="animated" />
  </section>
  <section class="controls">
    <button type="button" @click="toggle">Toggle animation</button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackCanvas from '@/components/BackCanvas.vue'
import FrontCanvas from '@/components/FrontCanvas.vue'

const animated = ref<boolean>(true)

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
