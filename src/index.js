import { readFile } from 'fs/promises'
import { getDirname, globby, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

const createComponentName = (filename) => path.trimExt(filename.replace(/\/|\\/g, '-'))

const readFileAsString = async (filePath) => {
  try {
    const fileContent = await readFile(filePath, 'utf-8')

    return fileContent
  } catch (error) {
    console.error('Error reading the file:', error)
    throw error
  }
}

export const vueExamplePlugin = (options) => {
  return (app) => {
    return {
      name: 'vue-example',
      async onPrepared(app) {
        const opts = Object.assign({}, { componentsPath: '../components' }, options)

        const componentsDirFiles = await globby(['**/*.vue'], {
          cwd: opts.componentsPath,
        })

        const filePaths = Object.fromEntries(
          componentsDirFiles.map((filename) => [createComponentName(filename), path.resolve(opts.componentsPath, filename)]),
        )

        const componentString = await readFileAsString(filePaths.TableGrid)

        console.log(componentString)

        await app.writeTemp(
          'loadComponent.js',
          `
            import { defineAsyncComponent } from 'vue';

            export function loadComponent (file) {
              try {
                return defineAsyncComponent(() => import(/* @vite-ignore */ '${opts.componentsPath}' + file + '.vue'));
              } catch (err) {
                console.log(err);
              }
            }
            export function loadComponentAsString (file) {
              try {
                return import(/* @vite-ignore */ '${opts.componentsPath}' + file + '.vue?raw')
              } catch (err) {
                console.log(err);
              }
            }
          `,
        )
      },
      clientConfigFile: path.resolve(__dirname, 'client.js'),
    }
  }
}
