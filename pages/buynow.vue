<template>
    <div class="product-container">
      <img :src="product.PictureModels[0].ImageUrl" alt="Product Image" class="product-image" />
      <div class="product-details">
        <p><strong>Name:</strong> {{ product.Name }}</p>
        <p><strong>Price:</strong> {{ product.ProductPrice.Price}}</p>
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
        if(credit.value >= product.ProductPrice.PriceValue){
            credit.value -= product.ProductPrice.PriceValue;
            Swal.fire({
                icon: 'success',
                title: 'Purchase Confirmed!',
                text: `You have successfully purchased ${product.Name}.`,
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
  
  