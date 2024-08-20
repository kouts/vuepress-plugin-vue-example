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
    multiple: false,
    async onPrepared(app) {
      await app.writeTemp(
        'loadComponent.js',
        `
          export function loadComponentAsString (componentName) {
            try {
              return componentName
            } catch (err) {
              console.log(err);
            }
          }
        `,
      )
    },
    clientConfigFile: (app) => prepareClientConfigFile(app, options),
  }
}
