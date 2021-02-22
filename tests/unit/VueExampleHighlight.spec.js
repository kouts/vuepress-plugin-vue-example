import { shallowMount } from '@vue/test-utils';
import VueExampleHighlight from '@/VueExampleHighlight';
import Prism from 'prismjs';
jest.mock('prismjs');
Prism.highlight = jest.fn((code) => code);

describe('VueExampleHighlight', () => {

  const props = {
    code: '<p>Hello world</p>',
    language: 'html'
  };

  it('renders the correct markup', () => {
    const wrapper = shallowMount(VueExampleHighlight, {
      propsData: props
    });
    const div = wrapper.find(`div.language-${wrapper.props().language}`);
    const pre = wrapper.find(`pre.language-${wrapper.props().language}`);
    const code = wrapper.find('code');
    expect(div.exists()).toBe(true);
    expect(pre.exists()).toBe(true);
    expect(code.exists()).toBe(true);
    expect(code.text()).toContain('Hello world');
    // console.log(wrapper.html());
  });

  it('renders the correctly', () => {
    const wrapper = shallowMount(VueExampleHighlight, {
      propsData: props
    });
    expect(wrapper).toMatchSnapshot();
  });  

});
