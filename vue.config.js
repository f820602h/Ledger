const path = require('path')
const webpack = require('webpack')
const hmr = new webpack.HotModuleReplacementPlugin()

module.exports = {
  publicPath: '/',
  lintOnSave: true,
  outputDir: path.resolve(__dirname, './server/dist'),
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('webpack-hot-middleware/client?quiet=true')
      .add('webpack/hot/only-dev-server')
      .add(path.join(__dirname, './src/main.js'))
    config.entry.app = ['babel-polyfill', './src/main.js']
    config.plugin('hot').use(hmr)
  }
}
