import VueExample from '@/VueExample'
import { loadComponentAsString } from '@dynamic/loadComponent'
import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../utils'

jest.mock('@dynamic/loadComponent')

const countLines = (str) => str.split(/\r\n|\r|\n/).length

const props = {
  file: 'test-component.vue'
}

let wrapper
let contents

beforeEach(async () => {
  wrapper = mount(VueExample, {
    propsData: props
  })
  contents = await loadComponentAsString()
})

afterEach(() => {
  wrapper.destroy()
})

describe('VueExample', () => {
  it('renders correctly', async () => {
    await waitNT(wrapper.vm)
    await waitRAF()
    const div = wrapper.find('div.card')

    expect(div.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
    // console.log(wrapper.html());
  })

  it('parses the template SFC sections', () => {
    const parsed = wrapper.vm.parseSfcSection('template', contents)

    expect(countLines(parsed)).toBe(5)
    expect(parsed).toContain('<template>')
    expect(parsed).toContain('</template>')
    expect(parsed).not.toContain('<script>')
    expect(parsed).not.toContain('</script>')
    expect(parsed).not.toContain('<style')
    expect(parsed).not.toContain('</style>')
  })

  it('parses the script SFC sections', () => {
    const parsed = wrapper.vm.parseSfcSection('script', contents)

    expect(countLines(parsed)).toBe(16)
    expect(parsed).toContain('<script>')
    expect(parsed).toContain('</script>')
    expect(parsed).not.toContain('<template>')
    expect(parsed).not.toContain('</template>')
    expect(parsed).not.toContain('<style')
    expect(parsed).not.toContain('</style>')
  })

  it('parses the style SFC sections', () => {
    const parsed = wrapper.vm.parseSfcSection('style', contents)

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
    const pre = wrapper.find('pre.language-markup')

    expect(pre.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders the script section', async () => {
    wrapper.setData({ sectionSelected: 'script' })
    await waitNT(wrapper.vm)
    await waitRAF()
    const pre = wrapper.find('pre.language-javascript')

    expect(pre.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders the style section', async () => {
    wrapper.setData({ sectionSelected: 'style' })
    await waitNT(wrapper.vm)
    await waitRAF()
    const pre = wrapper.find('pre.language-css')

    expect(pre.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
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
        showLoader: true
      }
    })
    const loader = wrapperWithLoader.find('div.loader')

    expect(loader.exists()).toBe(true)
  })

  it("shows comments inside sections' contents", async () => {
    const wrapperWithComments = mount(VueExample, {
      propsData: {
        ...props,
        stripComments: false
      }
    })

    // Comments in template
    wrapperWithComments.setData({ sectionSelected: 'template' })
    await waitNT(wrapperWithComments.vm)
    await waitRAF()
    let pre = wrapperWithComments.find('pre.language-markup')

    expect(pre.text()).toContain('This is a test comment inside the template part')
    // Comments in script
    wrapperWithComments.setData({ sectionSelected: 'script' })
    await waitNT(wrapperWithComments.vm)
    await waitRAF()
    pre = wrapperWithComments.find('pre.language-javascript')
    expect(pre.text()).toContain('This is a test comment inside the script part')
    // Comments in style
    wrapperWithComments.setData({ sectionSelected: 'style' })
    await waitNT(wrapperWithComments.vm)
    await waitRAF()
    pre = wrapperWithComments.find('pre.language-css')
    expect(pre.text()).toContain('This is a test comment inside the style part')
  })

  it('shows and hides the main section depending on the expanded data variable', async () => {
    wrapper.setData({ expanded: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    const cardBody = wrapper.find('div.card-body')

    expect(cardBody.attributes().style).toBe('display: none;')
    wrapper.setData({ expanded: true })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(cardBody.attributes().style).toBe('')
  })
})
