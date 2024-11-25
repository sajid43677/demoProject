<template>
  <div v-if="cartProducts.length === 0" class="products-wrap">
    Your cart is empty.
  </div>
  <div v-else class="products-wrap">
    <div v-for="(product, index) in cartProducts" :key="index" class="product-box">
      <div class="product-attribute">
        <img :src="product.PictureModels[0].ImageUrl" alt="Product Image" class="product-image" />
        <div class="product-name">{{ product.Name }}</div>
        <div class="product-genre">Price: {{ product.ProductPrice.Price }}</div>
        <div class="product-genre">QTY: {{ product.NumberOfProducts }}</div>
      </div>
    </div>
  </div>
  <button class="buy-now-button" @click="confirmPurchase">Confirm Purchase</button>
</template>
  
  
  <script setup lang="ts">
    import { useRoute } from 'vue-router';
    import Swal from 'sweetalert2';
    import { inject, ref } from 'vue';
    import type { Product } from '~/types/Product';

    // Use the shared credit state
    const credit = inject('credit') as Ref<number>;
    const route = useRoute();
    const product: Product = typeof route.query.product === 'string' 
      ? JSON.parse(route.query.product) 
      : null;
    const cartProducts = inject('cartProducts') as Ref<Product[]>;

    const confirmPurchase = () => {
      let totalCost: number = 0;
      for(let cartProduct of cartProducts.value){
        totalCost += cartProduct.ProductPrice.PriceValue * cartProduct.NumberOfProducts;
      }
      if(cartProducts.value.length === 0){
        Swal.fire({
          icon: 'warning',
          title: 'Purchase failed!',
          text: `Your cart is empty`,
          showConfirmButton: true,
          confirmButtonText: 'OK',
        });
        return;
      }
      else if(credit.value > totalCost){
          credit.value -= totalCost;
          Swal.fire({
              icon: 'success',
              title: 'Purchase Confirmed!',
              text: `You have successfully purchased your products`,
              showConfirmButton: true,
              confirmButtonText: 'OK',
          });
          cartProducts.value = [];
          console.log('Product cart after:', cartProducts);
      }
      else{
          Swal.fire({
              icon: 'warning',
              title: 'Purchase failed!',
              text: `Insufficient balance`,
              showConfirmButton: true,
              confirmButtonText: 'OK',
          });
      }
  };
  </script>
  
  