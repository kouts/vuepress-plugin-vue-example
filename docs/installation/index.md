## Installation

Install `vuepress-plugin-vue-example@next` via npm

```
npm install vuepress-plugin-vue-example@next --save-dev
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
    vueExamplePlugin({
      // You need to provide a directory that all the example .vue files will be stored.
      // You can use sub-directories to separate examples into categories.
      componentsPath: '/examples/',
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
