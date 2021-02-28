const VueExamplePlugin = require('./plugins/vue-example/index.js');

module.exports = {
  plugins: [
    VueExamplePlugin({
      componentsPath: '/docs/.vuepress/components/'
    })
  ],
  dest: 'public',
  title: 'vuepress-plugin-vue-example',
  description: 'A Vuepress plugin to display the source code of Vue components',
  themeConfig: {
    nav: [
      { text: 'Github', link: 'https://github.com/kouts/vuepress-plugin-vue-example' }
    ],
    sidebar: [
      ['/', 'Introduction'],
      ['/installation/', 'Installation'],
      ['/components/', 'Components'],
      {
        title: 'Examples',
        collapsable: true,
        children: [
          ['/examples/cards/', 'Cards'],
          ['/examples/datatable/', 'Datatable']
        ]
      }
    ]
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Array.from' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Promise' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=NodeList.prototype.forEach' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Object.assign' }
    ]
  ]
};
