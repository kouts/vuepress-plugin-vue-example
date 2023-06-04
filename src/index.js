import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const vueExamplePlugin = (options) => {
  return (app) => {
    return {
      name: 'vue-example',
      async onPrepared(app) {
        const opts = Object.assign({}, { componentsPath: '/docs/.vuepress/components' }, options)

        await app.writeTemp(
          'loadComponent.js',
          `
            export function loadComponent (file) {
              try {
                return import('${opts.componentsPath}' + file + '.vue').then(component => component.default);
              } catch (err) {
                console.log(err);
              }
            }
            export function loadComponentAsString (file) {
              try {
                return import(/* webpackChunkName: "vue-examples-source" */ /* webpackMode: "lazy-once" */ '!raw-loader!${opts.componentsPath}' + file + '.vue')
                .then(component => component.default);
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
