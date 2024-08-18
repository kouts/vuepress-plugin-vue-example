import { shallowMount } from '@vue/test-utils'
import VueExampleHighlight from '@/VueExampleHighlight.vue'

vi.mock(
  'prismjs',
  vi.fn(() => {
    return {
      highlight: vi.fn((code) => code),
      languages: ['html', 'css', 'javascript'],
    }
  }),
)

describe('VueExampleHighlight', () => {
  const props = {
    code: '<p>Hello world</p>',
    language: 'html',
  }

  it('renders the correct markup', () => {
    const wrapper = shallowMount(VueExampleHighlight, {
      props,
    })
    const div = wrapper.find(`div.language-${wrapper.props().language}`)
    const pre = wrapper.find(`pre.language-${wrapper.props().language}`)
    const code = wrapper.find('code')

    expect(div.exists()).toBe(true)
    expect(pre.exists()).toBe(true)
    expect(code.exists()).toBe(true)
    expect(code.text()).toContain('Hello world')
  })

  it('renders the correctly', () => {
    const wrapper = shallowMount(VueExampleHighlight, {
      props,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
