const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'x5-gmaps',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  externals: {
    vue: 'vue',
  },
  plugins: [new VueLoaderPlugin()],
}
