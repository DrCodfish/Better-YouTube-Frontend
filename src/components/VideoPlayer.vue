<template>
  <div class="flex justify-center">
    <video
      v-if="videoUrl"
      :src="videoUrl"
      controls
      autoplay
      class="w-full max-w-4xl"
    ></video>
  </div>
</template>

<script setup lang="ts">
defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
});
</script>
