import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VideoPlayer from '../components/VideoPlayer.vue';

describe('VideoPlayer', () => {
  it('renders the video player with the correct src', () => {
    const videoUrl = 'http://example.com/video.mp4';
    const wrapper = mount(VideoPlayer, {
      props: {
        videoUrl,
      },
    });

    const videoElement = wrapper.find('video');
    expect(videoElement.exists()).toBe(true);
    expect(videoElement.attributes('src')).toBe(videoUrl);
  });
});
