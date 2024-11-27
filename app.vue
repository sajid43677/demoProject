<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
  import { ref, provide } from 'vue';
  import type { Product } from './types/Product';

  // Provide shared credit state
  const credit = ref(10000);
  provide('credit', credit);
  const cartProducts = ref<Product[]>([]);
  provide('cartProducts', cartProducts);
  const isAuth = ref<boolean>(false);
  provide('isAuth', isAuth);
</script>

