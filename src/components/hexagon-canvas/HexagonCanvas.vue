<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import HexagonGrid from './hexagon-classes/HexagonGrid';
  import CameraController from './camera-controller/camera-controller';
  import MouseController from './mouse-controller/mouse-controller';
  import Toolbar from '../toobar/Toolbar.vue';

  const hexagonGrid = new HexagonGrid(window.innerWidth, window.innerHeight);
  const canvas = ref(null);
  const { innerWidth, innerHeight } = window;

  onMounted(() => {
    if (!canvas.value) return;
    new CameraController(canvas.value, hexagonGrid, { width: innerWidth, height: innerHeight });
    new MouseController(canvas.value, hexagonGrid);
    hexagonGrid.setCanvas(canvas.value);
    hexagonGrid.gridNodeObservables.mouseClickObservable.attach({
      update: (test) => {
        console.log('hi', test);
      },
    });
  })
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
  .main__toolbar {
    position: absolute;
    bottom: 0px;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
  }

</style>