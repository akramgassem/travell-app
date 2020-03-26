const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

common.plugins.push(new WorkboxPlugin.GenerateSW());
module.exports = merge(common, {
  mode: 'production',
  stats: 'verbose',
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
});
