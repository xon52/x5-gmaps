const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json']
  },
  entry: './lib/index.ts',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'x5-gmaps'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          configFile: 'tsconfig-lib.json'
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  externals: {
    vue: 'vue'
  },
  plugins: [new VueLoaderPlugin()],
  optimization: {
    minimize: false
  }
};
