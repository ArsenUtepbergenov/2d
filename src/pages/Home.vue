<template>
  <section class="canvases">
    <BackCanvas />
    <FrontCanvas />
  </section>
</template>

<script setup lang="ts">
import BackCanvas from '@/components/BackCanvas.vue'
import FrontCanvas from '@/components/FrontCanvas.vue'
</script>

<style lang="scss">
.canvases {
  position: relative;
}
</style>
