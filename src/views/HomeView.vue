<script setup lang="ts">
  import HexagonCanvas from "../components/hexagon-canvas/HexagonCanvas.vue";
  import Toolbar from '../components/toobar/Toolbar.vue';
</script>

<template>
  <main>
    <HexagonCanvas class="main__hexagon-canvas"/>
    <Toolbar class="main__toolbar"/>
  </main>
</template>

<style scoped>
  main {
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