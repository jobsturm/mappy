<script lang="ts" setup>
  import type { MassObservables } from '@/components/hexagon-canvas/hexagon-classes/HexagonGrid';
  import { ref, toRefs } from 'vue';
  import type { Observer } from '@/base-classes/Observable';
  import type Hexagon from '@/components/hexagon-canvas/hexagon-classes/Hexagon';
  import { baseMap as map } from '@/api/generateMap';
  import ToolButton from '../tool-button/ToolButton.vue';

  const props = defineProps<{
    observables: MassObservables
  }>();
  const { observables } = toRefs(props);

  let brushActivated = ref(false);

  const eraserObserver: Observer<Hexagon> = {
    update(hexagon: Hexagon) {
      const { x, y } = hexagon.getMapCoordinates();
      map[y] = map[y] || [];
      map[y][x] = 'white';
      hexagon.fillStyle = 'white';
    }
  }

  const toggleBrush = () => {
    brushActivated.value = !brushActivated.value;
    if (brushActivated.value) {
      observables.value.mouseClickedInObservable.attach(eraserObserver);
      observables.value.mouseDownObservable.attach(eraserObserver);
    } else {
      observables.value.mouseClickedInObservable.detach(eraserObserver);
      observables.value.mouseDownObservable.detach(eraserObserver);
    }
  }
</script>

<template>
  <tool-button @click="toggleBrush" :is-active="brushActivated">
    <img src="@/assets/icons/eraser-icon.png"/>
  </tool-button>
</template>
