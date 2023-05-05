<script lang="ts" setup>
  import type { MassObservables } from '@/components/hexagon-canvas/hexagon-classes/HexagonGrid';
  import PaintBrush from './tools/painbrush/PaintBrush.vue';

  const props = defineProps<{
    observables: MassObservables
  }>();
</script>

<template>
  <div class="toolbar">
    <paint-brush :observables="props.observables"/>
  </div>  
</template>

<style scoped>
  .toolbar {
    width: 400px;
    height: 80px;
    background-color: rgba(255,255,255, 0.7);
    backdrop-filter: blur(5px);
    border-radius: 8px;
    overflow: hidden;
  }
</style>