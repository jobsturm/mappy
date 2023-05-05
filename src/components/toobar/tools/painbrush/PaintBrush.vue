<script lang="ts" setup>
  import type { MassObservables } from '@/components/hexagon-canvas/hexagon-classes/HexagonGrid';
  import { toRefs } from 'vue';
  import type { Observer } from '@/base-classes/Observable';
  import type Hexagon from '@/components/hexagon-canvas/hexagon-classes/Hexagon';
  import { baseMap as map } from '@/api/generateMap';

  const props = defineProps<{
    observables: MassObservables
  }>();
  const { observables } = toRefs(props);

  let brushActivated = false;

  const paintbrushObserver: Observer<Hexagon> = {
    update(hexagon: Hexagon) {
      const { x, y } = hexagon.getMapCoordinates();
      map[y] = map[y] || [];
      map[y][x] = 'green';
      hexagon.fillStyle = 'green';
    }
  }

  const toggleBrush = () => {
    brushActivated = !brushActivated;
    if (brushActivated) {
      observables.value.mouseClickedInObservable.attach(paintbrushObserver);
      observables.value.mouseClickObservable.attach(paintbrushObserver);
    } else {
      observables.value.mouseClickedInObservable.detach(paintbrushObserver);
      observables.value.mouseClickObservable.detach(paintbrushObserver);
    }
  }
</script>

<template>
  <button @click="toggleBrush">
    <img src="@/assets/icons/paintbrush-icon.png"/>
  </button>
</template>

<style lang="css" scoped>
  button {
    width: 80px;
    height: 80px;
    border: 0px;
    border-radius: 8px;
    background: transparent;
  }
  button:hover {
    background-color: white;
  }
</style>