import './styles/styles.css'
import { defineClientConfig } from 'vuepress/client'
import Example1 from './components/Example1.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Example1', Example1)
  },
  setup() {
    // noop
  },
  rootComponents: [],
})
