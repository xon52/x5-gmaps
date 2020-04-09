const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/x5-gmaps/'
    : '/',
  outputDir: __dirname + '/docs',
  pages: {
    index: {
      entry: './example/main.js',
      template: './example/public/index.html',
    },
  },
  configureWebpack: {
    plugins: [
      new CopyPlugin([
        {
          from: path.join(__dirname, 'example/public'),
          to: path.join(__dirname, 'docs'),
          toType: 'dir',
          ignore: ['index.html', '.DS_Store'],
        },
      ]),
    ],
  },
}
