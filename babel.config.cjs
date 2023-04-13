const buildPresets = [['@babel/preset-env'], '@babel/preset-typescript'];
const buildPlugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties']
];
module.exports = {
  presets: process.env.NODE_ENV === 'production' ? buildPresets : [],
  plugins: process.env.NODE_ENV === 'production' ? buildPlugins : []
};
