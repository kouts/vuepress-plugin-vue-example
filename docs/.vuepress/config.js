import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { defaultTheme } from '@vuepress/theme-default'
import { fileURLToPath } from 'url'
import { defineUserConfig } from 'vuepress'
import { vueExamplePlugin } from '../../src/index.js'

const examplesDir = fileURLToPath(new URL('../.examples/', import.meta.url))

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
        text: 'Introduction',
      },
      {
        link: '/installation/',
        text: 'Installation and Usage',
      },
      {
        link: '/options/',
        text: 'Options',
      },
    ],
  }),
  plugins: [
    shikiPlugin({
      theme: 'github-dark-default',
      langs: ['bash', 'css', 'sass', 'scss', 'js', 'ts', 'json', 'vue', 'md', 'diff'],
    }),
    vueExamplePlugin({
      componentsPath: examplesDir,
    }),
    searchPlugin({
      // options
    }),
  ],
  dest: 'public',
  title: 'vuepress-plugin-vue-example',
  description: "A Vuepress 2 plugin to display Vue components' live examples and source code inside documentation.",
})
