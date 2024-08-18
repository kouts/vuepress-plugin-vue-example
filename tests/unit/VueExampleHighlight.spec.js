import { shallowMount } from '@vue/test-utils'
import VueExampleHighlight from '@/VueExampleHighlight.vue'
import { waitNT } from '../utils'

vi.mock(
  'shiki',
  vi.fn(() => ({
    codeToHtml: () => '<p>Hello world</p>',
  })),
)

describe('VueExampleHighlight', () => {
  const props = {
    code: '<p>Hello world</p>',
    language: 'vue-html',
  }

  it('renders the correct markup', async () => {
    const wrapper = shallowMount(VueExampleHighlight, {
      props,
    })

    await waitNT(wrapper.vm)

    const contents = wrapper.find('p')

    expect(wrapper.classes()).toEqual(['shiki-container', 'shiki-vue-html'])
    expect(contents.text()).toBe('Hello world')
  })

  it('renders the correctly', () => {
    const wrapper = shallowMount(VueExampleHighlight, {
      props,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
