import Example1 from './components/Example1.vue'
import './styles/styles.scss'

import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('Example1', Example1)
})
