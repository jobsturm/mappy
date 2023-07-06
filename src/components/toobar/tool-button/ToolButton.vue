<script lang="ts" setup>
  import { useToolButtonComposable } from './ToolButtonComposable';  
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
  
  const { toggle } = useToolButtonComposable(props.observables, props.observer, props.observableKeys);
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
    width: 50px;
    height: 50px;
    border: 0px;
    border-radius: 8px;
    background: transparent;
    box-sizing: border-box;
  }
  .tool-button::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 4px;
    opacity: 0;
    border-top-right-radius: 4px;;
    border-top-left-radius: 4px;;
  }
  .tool-button:hover::after {
    opacity: 1;
    background-color: rebeccapurple;
  }
  .tool-button--is-active::after {
    opacity: 1;
    background-color: rebeccapurple;
  }
</style>

<style lang="css">
  .tool-button img {
    max-height: 50%;
  }
</style>