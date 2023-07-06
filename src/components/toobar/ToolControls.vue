<script setup lang="ts">
  import type { ObserverMap } from './Tools.vue';

  defineProps<{
    observer: ObserverMap[keyof ObserverMap],
  }>();
  </script>

<template>
  <div v-if="observer" class="tool-controls">
    <component
      v-for="(configurable, i) in Object.values(observer.configurables).filter(({ isPublic }) => !!isPublic)"
      :key="i + 1 * Math.random()"
      :is="configurable.inputComponent"
      :observer="observer"
    />
    <!-- <input v-if="observer.configurables.color.public" type="text" :value="observer.configurables.color.value"/>
    <input v-if="observer.configurables.brushRadius.public" type="number" :value="observer.configurables.brushRadius.value"/> -->
  </div>
</template>

<style scoped>
  .tool-controls {
    width: 100%;
    background-color: rgba(255,255,255, 0.9);
    backdrop-filter: blur(5px);
    border-radius: var(--spacing-8);
    overflow: hidden;
    padding: var(--spacing-8);
    display: grid;
    gap: var(--spacing-16);
  }
</style>