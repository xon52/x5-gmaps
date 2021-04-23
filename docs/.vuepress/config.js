module.exports = {
  base: '/x5-gmaps/',
  title: 'x5-gmaps Docs',
  description:
    'Documentation for the x5-gmaps lightweight Google Maps plugin for Vue.',
  head: [
    ['meta', { name: 'theme-color', content: '#0086ff' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#0086ff' }]
  ],

  themeConfig: {
    docsDir: 'docs',
    editLinkText: 'Improve this page',
    editLinks: true,
    lastUpdated: true,
    repo: 'xon52/x5-gmaps',
    repoLabel: 'Github',
    smoothScroll: true,
    nav: [
      {
        text: 'Guide',
        link: '/guide.md'
      },
      {
        text: 'Components',
        link: '/api/'
      },
      {
        text: 'Demo',
        link: '/demo.md'
      }
    ],
    sidebar: [
      { title: 'Installation', path: '/install.md' },
      { title: 'Guide', path: '/guide.md' },
      {
        title: 'Components',
        path: '/api/',
        sidebarDepth: 0,
        children: [
          { title: 'Map', path: '/api/map.md' },
          { title: 'Marker', path: '/api/marker.md' },
          { title: 'Info Window', path: '/api/infoWindow.md' },
          { title: 'Popup', path: '/api/popup.md' },
          { title: 'Heatmap', path: '/api/heatmap.md' },
          { title: 'Polylines', path: '/api/polylines.md' },
          { title: 'Shapes', path: '/api/shapes.md' },
          { title: 'Data (GeoJSON)', path: '/api/data.md' }
        ]
      },
      { title: 'Advanced', path: '/advanced.md' },
      { title: 'Demo', path: '/demo.md' }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
};
