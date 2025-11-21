<template>
  <div class="container mx-auto">
    <SearchBar @search="performSearch" />
    <VideoPlayer v-if="selectedVideoUrl" :video-url="selectedVideoUrl" />
    <VideoList :videos="videos" @select-video="selectVideo" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import VideoPlayer from './components/VideoPlayer.vue';
import VideoList from './components/VideoList.vue';
import type { Video } from './types';

const videos = ref<Video[]>([]);
const selectedVideoUrl = ref('');

const performSearch = async (query: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/video_info?url=${query}`);
    const data = await response.json();
    videos.value = [data]; // The endpoint returns a single video
  } catch (error) {
    console.error('Error fetching video info:', error);
  }
};

const selectVideo = (video: Video) => {
  selectedVideoUrl.value = video.url;
};
</script>


