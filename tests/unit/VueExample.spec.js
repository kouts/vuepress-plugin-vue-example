import { mount } from '@vue/test-utils'
import lzString from 'lz-string'
import { resolve } from 'path'
import { expect } from 'vitest'
import { readFileAsString } from '@/prepareClientConfig'
import VueExample from '@/VueExample.vue'
import { waitNT, waitRAF } from '../utils'

const countLines = (str) => str.split(/\r\n|\r|\n/).length

const getTestComponentContents = async () => {
  const testComponentContents = await readFileAsString(resolve(__dirname, '__mocks__/test-component.vue'))

  return testComponentContents
}

const getCompressedTestComponentContents = async () => {
  const testComponentContents = await getTestComponentContents()
  const compressedTestComponentContents = lzString.compressToBase64(testComponentContents)

  return compressedTestComponentContents
}

const createWrapper = async (props) => {
  const compressedTestComponentContents = await getCompressedTestComponentContents()

  return mount(VueExample, {
    props: {
      component: 'TestComponent',
      ...props,
    },
    global: {
      mocks: {
        $componentsContents: JSON.stringify({
          TestComponent: compressedTestComponentContents,
        }),
      },
    },
  })
}

describe('VueExample', () => {
  it('renders correctly', async () => {
    const wrapper = await createWrapper()

    await waitNT(wrapper.vm)
    await waitRAF()
    const div = wrapper.find('div.card')

    expect(div.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('parses the template SFC sections', async () => {
    const wrapper = await createWrapper()
    const contents = await getTestComponentContents()

    const parsed = wrapper.vm.parseSfcSection('template', contents)

    expect(countLines(parsed)).toBe(5)
    expect(parsed).toContain('<template>')
    expect(parsed).toContain('</template>')
    expect(parsed).not.toContain('<script>')
    expect(parsed).not.toContain('</script>')
    expect(parsed).not.toContain('<style')
    expect(parsed).not.toContain('</style>')
  })

  it('parses the script SFC sections', async () => {
    const wrapper = await createWrapper()
    const contents = await getTestComponentContents()

    const parsed = wrapper.vm.parseSfcSection('script', contents)

    expect(countLines(parsed)).toBe(17)
    expect(parsed).toContain('<script>')
    expect(parsed).toContain('</script>')
    expect(parsed).not.toContain('<template>')
    expect(parsed).not.toContain('</template>')
    expect(parsed).not.toContain('<style')
    expect(parsed).not.toContain('</style>')
  })

  it('parses the style SFC sections', async () => {
    const wrapper = await createWrapper()
    const contents = await getTestComponentContents()

    const parsed = wrapper.vm.parseSfcSection('style', contents)

    expect(countLines(parsed)).toBe(13)
    expect(parsed).toContain('<style')
    expect(parsed).toContain('</style>')
    expect(parsed).not.toContain('<template>')
    expect(parsed).not.toContain('</template>')
    expect(parsed).not.toContain('<script>')
    expect(parsed).not.toContain('</script>')
  })

  it('removes comments from the template section', async () => {
    const wrapper = await createWrapper()
    const str = `
      <template>
        <!-- This is a comment -->
        <p>Text</p>
      </template>
      `
    const removed = wrapper.vm.removeComments('template', str)

    expect(removed).not.toContain('<!-- This is a comment -->')
  })

  it('removes comments from the script section', async () => {
    const wrapper = await createWrapper()
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

  it('removes comments from the style section', async () => {
    const wrapper = await createWrapper()
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
    const wrapper = await createWrapper()

    await waitNT(wrapper.vm)
    await waitRAF()

    const cardBody = wrapper.find('.card-body')
    const exampleComponent = wrapper.find('testcomponent')
    const { data, ...attrsWithoutData } = exampleComponent.attributes()

    expect(cardBody.exists()).toBe(true)
    expect(exampleComponent.exists()).toBe(true)
    expect(exampleComponent.attributes()).toEqual(attrsWithoutData)
  })

  it('renders the template section', async () => {
    const wrapper = await createWrapper()

    wrapper.setData({ sectionSelected: 'template' })
    await waitNT(wrapper.vm)
    await waitRAF()
    const pre = wrapper.find('pre.language-markup')

    expect(pre.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the script section', async () => {
    const wrapper = await createWrapper()

    wrapper.setData({ sectionSelected: 'script' })
    await waitNT(wrapper.vm)
    await waitRAF()
    const pre = wrapper.find('pre.language-javascript')

    expect(pre.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the style section', async () => {
    const wrapper = await createWrapper()

    wrapper.setData({ sectionSelected: 'style' })
    await waitNT(wrapper.vm)
    await waitRAF()
    const pre = wrapper.find('pre.language-css')

    expect(pre.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the title of the example section', async () => {
    const wrapper = await createWrapper()
    const title = 'My custom example title'

    wrapper.setProps({ title })
    await waitNT(wrapper.vm)
    await waitRAF()
    const a = wrapper.find('a.nav-link')

    expect(a.exists()).toBe(true)
    expect(a.text()).toContain(title)
  })

  it('hides the labels', async () => {
    const wrapper = await createWrapper()

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
    const wrapper = await createWrapper()

    wrapper.setProps({ showIcons: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    const svgIcons = wrapper.findAll('ul.nav.nav-pills.justify-content-end li.nav-item svg')

    expect(svgIcons.length).toBe(0)
  })

  it('shows a loader', async () => {
    const wrapperWithLoader = await createWrapper({
      component: null,
      showLoader: true,
    })

    const loader = wrapperWithLoader.find('div.loader')

    expect(loader.exists()).toBe(true)
  })

  it("shows comments inside sections' contents", async () => {
    const wrapperWithComments = await createWrapper({
      stripComments: false,
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

  it('hides the main section when the startExpanded props is false', async () => {
    const wrapper = await createWrapper({
      startExpanded: false,
    })

    await waitNT(wrapper.vm)
    await waitRAF()

    const cardBody = wrapper.find('div.card-body')

    expect(cardBody.attributes().style).toBe('display: none;')
  })

  it('shows the main section when the startExpanded props is true', async () => {
    const wrapper = await createWrapper({
      startExpanded: true,
    })

    await waitNT(wrapper.vm)
    await waitRAF()
    const cardBody = wrapper.find('div.card-body')

    expect(cardBody.attributes().style).not.toBeDefined()
  })
})
