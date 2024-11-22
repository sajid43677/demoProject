<!-- components/AppHeader.vue -->
<template>
    <header class="app-header">
        <nav>
            <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/products">Products</NuxtLink></li>
                <li><NuxtLink to="/aboutus">About Us</NuxtLink></li>
                <li class="credit">Credit : {{ credit }}</li>
            </ul>
        </nav>
        <h1>My Boring Website</h1>
    </header>
  </template>

<script setup lang="ts">
    import { inject } from 'vue';

    // Use the shared credit state
    const credit = inject('credit');
</script>
  
  