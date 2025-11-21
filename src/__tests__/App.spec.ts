import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';
import SearchBar from '../components/SearchBar.vue';
import VideoList from '../components/VideoList.vue';
import VideoPlayer from '../components/VideoPlayer.vue';

describe('App', () => {
  it('renders the SearchBar component', () => {
    const wrapper = mount(App);
    const searchBar = wrapper.findComponent(SearchBar);
    expect(searchBar.exists()).toBe(true);
  });

  it('fetches video data and updates the video list when search is performed', async () => {
    const mockVideo = {
      title: 'Test Video',
      description: 'A test video',
      uploader: 'Test Uploader',
      thumbnail: 'http://example.com/thumbnail.jpg',
      url: 'http://example.com/video.mp4',
    };

    // Mock the fetch API
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockVideo),
      }),
    ) as any;

    const wrapper = mount(App);
    const searchBar = wrapper.findComponent(SearchBar);

    // Simulate a search
    await searchBar.vm.$emit('search', 'test query');

    // Wait for all promises to resolve and DOM to update
    await vi.waitFor(() => {
      expect((wrapper.vm as any).videos).toEqual([mockVideo]);
    });

    // Assert that fetch was called
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/video_info?url=test query');

    // Assert that the video list is updated
    const videoList = wrapper.findComponent(VideoList);
    expect(videoList.props('videos')).toEqual([mockVideo]);
  });

  it('plays the selected video when a video is selected from the list', async () => {
    const mockVideo = {
      id: 1,
      title: 'Test Video',
      uploader: 'Test Uploader',
      thumbnail: 'http://example.com/thumbnail.jpg',
      url: 'http://example.com/video.mp4',
    };

    const wrapper = mount(App);
    // Manually set videos for the VideoList
    (wrapper.vm as any).videos = [mockVideo]; // Bypass reactivity for direct test setup

    const videoList = wrapper.findComponent(VideoList);
    await videoList.vm.$emit('select-video', mockVideo);

    const videoPlayer = wrapper.findComponent(VideoPlayer);
    expect(videoPlayer.exists()).toBe(true);
    expect(videoPlayer.props('videoUrl')).toBe(mockVideo.url);
  });
});
