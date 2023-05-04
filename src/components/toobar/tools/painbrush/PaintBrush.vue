<script setup>
  const handleClick = () => {
    // handle button click logic here
  }
</script>

<template>
  <button @click="handleClick">
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