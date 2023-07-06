<script lang="ts" setup>
  import type BrushObserver from '../Brush';
  import { colorArray } from '@/data/default-colours';

  defineProps<{
    observer: BrushObserver,
  }>();
</script>

<template>
  <section>
    <h6 class="input-label">Color</h6>
    <div class="colour-tray">
      <button
        v-for="colorItem in colorArray"
        :key="colorItem.id"
        class="color-button"
        :class="{ 'color-button--active': observer.configurables.color.value === colorItem.color.hex()}"
        @click="observer.setConfigurable('color', colorItem.color.hex());"
        :style="{
          backgroundColor: colorItem.color.hex(),
          borderColor: colorItem.color.darken(0.2).hex(),
        }"
      ></button>
    </div>
  </section>
</template>

<style scoped>
  .input-field {
    width: 100%;
  }
  .colour-tray {
    width: 100%;
  }
  .color-button {
    width: 30px;
    height: 30px;
    border: 0px;
    border-radius: 15px;
    margin-right: 4px;
    border: 2px solid;
  }
  .color-button--active {
    border: 2px solid black !important;
  }
</style>