<script lang="ts" setup>
  const props = defineProps<{
    isActive: boolean
  }>();
</script>

<template>
  <button class="tool-button" :class="{ 'tool-button--is-active': props.isActive }">
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