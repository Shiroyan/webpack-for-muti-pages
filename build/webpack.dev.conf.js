var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var pages = require('./page.config')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// https://github.com/ampedandwired/html-webpack-plugin
function genHtmlWebpackPlugin() {
  var arr = [];
  for (var key in pages) {
    arr.push(new HtmlWebpackPlugin({
      filename: `${key}.html`,               // 相对于 output.publicPath, 在dev-server中则是相对于其publicPath， 这也是为什么要保持这二者相同的原因
      template: `${pages[key]}/index.html`,  // 相对于 context
      inject: true,
      chunks: [`${key}`]
    }))
  }
  return arr;
}

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ].concat(genHtmlWebpackPlugin())
})
