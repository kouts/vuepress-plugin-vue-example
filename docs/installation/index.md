## Installation

Install `vuepress-plugin-vue-example@next` via npm  
This plugin requires `prismjs` and `@vuepress/plugin-prismjs` as a peer dependencies.

```bash
npm install -D vuepress-plugin-vue-example@next prismjs @vuepress/plugin-prismjs@next
```

## Usage

Check out the official Vuepress documentation for [Using a Plugin](https://vuepress.vuejs.org/plugin/using-a-plugin.html).

### Register the plugin inside the Vuepress config

```javascript
// .vuepress/config.js
import { vueExamplePlugin } from 'vuepress-plugin-vue-example'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  plugins: [
    prismjsPlugin({
      theme: 'tomorrow',
    }),
    vueExamplePlugin({
      // Provide a directory where all the example `.vue` files will be stored.
      // Either an absolute path or a relative path to the `.vuepress/.temp` directory can be used.
      // Sub-directories can be utilized to separate examples into categories.
      componentsPath: '../components/',
    }),
  ],
})
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
