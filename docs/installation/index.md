## Installation

Install `vuepress-plugin-vue-example@next` and its peer dependencies via `npm` or your preferred package manager.

```bash
npm install -D vuepress-plugin-vue-example@next @vuepress/plugin-register-components@next prismjs
```

## Usage

Check out the official Vuepress documentation for [Using a Plugin](https://vuepress.vuejs.org/plugin/using-a-plugin.html).

### Import and register the plugin inside Vuepress config

```javascript
// .vuepress/config.js
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { vueExamplePlugin } from 'vuepress-plugin-vue-example'

export default defineUserConfig({
  theme: defaultTheme({
    themePlugins: {
      prismjs: {
        theme: 'tomorrow',
      },
    },
  }),
  plugins: [
    // Provide a directory where all the example `.vue` files will be stored.
    // Either an absolute path or a relative path to the `.vuepress/.temp` directory can be used.
    // Sub-directories can be utilized to separate examples into categories.
    registerComponentsPlugin({
      componentsDir: '../components/',
    }),
    vueExamplePlugin({
      componentsDir: '../components/',
    }),
  ],
})
```

### Import the CSS file inside Vuepress client config

```js
// .vuepress/client.js
import 'vuepress-plugin-vue-example/style.css'
```

### Use the VueExample component

This plugin provides an automatically registered Vue component that you can use inside in your `.md` or `.vue` files.

#### Inside `.md` files

```md
// .md file

...
your content
...

<VueExample component="Example" />
```

#### Inside `.vue` files

```vue
// .vue file

<template>
  <VueExample component="Example" />
</template>
```
