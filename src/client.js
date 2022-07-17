import VueExample from './VueExample.vue'
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('VueExample', VueExample)
  }
})
