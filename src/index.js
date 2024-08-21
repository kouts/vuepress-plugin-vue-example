import { path } from 'vuepress/utils'
import { prepareClientConfigFile } from './prepareClientConfig.js'

export const vueExamplePlugin = ({ componentsDir = null }) => {
  const options = {
    componentsDir,
    componentsPatterns: ['**/*.vue'],
    getComponentName: (filename) => path.trimExt(filename.replace(/\/|\\/g, '-')),
  }

  return {
    name: 'vue-example',
    clientConfigFile: (app) => prepareClientConfigFile(app, options),
  }
}
