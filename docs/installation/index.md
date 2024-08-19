## Installation

Install `vuepress-plugin-vue-example@next` and `prismjs` via npm.

```bash
npm install -D vuepress-plugin-vue-example@next prismjs
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
    vueExamplePlugin({
      // Provide a directory where all the example `.vue` files will be stored.
      // Either an absolute path or a relative path to the `.vuepress/.temp` directory can be used.
      // Sub-directories can be utilized to separate examples into categories.
      componentsPath: '../components/',
    }),
  ],
})
```

### Import the CSS file inside Vuepress client config

```js
// .vuepress/client.js
import 'vuepress-plugin-vue-example/style.css'
```

### Use the vue-example component

This plugin provides an automatically registered Vue component that you can use inside in your `.md` or `.vue` files.

#### Inside `.md` files

```md
// .md file

...
your content
...

<vue-example file="example" />
```

#### Inside `.vue` files

```vue
// .vue file

<template>
  <vue-example file="example" />
</template>
```
