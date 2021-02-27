import { mount, shallowMount } from '@vue/test-utils';
import VueExample from '@/VueExample';
jest.mock('@dynamic/loadComponent');
import { loadComponent, loadComponentAsString } from '@dynamic/loadComponent';

describe('VueExample', () => {

  const props = {
    file: 'test-component.vue'
  };

  it('renders correctly', () => {
    const wrapper = shallowMount(VueExample, {
      propsData: props
    });
    const div = wrapper.find(`div.card`);
    console.log(wrapper.html());
  });

  it('parses the template SFC sections', async () => {
    const wrapper = shallowMount(VueExample, {
      propsData: props
    });
    const contents = await loadComponentAsString();
    const parsed = wrapper.vm.parseSfcSection('template', contents);
    const lines = parsed.split(/\r\n|\r|\n/).length;
    expect(lines).toBe(7);
    expect(parsed).toContain('<template>');
    expect(parsed).toContain('</template>');
    expect(parsed).not.toContain('<s>');
    expect(parsed).not.toContain('</s>');
    expect(parsed).not.toContain('<style');
    expect(parsed).not.toContain('</style>');
  });

  it('parses the script SFC sections', async () => {
    const wrapper = shallowMount(VueExample, {
      propsData: props
    });
    const contents = await loadComponentAsString();
    const parsed = wrapper.vm.parseSfcSection('script', contents);
    const lines = parsed.split(/\r\n|\r|\n/).length;
    expect(lines).toBe(16);
    expect(parsed).toContain('<script>');
    expect(parsed).toContain('</script>');
    expect(parsed).not.toContain('<template>');
    expect(parsed).not.toContain('</template>');
    expect(parsed).not.toContain('<style');
    expect(parsed).not.toContain('</style>');
  });  


  it('parses the style SFC sections', async () => {
    const wrapper = shallowMount(VueExample, {
      propsData: props
    });
    const contents = await loadComponentAsString();
    const parsed = wrapper.vm.parseSfcSection('style', contents);
    const lines = parsed.split(/\r\n|\r|\n/).length;
    expect(lines).toBe(13);
    expect(parsed).toContain('<style');
    expect(parsed).toContain('</style>');
    expect(parsed).not.toContain('<template>');
    expect(parsed).not.toContain('</template>');
    expect(parsed).not.toContain('<script>');
    expect(parsed).not.toContain('</script>');
  });    

});
