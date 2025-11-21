import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../components/SearchBar.vue';

describe('SearchBar', () => {
  it('emits a search event with the query when the search button is clicked', async () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input');
    const button = wrapper.find('button');

    await input.setValue('test query');
    await button.trigger('click');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')?.[0]).toEqual(['test query']);
  });
});
