const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [['@babel/preset-env'], '@babel/preset-typescript'];
const buildPlugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }]
];
module.exports = {
  presets: process.env.NODE_ENV === 'development' ? devPresets : buildPresets,
  plugins: process.env.NODE_ENV === 'development' ? [] : buildPlugins
};
