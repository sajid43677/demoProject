<template>
    <div class="product-container">
      <img :src="product.imageLink" alt="Product Image" class="product-image" />
      <div class="product-details">
        <p><strong>Name:</strong> {{ product.name }}</p>
        <p><strong>Genre:</strong> {{ product.genre }}</p>
      </div>
      <button class="buy-now-button" @click="confirmPurchase">Confirm Purchase</button>
    </div>
  </template>
  
  
  <script setup>
  import { useRoute } from 'vue-router';
  import Swal from 'sweetalert2';
  import { inject, ref } from 'vue';

  // Use the shared credit state
  const credit = inject('credit');
  const route = useRoute();
  const product = route.query.product ? JSON.parse(route.query.product) : null;

  const confirmPurchase = () => {
        if(credit.value >= product.price){
            credit.value -= product.price;
            Swal.fire({
                icon: 'success',
                title: 'Purchase Confirmed!',
                text: `You have successfully purchased ${product.name}.`,
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
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
  
  