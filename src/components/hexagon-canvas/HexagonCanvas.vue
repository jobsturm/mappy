<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  import HexagonGrid from './hexagon-classes/HexagonGrid';
  import CameraController from './camera-controller/camera-controller';
  import MouseController from './mouse-controller/mouse-controller';
  import Toolbar from '../toobar/Tools.vue';

  const hexagonGrid = new HexagonGrid(window.innerWidth, window.innerHeight);
  const canvas = ref(null);
  const { innerWidth, innerHeight } = window;

  onMounted(() => {
    if (!canvas.value) return;
    hexagonGrid.unpause();
    new CameraController(canvas.value, hexagonGrid, { width: innerWidth, height: innerHeight });
    new MouseController(canvas.value, hexagonGrid);
    hexagonGrid.setCanvas(canvas.value);
  });
  onUnmounted(() => {
    hexagonGrid.pause();
  });
</script>

<template>
  <div ref="container" class="fill">
    <canvas :width="innerWidth" :height="innerHeight" ref="canvas" class="fill"/>
    <Toolbar :observables="hexagonGrid.gridNodeObservables" class="main__toolbar"/>
  </div>
</template>

<style scoped>
  .fill {
    width: 100%;
    height: 100%;
  }
</style>