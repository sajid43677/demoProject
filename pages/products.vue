<template>
    <div class="categories">
      <CategoryList @category-change="categoryChange" />
    </div>
    <div class="products-wrap">
        <div v-for="(product, index) in products" :key="index" class="product-box">
            <div class="product-attribute">
                <img :src="product.PictureModels[0].ImageUrl" alt="Discover Nuxt 3" />
                <div class="product-name">{{ product.Name }}</div>
                <!-- <div class="product-genre">Genre: {{ product.genre }}</div> -->
                <div class="product-genre oldprice">Price: {{ product.ProductPrice.OldPrice }}</div>
                <div class="product-genre">Price: {{ product.ProductPrice.Price }}</div>
                <NuxtLink :to="{path: '/buynow', query: {product: JSON.stringify(product)}}" class="buynow-button">Buy Now</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, provide } from 'vue';
  import type { Product } from '~/types/Product';

  const categoryId = ref(0);
  const products = ref<Product[]>([]); 
  
  const fetchProducts = async () => {
    const apiUrl = 'https://vitalac.nop-station.com/api/catalog/category/getcategoryproducts/' + categoryId.value;
    
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'DeviceId': '43023dbb-c665-49be-8be7-eb5d6c87cb50', 
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json(); 
      products.value = data.Data.Products as Product[];
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  
  async function categoryChange(catId: number) {
    categoryId.value = catId;
    await fetchProducts();
  }

  await fetchProducts();
</script>
