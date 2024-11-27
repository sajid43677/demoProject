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
        <h5 v-if="isAuth"><NuxtLink to="/logout">logout</NuxtLink></h5>
        <h5 v-else><NuxtLink to="/login">Login</NuxtLink></h5>
        <NuxtLink to="/buynow" class="cart">Cart</NuxtLink>
    </header>
  </template>

<script setup lang="ts">
    import { inject, ref } from 'vue';
    import { useCookie } from '#app';

    const token = useCookie('auth_token');

    const isAuth = inject('isAuth') as Ref<boolean>;
    
    if (token?.value) {
        isAuth.value = true;
    }
    else {
        isAuth.value = false;
    }
    // Use the shared credit state
    const credit = inject('credit');
</script>
  
  