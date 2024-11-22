<template>
    <div class="products-wrap">
        <div v-for="(product, index) in products" :key="index" class="product-box">
            <div class="product-attribute">
                <img :src="product.imageLink" alt="Discover Nuxt 3" />
                <div class="product-name">Name: {{ product.name }}</div>
                <div class="product-genre">Genre: {{ product.genre }}</div>
                <div class="product-genre">Price: {{ product.price }}</div>
                <NuxtLink :to="{path: '/buynow', query: {product: JSON.stringify(product)}}" class="buynow-button">Buy Now</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const prefix = "/img/";
    const products = [
    { imageLink: prefix + 'fx505dt.jpg', name: 'Asus Tuf 505dt', genre: 'Electronics', price: 10 },
    { imageLink: prefix + 'iPhone-16-Pro-Max.jpg', name: 'Apple iPhone 14', genre: 'Mobile Phones', price: 15 },
    { imageLink: prefix + 'playstation-5-analog-console-slim-edition.webp', name: 'Sony PlayStation 5', genre: 'Gaming Console', price: 8 },
    { imageLink: prefix + 'samsung-galaxy-tab-s7.jpg', name: 'Samsung Galaxy Tab S7', genre: 'Tablets', price: 5 }
  ];
</script>
