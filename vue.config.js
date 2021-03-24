const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: __dirname + '/docs',
  pages: {
    index: {
      entry: './demo/src/main.js',
      template: './demo/public/index.html'
    }
  },
  // For copying static files like favicon
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: __dirname + '/demo/public',
            to: __dirname + '/docs',
            context: __dirname + '/demo/public',
            toType: 'dir',
            globOptions: {
              ignore: ['index.html']
            }
          }
        ]
      })
    ],
    resolve: {
      alias: {
        lib: __dirname + '/lib'
      }
    }
  }
};
