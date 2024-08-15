import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const vueExamplePlugin = (options) => {
  return (app) => {
    return {
      name: 'vue-example',
      async onPrepared(app) {
        const opts = Object.assign({}, { componentsPath: '' }, options)

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
          `
        )
      },
      clientConfigFile: path.resolve(__dirname, 'client.js')
    }
  }
}
