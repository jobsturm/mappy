<template>
  <button
    :style="buttonStyle"
    class="effect-button"
  >{{ effect.name }} {{ effect.loop ? '(loops)' : '' }}</button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Effect } from '../effect-engine/EffectsEngine';

const props = defineProps<{
  effect: Effect,
}>();

const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
const animationName = ref(`effectAnimation_${uniqueId}`);

const buttonStyle = computed(() => ({
  animation: `${animationName.value} 2s infinite`
}));

const generateKeyframes = () => {
  const totalDuration = props.effect.steps.reduce((acc, step) => acc + step.duration, 0);
  let accumulatedDuration = 0;

  let keyframes = `@keyframes ${animationName.value} {`;

  for (const step of props.effect.steps) {
    const percentageStart = (accumulatedDuration / totalDuration) * 100;
    accumulatedDuration += step.duration;
    const percentageEnd = (accumulatedDuration / totalDuration) * 100;
    const color = `rgb(${step.colors[0]}, ${step.colors[1]}, ${step.colors[2]})`;

    keyframes += `
      ${percentageStart.toFixed(2)}% { border-color: ${color}; }
      ${percentageEnd.toFixed(2)}% { border-color: ${color}; }
    `;
  }

  keyframes += '}';

  return keyframes;
};

const addAnimationStyle = () => {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = generateKeyframes();
  document.head.appendChild(styleSheet);
  buttonStyle.value.animation = `${animationName.value} 2s infinite`; // Ensure animation restarts
};

onMounted(addAnimationStyle);
</script>

<style scoped>
.effect-button {
  padding: 8px 12px;
  margin: var(--grid-size);
  cursor: pointer;
  transition: border-color 0.3s;
  background: black;
  border-style: solid;
  border-width: 6px;
  border-radius: 6px;
  font-size: 24px;
  color: white;
}
</style>
