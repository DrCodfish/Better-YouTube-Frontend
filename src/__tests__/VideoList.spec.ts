import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VideoList from '../components/VideoList.vue';

describe('VideoList', () => {
  const videos = [
    { id: 1, title: 'Video 1', uploader: 'Uploader 1', thumbnail: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Video 2', uploader: 'Uploader 2', thumbnail: 'https://via.placeholder.com/150' },
  ];

  it('renders a list of videos', () => {
    const wrapper = mount(VideoList, {
      props: {
        videos,
      },
    });

    const videoElements = wrapper.findAll('.p-4');
    expect(videoElements.length).toBe(videos.length);
  });

  it('emits a select-video event when a video is clicked', async () => {
    const wrapper = mount(VideoList, {
      props: {
        videos,
      },
    });

    await wrapper.find('.p-4').trigger('click');

    expect(wrapper.emitted('select-video')).toBeTruthy();
    expect(wrapper.emitted('select-video')?.[0]).toEqual([videos[0]]);
  });
});
