const path = require('path')
module.exports = {
  lintOnSave: true,
  outputDir: path.resolve(__dirname, './server/dist'),
  chainWebpack: config => {
    let temp = config
      .entry('app')
      .clear()
      .add(path.join(__dirname, './src/main.js'))
    if (process.env.NODE_ENV === 'development') {
      temp.add('webpack-hot-middleware/client')
    }
  }
}
