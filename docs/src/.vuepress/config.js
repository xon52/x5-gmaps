const { description } = require('../../package');

module.exports = {
  title: 'x5-gmaps Docs',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#0086ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ]
  ],
  base: '/',

  themeConfig: {
    docsDir: 'docs',
    editLinkText: 'Improve this page',
    editLinks: true,
    lastUpdated: true,
    logo: '/logo.svg',
    repo: 'xon52/x5-gmaps',
    repoLabel: 'Github',
    smoothScroll: true,
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'Examples',
        link: 'https://test.com'
      }
    ],
    sidebar: [
      'guide/installation.md',
      {
        title: 'Essentials',
        collapsable: false,
        children: ['/guide/', '/guide/essentials/example.md']
      },
      {
        title: 'Advanced',
        collapsable: false,
        children: ['/guide/advanced/example.md']
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
};
