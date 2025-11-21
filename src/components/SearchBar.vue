<template>
  <div class="flex justify-center my-8">
    <input
      type="text"
      v-model="searchQuery"
      @keyup.enter="search"
      placeholder="Search for a video"
      class="w-1/2 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
    />
    <button
      @click="search"
      class="px-4 py-2 text-white bg-red-500 rounded-r-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

const search = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};
</script>
