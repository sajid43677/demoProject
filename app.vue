<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
  import { ref, provide } from 'vue';

  // Provide shared credit state
  const credit = ref(100);
  provide('credit', credit);
</script>

