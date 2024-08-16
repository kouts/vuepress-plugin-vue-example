import { defineClientConfig } from 'vuepress/client'
import VueExample from './VueExample.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('VueExample', VueExample)
  },
})
