import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { fileURLToPath } from 'url'
import { searchPlugin } from '@vuepress/plugin-search'
import { viteBundler } from '@vuepress/bundler-vite'
import { vueExamplePlugin } from '../../src/index.js'

const examplesDir = fileURLToPath(new URL('../', import.meta.url)) + '.examples/'

export default defineUserConfig({
  bundler: viteBundler(),
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
  }),
  plugins: [
    vueExamplePlugin({
      componentsPath: examplesDir
    }),
    searchPlugin({
      // options
    })
  ],
  dest: 'public',
  title: 'vuepress-plugin-vue-example',
  description: "A Vuepress 2 plugin to display Vue components' live examples and source code inside documentation."
})
