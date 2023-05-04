<script setup>
  import PaintBrush from './tools/painbrush/PaintBrush.vue';
</script>

<template>
  <div class="toolbar">
    <paint-brush/>
  </div>  
</template>

<style scoped>
  .toolbar {
    width: 400px;
    height: 80px;
    background-color: rgba(255,255,255, 0.7);
    backdrop-filter: blur(5px);
    /* border: 1px solid rgba(0,0,0,.3); */
    border-radius: 8px;
    overflow: hidden;
  }
</style>