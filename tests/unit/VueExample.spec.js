import { waitNT, waitRAF } from '../utils';
import { mount } from '@vue/test-utils';
import VueExample from '@/VueExample';
jest.mock('@dynamic/loadComponent');
import { loadComponent, loadComponentAsString } from '@dynamic/loadComponent';

const countLines = (str) => str.split(/\r\n|\r|\n/).length;

const props = {
  file: 'test-component.vue'
};

let wrapper;
let contents;

beforeEach(async() => {
  wrapper = mount(VueExample, {
    propsData: props
  });
  contents = await loadComponentAsString();
});

afterEach(() => {
  wrapper.destroy();
});

describe('VueExample', () => {

  it('renders correctly', () => {
    const div = wrapper.find('div.card');
    // console.log(wrapper.html());
  });

  it('parses the template SFC sections', () => {
    const parsed = wrapper.vm.parseSfcSection('template', contents);
    expect(countLines(parsed)).toBe(7);
    expect(parsed).toContain('<template>');
    expect(parsed).toContain('</template>');
    expect(parsed).not.toContain('<script>');
    expect(parsed).not.toContain('</script>');
    expect(parsed).not.toContain('<style');
    expect(parsed).not.toContain('</style>');
  });

  it('parses the script SFC sections', () => {
    const parsed = wrapper.vm.parseSfcSection('script', contents);
    expect(countLines(parsed)).toBe(16);
    expect(parsed).toContain('<script>');
    expect(parsed).toContain('</script>');
    expect(parsed).not.toContain('<template>');
    expect(parsed).not.toContain('</template>');
    expect(parsed).not.toContain('<style');
    expect(parsed).not.toContain('</style>');
  });

  it('parses the style SFC sections', () => {
    const parsed = wrapper.vm.parseSfcSection('style', contents);
    expect(countLines(parsed)).toBe(13);
    expect(parsed).toContain('<style');
    expect(parsed).toContain('</style>');
    expect(parsed).not.toContain('<template>');
    expect(parsed).not.toContain('</template>');
    expect(parsed).not.toContain('<script>');
    expect(parsed).not.toContain('</script>');
  });

  it('removes comments from the template section', () => {
    const str  = `
    <template>
      <!-- This is a comment -->
      <p>Text</p>
    </template>
    `;
    const removed = wrapper.vm.removeComments('template', str);
    expect(removed).not.toContain('<!-- This is a comment -->');
  });

  it('removes comments from the script section', () => {
    const str  = `
    <script>
      // This is a comment
      /* This is a comment */
      const test = () => 'test';
    </script>
    `;
    const removed = wrapper.vm.removeComments('script', str);
    expect(removed).not.toContain('// This is a comment');
  });

  it('removes comments from the style section', () => {
    const str  = `
    <style>
      /* This is a comment */
      .btn-primary {
        display: inline-block;
      }
    </style>
    `;
    const removed = wrapper.vm.removeComments('script', str);
    expect(removed).not.toContain('// This is a comment');
  });

  it('renders the example component section', async () => {
    await waitNT(wrapper.vm);
    await waitRAF();
    const p = wrapper.find('p.demo');
    expect(p.exists()).toBe(true);
  });

  it('renders the template section', async () => {
    wrapper.setData({ sectionSelected: 'template' });
    await waitNT(wrapper.vm);
    await waitRAF();
    const pre = wrapper.find('pre.language-markup');
    expect(pre.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the script section', async () => {
    wrapper.setData({ sectionSelected: 'script' });
    await waitNT(wrapper.vm);
    await waitRAF();
    const pre = wrapper.find('pre.language-javascript');
    expect(pre.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the style section', async () => {
    wrapper.setData({ sectionSelected: 'style' });
    await waitNT(wrapper.vm);
    await waitRAF();
    const pre = wrapper.find('pre.language-css');
    expect(pre.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });    

});
