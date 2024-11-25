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
                <div class="product-buttons">
                  <NuxtLink :to="{path: '/buynow', query: {product: JSON.stringify(product)}}" class="buynow-button">Buy Now</NuxtLink>
                  <a class="buynow-button" @click="addToCart(product, index)">Add to cart</a>
                </div>
                <div class="product-counter">
                  <button @click="decreaseQuantity(index)">-</button>
                  <span :class="[`product-quantity-${index}`]">{{ quantities[index] }}</span>
                  <button @click="increaseQuantity(index)">+</button>
                </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, provide, inject } from 'vue';
  import type { Product } from '~/types/Product';
  import Swal from 'sweetalert2';
import Index from './index.vue';

  const cartProducts = inject('cartProducts') as Ref<Product[]>; // Inject cartProducts dependency

  const categoryId = ref(0);
  const products = ref<Product[]>([]); 
  const quantities = ref<number[]>([]); // Array to hold quantities for each product
  
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
      quantities.value = products.value.map(() => 1); // Initialize quantities with default value 1
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const increaseQuantity = (index: number) => {
    quantities.value[index]++;
  };

  const decreaseQuantity = (index: number) => {
    if (quantities.value[index] > 1) {
      quantities.value[index]--;
    }
  };
  
  async function categoryChange(catId: number) {
    categoryId.value = catId;
    await fetchProducts();
  }

  async function addToCart(product: Product, index: number) {
    console.log('Product cart before:', cartProducts);
    if (!cartProducts) {
      console.error('cartProducts not found in the context.');
      return;
    }
    product.NumberOfProducts = quantities.value[index]; // Add the quantity to the product
    const existingProduct = cartProducts.value.find(p => p.Id === product.Id);
    if (existingProduct) {
      existingProduct.NumberOfProducts += quantities.value[index];
    } else {
      product.NumberOfProducts = quantities.value[index]; // Add the quantity to the product
      cartProducts.value.push(product); // Add the product to the cart
    }
    console.log('Product cart:', cartProducts);
    // Show notification
    Swal.fire({
      icon: 'success',
      title: 'Product Added',
      text: `${product.Name} has been added to your cart.`,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });
    quantities.value[index] = 1; // Reset the quantity to 1
  }

  await fetchProducts();
</script>

<style scoped>
  .product-buttons{
    display: flex;
  }

  .product-counter {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.product-counter button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.product-counter span {
  margin: 0 10px;
}
</style>
