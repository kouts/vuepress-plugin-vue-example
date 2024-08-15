import Example1 from './components/Example1.vue'
import { defineClientConfig } from '@vuepress/client'
import './styles/styles.css'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Example1', Example1)
  },
  setup() {
    // noop
  },
  rootComponents: []
})
