<template>
    <h1>Our Manufacturers</h1>
    <div class="carousel-container">
        <button @click="prev" class="carousel-button left">←</button>
        <ul class="carousel-list">
            <li
            v-for="(carousel, index) in manufacturerCarousel.Manufacturers"
            :key="index"
            :style="{ transform: `translateX(-${carouselIndex * 105}%)`, transition: 'transform 0.5s ease'}"
            class="carousel-item"
            >
            <a href="#">
                <img :src="carousel.PictureModel.ImageUrl" :alt="carousel.PictureModel.AlternateText" />
            </a>
            </li>
        </ul>
        <button @click="next" class="carousel-button right">→</button>
    </div>
    <!-- Optional navigation buttons -->
</template>

<script setup lang="ts">
    import type { Carousel } from '~/types/Carousel';
    import { ref, Transition } from 'vue';

    let carousels = [] as Carousel[];
    let manufacturerCarousel: Carousel;
    let totalItems : number;
    const carouselIndex = ref(0);

    const fetchHomeCarousel = async () => {
        const apiUrl = 'https://vitalac.nop-station.com/api/home/carousels';
        
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

            const data = await response.json(); // Parse the JSON response
            carousels = data.Data as Carousel[]; // Assign the data to the reactive products array

            for (let carousel of carousels) {
                if (carousel.CarouselType === 20) {
                    manufacturerCarousel = carousel;
                    break; 
                }
            }
            totalItems = manufacturerCarousel.Manufacturers.length - 2;

        } catch (error) {
            console.error('Failed to fetch carousels:', error);
        }
    };

    function next() {
        console.log(totalItems);
        carouselIndex.value = (carouselIndex.value + 1) % totalItems;
        console.log(carouselIndex.value);
    }

    function prev() {
        carouselIndex.value = (carouselIndex.value - 1 + totalItems) % totalItems;
    }

    await fetchHomeCarousel();
</script>


<style scoped>
  .carousel-container{
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    width: 1200px;
  }

  .carousel-list {
    display: flex;
    gap: 20px;
    transition: transform 0.5s ease-in-out;
  }
  
  .carousel-item {
    flex: 0 0 calc(33.33% - 20px); /* 3 items per row, accounting for the gap */
    box-sizing: border-box; /* Ensures padding and borders are included in the width */
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    list-style: none;
  }
  
  .carousel-item img {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  .carousel button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  button.prev {
    left: 10px;
  }
  
  button.next {
    right: 10px;
  }

  .carousel-button {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
 
  .left {
    left: 10px;
  }
 
  .right {
    right: 10px;
  }
  carousel-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
</style>
