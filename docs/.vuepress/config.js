const VueExamplePlugin = require('../../src/index.js');

module.exports = {
  plugins: [
    VueExamplePlugin({
      componentsPath: '/docs/.examples/'
    })
  ],
  dest: 'public',
  title: 'vuepress-plugin-vue-example',
  description: 'A Vuepress plugin to display Vue components\' live examples and source code inside documentation.',
  themeConfig: {
    nav: [
      { text: 'Github', link: 'https://github.com/kouts/vuepress-plugin-vue-example' }
    ],
    sidebar: [
      ['/', 'Introduction'],
      ['/installation/', 'Installation'],
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
