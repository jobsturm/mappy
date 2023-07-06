<script lang="ts" setup>
  import type BrushObserver from '../Brush';

  const props = defineProps<{
    observer: BrushObserver,
  }>();

  function update(event: Event) {
    const target = event.target as HTMLInputElement;
    props.observer.setConfigurable('brushRadius', parseInt(target.value, 10));
  }
  function increment():void {
    props.observer.setConfigurable('brushRadius', props.observer.configurables.brushRadius.value + 1);
  }
  function decrement():void {
    props.observer.setConfigurable('brushRadius', props.observer.configurables.brushRadius.value - 1);
  }
</script>

<template>
  <section>
    <h6 class="input-label">Brush size</h6>
    <div class="inputs">
      <button
        class="increment-button btn-primary"
        @click="decrement"
      >-</button>
      <input
        class="input-field"
        type="number"
        :value="observer.configurables.brushRadius.value"
        @input="update"
      />
      <button
        class="increment-button btn-primary"
        @click="increment"
      >+</button>
    </div>
  </section>
</template>

<style scoped>
  .input-field {
    width: 100%;
    margin: 0 8px;
  }
  .inputs {
    width: 100%;
    display: flex;
  }
  .increment-button {
    width: 30px;
    height: 30px;
    padding: 0px;
    flex-shrink: 0;
    font-weight: var(--font-very-bold);
    font-size: var(--text-xl);
  }
</style>