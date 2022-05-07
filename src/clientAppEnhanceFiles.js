import VueExample from './VueExample.vue'
import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('VueExample', VueExample)
})
