<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import type { MassObservables } from '@/components/hexagon-canvas/hexagon-classes/HexagonGrid';
  import ToolButton from './tool-button/ToolButton.vue';
  import PaintBrushObserver from './tools/PaintBrush';
  import EraserObserver from './tools/Eraser';
  import ToolControls from './ToolControls.vue';

  const props = defineProps<{
    observables: MassObservables
  }>();

  export type ObserverMap = Record<string,
    typeof PaintBrushObserver
    | typeof EraserObserver
  >;

  const observerMap:ObserverMap  = reactive({
    'paintBrush': PaintBrushObserver,
    'eraser': EraserObserver,
  });

  const activeButton = ref();
  const activeObserver = computed(() => observerMap[activeButton.value]);
</script>

<template>
  <aside class="tool-sidebar">
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
    <tool-controls
      v-if="activeObserver"
      :observer="activeObserver"
      class="tool-sidebar__tool-controls"
    />
  </aside>
</template>

<style scoped>
  .tool-sidebar {
    width: 250px;
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 16px 16px 16px 0;
    display: flex;
    flex-direction: column-reverse;
  }
  .tool-sidebar__tool-controls {
    margin-bottom: 16px;
  }
  .toolbar {
    background-color: rgba(255,255,255, 0.9);
    backdrop-filter: blur(5px);
    border-radius: 8px;
  }
</style>