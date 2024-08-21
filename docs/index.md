# vuepress-plugin-vue-example

A Vuepress 2 plugin to display Vue components' live examples and source code inside documentation.

::: warning
This plugin only works using [Vite as the bundler](https://v2.vuepress.vuejs.org/guide/bundler.html) for Vuepress 2.
:::

## Features

- Easy to use, with just a single `VueExample` tag inside `.md` or `.vue` files
- Uses `prismjs` for syntax highlighting
- Displays a fully-working live example
- Splits source code in separate sections for `template` `script` and `style`
- Capability to strip comments from the source code
- Capability to add custom code before each section using slots
- Includes expand/collapse feature in order to save space

## Browsers support

| ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)<br/>Edge | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)<br/>Firefox | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)<br/>Chrome | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)<br/>Safari | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png)<br/>Opera |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                        | last 2 versions                                                                                                    | last 2 versions                                                                                                | last 2 versions                                                                                                | last 2 versions                                                                                            |

## Demo

<Example1 />
