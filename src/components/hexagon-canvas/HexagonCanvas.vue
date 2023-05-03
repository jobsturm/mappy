<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import HexagonGrid from './hexagon-classes/HexagonGrid';
  import CameraController from './camera-controller/camera-controller';
  
  const hexagonGrid = new HexagonGrid(window.innerWidth, window.innerHeight);
  const canvas = ref(null);
  const { innerWidth, innerHeight } = window;

  onMounted(() => {
    const cameraController = new CameraController(canvas.value, hexagonGrid, { width: innerWidth, height: innerHeight });
    hexagonGrid.setCanvas(canvas.value);
  })
</script>

<template>
  <div ref="container" class="fill">
    <canvas :width="innerWidth" :height="innerHeight" ref="canvas" class="fill"/>
  </div>
</template>

<style scoped>
    .fill {
        width: 100%;
        height: 100%;
    }
</style>