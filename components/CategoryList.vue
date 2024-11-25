<template>
    <div class="category-dropdown">
      <button class="category-dropdown-toggle" @click="toggleDropdown">
        {{ selectedCategoryName }}
      </button>
      <ul v-if="isDropdownOpen" class="category-list">
        <li 
          v-for="(category, index) in categories" 
          :key="index" 
          @click="setCategory(category.Id, index)" 
          class="category-box">
          <a>{{ category.Name }}</a>
        </li>
      </ul>
    </div>
  </template>
  
<script setup lang="ts">
    import { ref, inject } from 'vue';
    import type { Category } from '~/types/Category';

    const emit = defineEmits(['category-change'])
    const isDropdownOpen = ref(false);
    const selectedCategoryName = ref<string>('');

    const categories = ref<Category[]>([]);
    let categoryId = inject<number>('categoryId');

    const fetchCategories = async () => {
        const apiUrl = 'https://vitalac.nop-station.com/api/catalog/categories';
        
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
            categories.value = data.Data.Categories as Category[]; // Assign the data to the reactive products array

            categoryId = categories.value[0].Id;
            emit("category-change", categoryId);

            selectedCategoryName.value = categories.value[0].Name;
        } catch (error) {
            console.error('Failed to fetch Categories:', error);
        }
    };

    // Function to handle the category
    const setCategory = (categoryid: number, index: number) => {
        console.log(`Clicked category: ${categoryId}`);
        categoryId = categoryid;
        emit("category-change", categoryId);
        isDropdownOpen.value = false;
        selectedCategoryName.value = categories.value[index].Name;
    // Add your logic here
    };

    const toggleDropdown = () => {
        isDropdownOpen.value = !isDropdownOpen.value;
    };

    // Automatically fetch products when the component is mounted
    onMounted(() => {
        fetchCategories();
    });
</script>

