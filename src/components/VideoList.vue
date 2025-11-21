<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div
      v-for="video in videos"
      :key="video.id"
      class="p-4 border border-gray-200 rounded-lg cursor-pointer"
      @click="emit('select-video', video)"
    >
      <img :src="video.thumbnail" :alt="video.title" class="w-full h-auto" />
      <h3 class="mt-2 text-lg font-bold">{{ video.title }}</h3>
      <p class="text-gray-600">{{ video.uploader }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '../types';
import type { PropType } from 'vue';

const emit = defineEmits(['select-video']);

defineProps({
  videos: {
    type: Array as PropType<Video[]>,
    required: true,
  },
});
</script>
