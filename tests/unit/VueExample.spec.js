jest.mock('@dynamic/loadComponent');
import { shallowMount } from '@vue/test-utils';
import VueExample from '@/VueExample';
import { loadComponent, loadComponentAsString } from './__mocks__/@dynamic/loadComponent.js';

describe('VueExample', () => {

  const props = {
    file: 'test-component.vue'
  };  

  it('renders', () => {
    const wrapper = shallowMount(VueExample, {
      propsData: props
    });
    const div = wrapper.find(`div.card`);
    // console.log(wrapper.html());
  });

});
