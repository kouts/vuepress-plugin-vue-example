import { mount, shallowMount } from '@vue/test-utils';
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
  wrapper = shallowMount(VueExample, {
    propsData: props
  });
  contents = await loadComponentAsString();
});

afterEach(() => {
  wrapper.destroy();
});

describe('VueExample', () => {

  it('renders correctly', () => {
    const div = wrapper.find(`div.card`);
    // console.log(wrapper.html());
  });

  it('parses the template SFC sections', async () => {
    const parsed = wrapper.vm.parseSfcSection('template', contents);
    expect(countLines(parsed)).toBe(7);
    expect(parsed).toContain('<template>');
    expect(parsed).toContain('</template>');
    expect(parsed).not.toContain('<script>');
    expect(parsed).not.toContain('</script>');
    expect(parsed).not.toContain('<style');
    expect(parsed).not.toContain('</style>');
  });

  it('parses the script SFC sections', async () => {
    const parsed = wrapper.vm.parseSfcSection('script', contents);
    expect(countLines(parsed)).toBe(16);
    expect(parsed).toContain('<script>');
    expect(parsed).toContain('</script>');
    expect(parsed).not.toContain('<template>');
    expect(parsed).not.toContain('</template>');
    expect(parsed).not.toContain('<style');
    expect(parsed).not.toContain('</style>');
  });

  it('parses the style SFC sections', async () => {
    const parsed = wrapper.vm.parseSfcSection('style', contents);
    expect(countLines(parsed)).toBe(13);
    expect(parsed).toContain('<style');
    expect(parsed).toContain('</style>');
    expect(parsed).not.toContain('<template>');
    expect(parsed).not.toContain('</template>');
    expect(parsed).not.toContain('<script>');
    expect(parsed).not.toContain('</script>');
  });

  it('removes comments from the template section', async () => {
    const str  = `
    <template>
      <!-- This is a comment -->
      <p>Text</p>
    </template>
    `;
    const removed = wrapper.vm.removeComments('template', str);
    expect(removed).not.toContain('<!-- This is a comment -->');
  });

  it('removes comments from the script section', async () => {
    const str  = `
    <script>
      // This is a comment
      const test = () => 'test';
    </script>
    `;
    const removed = wrapper.vm.removeComments('script', str);
    expect(removed).not.toContain('// This is a comment');
  });

  it('removes comments from the style section', async () => {
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

});
