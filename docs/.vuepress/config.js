import VueExamplePlugin from '../../src/index.js'
import { defaultTheme, defineUserConfig } from 'vuepress-webpack'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  plugins: [
    VueExamplePlugin({
      componentsPath: '/docs/.examples/'
    }),
    searchPlugin({
      // options
    })
  ],
  dest: 'public',
  title: 'vuepress-plugin-vue-example',
  description: "A Vuepress 2 plugin to display Vue components' live examples and source code inside documentation.",
  theme: defaultTheme({
    contributors: false,
    repo: 'https://github.com/kouts/vuepress-plugin-vue-example/tree/next',
    colorMode: 'light',
    colorModeSwitch: false,
    sidebar: [
      {
        link: '/',
        text: 'Introduction'
      },
      {
        link: '/installation/',
        text: 'Installation and Usage'
      },
      {
        link: '/options/',
        text: 'Options'
      }
    ]
  })
})
