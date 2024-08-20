import { getComponentsFromDir } from '@vuepress/plugin-register-components'
import { readFile } from 'fs/promises'
import { getDirname } from 'vuepress/utils'

const readFileAsString = async (filePath) => {
  try {
    let fileContent = await readFile(filePath, 'utf-8')

    fileContent = fileContent.replace(/(\r\n|\n|\r)/gm, '')

    return fileContent
  } catch (error) {
    console.error('Error reading the file:', error)
    throw error
  }
}

export const prepareClientConfigFile = async (app, options) => {
  const __dirname = getDirname(import.meta.url)

  const componentsFromDir = await getComponentsFromDir(options)

  // Create a map of component names and their contents
  const componentsContents = {}

  for (const [name, filePath] of Object.entries(componentsFromDir)) {
    componentsContents[name] = await readFileAsString(filePath)
  }

  // client app enhance file content
  const content = `
  import VueExample from '${__dirname}/VueExample.vue'

  export default {
    enhance: ({ app }) => {
      app.component('VueExample', VueExample)
      app.config.globalProperties.$componentsContents = \`${JSON.stringify(componentsContents)}\`
    },
  }
  `

  // write temp file and return the file path
  return app.writeTemp(`vue-example/clientConfig.js`, content)
}
