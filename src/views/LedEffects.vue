<template>
    <section>
      <h2>
        LED Effects
      </h2>
      <main class="effect-buttons">
        <effect-button
          v-for="effect in effects"
          :effect="effect"
          @click="activateEffect(effect)"
        />
      </main>
    </section>
  </template>
  
  <script setup lang="ts">
  import WLEDAdapter from '../wled-adapter/WLEDAdapter';
  import { Effect, EffectEngine } from '../effect-engine/EffectsEngine';
  import { effectsLibrary } from '../effect-engine/effects/effects-library';
  import EffectButton from '../components/EffectButton.vue';
  import { reactive } from 'vue';
  
  const wled = new WLEDAdapter('192.168.1.60'); // replace with your WLED device's IP address
  const engine = reactive(new EffectEngine(wled));
  const effects = Object.values(effectsLibrary);
  
  function activateEffect(effect: Effect) {
    engine.playEffect(effect, 0);
  }
  </script>
  
  <style>
    :root {
      --grid-size: 12px;
    }
  </style>
  
  <style scoped>
  .effect-buttons {
    margin: 0px calc(var(--grid-size) * -1);
  }
  </style>