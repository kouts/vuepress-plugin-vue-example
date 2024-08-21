import { getComponentsFromDir } from '@vuepress/plugin-register-components'
import { readFile } from 'fs/promises'
import lzString from 'lz-string'
import { getDirname } from 'vuepress/utils'

export const readFileAsString = async (filePath) => {
  try {
    const fileContent = await readFile(filePath, 'utf-8')

    return fileContent
  } catch (error) {
    console.error('Error reading the file:', error)
    throw error
  }
}

export const prepareClientConfigFile = async (app, options) => {
  const __dirname = getDirname(import.meta.url)
  const isDev = import.meta.env.DEV

  const componentsFromDir = await getComponentsFromDir(options)

  // Create a map of component names and their contents
  const componentsContents = {}

  for (const [name, filePath] of Object.entries(componentsFromDir)) {
    const fileContents = await readFileAsString(filePath)

    componentsContents[name] = lzString.compressToBase64(fileContents)
  }

  // client app enhance file content
  const content = `
  import VueExample from '${__dirname}/VueExample.${isDev ? 'vue' : 'js'}'

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
