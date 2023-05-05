<script lang="ts" setup>
  import { useToolComposable } from '../tool-composable/ToolComposable';  
  import type { MassObservables } from '@/components/hexagon-canvas/hexagon-classes/HexagonGrid';
  import type { Observer } from '@/base-classes/Observable';
  import type Hexagon from '@/components/hexagon-canvas/hexagon-classes/Hexagon';
  import { toRefs, watch } from 'vue';

  const props = defineProps<{
    isActive: boolean,
    observables: MassObservables,
    observer: Observer<Hexagon>,
    observableKeys: Array<keyof MassObservables>
  }>();

  const { isActive } = toRefs(props);
  
  const { toggle } = useToolComposable(props.observables, props.observer, props.observableKeys);
  watch(isActive, toggle);
</script>

<template>
  <button
    class="tool-button"
    :class="{ 'tool-button--is-active': isActive }"
  >
    <slot></slot>
  </button>
</template>

<style lang="css" scoped>
  .tool-button {
    width: 80px;
    height: 80px;
    border: 0px;
    border-radius: 8px;
    background: transparent;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0);
  }
  .tool-button:hover {
    background-color: white;
    border: 1px solid blue;
  }
  .tool-button--is-active {
    border: 1px solid red;
  }
</style>

<style lang="css">
  .tool-button img {
    max-height: 50%;
  }
</style>