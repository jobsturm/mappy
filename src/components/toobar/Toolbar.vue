<script lang="ts" setup>
  import { ref } from 'vue';
  import type { MassObservables } from '@/components/hexagon-canvas/hexagon-classes/HexagonGrid';
  import ToolButton from './tools/tool-button/ToolButton.vue';
  import PaintBrushObserver from './tools/observers/PaintBrush';
  import EraserObserver from './tools/observers/Eraser';

  const props = defineProps<{
    observables: MassObservables
  }>();

  const activeButton = ref('');
</script>

<template>
  <div class="toolbar">
    <tool-button
      :is-active="activeButton === 'paintBrush'"
      :observer="PaintBrushObserver"
      :observables="props.observables"
      :observable-keys="['mouseClickedInObservable', 'mouseDownObservable']"
      @click="activeButton = 'paintBrush'"
    ><img src="@/assets/icons/paintbrush-icon.png"/></tool-button>
    <tool-button
      :is-active="activeButton === 'eraser'"
      :observer="EraserObserver"
      :observables="props.observables"
      :observable-keys="['mouseClickedInObservable', 'mouseDownObservable']"
      @click="activeButton = 'eraser'"
    ><img src="@/assets/icons/eraser-icon.png"/></tool-button>
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