var path = require('path')
var utils = require('./utils')
var config = require('../config')
var pages = require('./page.config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function genEntry() {
  var entries = {}
  for (var key in pages) {
    //  该路径是相对于webpack编译时的基础目录context（也就是package.json所在目录）
    entries[key] = `${pages[key]}/index.js`
  }
  return entries
}


module.exports = {
  entry: genEntry(),
  output: {
    path: config.build.assetsRoot,    // 绝对路径
    filename: '[name].js',
    //  保持与webpack-dev-server的publicPath一致为 '/'
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ],
  }
}
