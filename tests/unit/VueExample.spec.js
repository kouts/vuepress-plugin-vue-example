import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import VueExample from '@/VueExample.vue'
import { waitNT, waitRAF } from '../utils'
import { loadComponentAsString } from './__mocks__/temp/loadComponent'

const countLines = (str) => str.split(/\r\n|\r|\n/).length

const props = {
  file: 'test-component.vue',
}

const createVueExampleHighlightStub = () => {
  return {
    template: `<div :class="containerClass">{{ code }}</div>`,
    props: {
      code: {
        type: String,
        default: '',
      },
      language: {
        type: String,
        default: 'vue-html',
      },
    },
    computed: {
      containerClass() {
        return `shiki-container shiki-${this.language}`
      },
    },
  }
}

let wrapper

beforeEach(async () => {
  wrapper = mount(VueExample, {
    props,
    global: {
      stubs: {
        VueExampleHighlight: createVueExampleHighlightStub(),
      },
    },
  })
})

afterEach(() => {
  wrapper.unmount()
})

describe('VueExample', () => {
  it('renders correctly', async () => {
    await waitNT(wrapper.vm)
    await waitRAF()
    const div = wrapper.find('div.card')

    expect(div.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('parses the template SFC sections', async () => {
    const contents = await loadComponentAsString()

    const parsed = wrapper.vm.parseSfcSection('template', contents.default)

    expect(countLines(parsed)).toBe(5)
    expect(parsed).toContain('<template>')
    expect(parsed).toContain('</template>')
    expect(parsed).not.toContain('<script>')
    expect(parsed).not.toContain('</script>')
    expect(parsed).not.toContain('<style')
    expect(parsed).not.toContain('</style>')
  })

  it('parses the script SFC sections', async () => {
    const contents = await loadComponentAsString()

    const parsed = wrapper.vm.parseSfcSection('script', contents.default)

    expect(countLines(parsed)).toBe(17)
    expect(parsed).toContain('<script>')
    expect(parsed).toContain('</script>')
    expect(parsed).not.toContain('<template>')
    expect(parsed).not.toContain('</template>')
    expect(parsed).not.toContain('<style')
    expect(parsed).not.toContain('</style>')
  })

  it('parses the style SFC sections', async () => {
    const contents = await loadComponentAsString()

    const parsed = wrapper.vm.parseSfcSection('style', contents.default)

    expect(countLines(parsed)).toBe(13)
    expect(parsed).toContain('<style')
    expect(parsed).toContain('</style>')
    expect(parsed).not.toContain('<template>')
    expect(parsed).not.toContain('</template>')
    expect(parsed).not.toContain('<script>')
    expect(parsed).not.toContain('</script>')
  })

  it('removes comments from the template section', () => {
    const str = `
    <template>
      <!-- This is a comment -->
      <p>Text</p>
    </template>
    `
    const removed = wrapper.vm.removeComments('template', str)

    expect(removed).not.toContain('<!-- This is a comment -->')
  })

  it('removes comments from the script section', () => {
    const str = `
    <script>
      // This is a comment
      /* This is a comment */
      const test = () => 'test';
    </script>
    `
    const removed = wrapper.vm.removeComments('script', str)

    expect(removed).not.toContain('// This is a comment')
  })

  it('removes comments from the style section', () => {
    const str = `
    <style>
      /* This is a comment */
      .btn-primary {
        display: inline-block;
      }
    </style>
    `
    const removed = wrapper.vm.removeComments('script', str)

    expect(removed).not.toContain('// This is a comment')
  })

  it('renders the example component section', async () => {
    await waitNT(wrapper.vm)
    await waitRAF()
    const p = wrapper.find('p.demo')

    expect(p.exists()).toBe(true)
  })

  it('renders the template section', async () => {
    wrapper.setData({ sectionSelected: 'template' })
    await waitNT(wrapper.vm)
    await waitRAF()

    const pre = wrapper.find('div.shiki-vue-html')

    expect(pre.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the script section', async () => {
    wrapper.setData({ sectionSelected: 'script' })
    await waitNT(wrapper.vm)
    await waitRAF()
    const pre = wrapper.find('div.shiki-javascript')

    expect(pre.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the style section', async () => {
    wrapper.setData({ sectionSelected: 'style' })
    await waitNT(wrapper.vm)
    await waitRAF()
    const pre = wrapper.find('div.shiki-css')

    expect(pre.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the title of the example section', async () => {
    const title = 'My custom example title'

    wrapper.setProps({ title })
    await waitNT(wrapper.vm)
    await waitRAF()
    const a = wrapper.find('a.nav-link')

    expect(a.exists()).toBe(true)
    expect(a.text()).toContain(title)
  })

  it('hides the labels', async () => {
    wrapper.setProps({ showLabels: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    const templateLink = wrapper.findAll('ul.nav.nav-pills.justify-content-end li.nav-item a').at(0)
    const scriptLink = wrapper.findAll('ul.nav.nav-pills.justify-content-end li.nav-item a').at(1)
    const styleLink = wrapper.findAll('ul.nav.nav-pills.justify-content-end li.nav-item a').at(2)

    expect(templateLink.text()).not.toContain('Template')
    expect(scriptLink.text()).not.toContain('Script')
    expect(styleLink.text()).not.toContain('Style')
  })

  it('hides the icons', async () => {
    wrapper.setProps({ showIcons: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    const svgIcons = wrapper.findAll('ul.nav.nav-pills.justify-content-end li.nav-item svg')

    expect(svgIcons.length).toBe(0)
  })

  it('shows a loader', async () => {
    const wrapperWithLoader = mount(VueExample, {
      propsData: {
        ...props,
        showLoader: true,
      },
    })
    const loader = wrapperWithLoader.find('div.loader')

    expect(loader.exists()).toBe(true)
  })

  it("shows comments inside sections' contents", async () => {
    const wrapperWithComments = mount(VueExample, {
      propsData: {
        ...props,
        stripComments: false,
      },
      global: {
        stubs: {
          VueExampleHighlight: createVueExampleHighlightStub(),
        },
      },
    })

    // Comments in template
    wrapperWithComments.setData({ sectionSelected: 'template' })
    await waitNT(wrapperWithComments.vm)
    await waitRAF()
    let pre = wrapperWithComments.find('div.shiki-vue-html')

    expect(pre.text()).toContain('This is a test comment inside the template part')

    // Comments in script
    wrapperWithComments.setData({ sectionSelected: 'script' })
    await waitNT(wrapperWithComments.vm)
    await waitRAF()
    pre = wrapperWithComments.find('div.shiki-javascript')

    expect(pre.text()).toContain('This is a test comment inside the script part')

    // Comments in style
    wrapperWithComments.setData({ sectionSelected: 'style' })
    await waitNT(wrapperWithComments.vm)
    await waitRAF()
    pre = wrapperWithComments.find('div.shiki-css')

    expect(pre.text()).toContain('This is a test comment inside the style part')
  })

  it('hides the main section when the startExpanded props is false', async () => {
    wrapper.setProps({ startExpanded: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    const cardBody = wrapper.find('div.card-body')

    expect(cardBody.attributes().style).toBe('display: none;')
  })

  it('shows the main section when the startExpanded props is true', async () => {
    wrapper.setProps({ startExpanded: true })
    await waitNT(wrapper.vm)
    await waitRAF()
    const cardBody = wrapper.find('div.card-body')

    expect(cardBody.attributes().style).not.toBeDefined()
  })
})
