<template>
    <div >
        <ul class="demo-list">
            <li v-for="(item, index) in array" :key="index" @click="addberry">
                {{ item }}
            </li>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
    import { reactive } from 'vue';
    let array = reactive(['apple', 'banana', 'cherry']);

    function addberry(){
        array.push('berry');
    }
</script>

<style>
    .demo-list{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>