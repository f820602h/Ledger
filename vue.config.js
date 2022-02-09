const path = require("path");
const webpack = require("webpack");
const hmr = new webpack.HotModuleReplacementPlugin();

module.exports = {
  publicPath: "/",
  lintOnSave: true,
  outputDir: path.resolve(__dirname, "./server/dist"),
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config
        .entry("app")
        .clear()
        .add(path.join(__dirname, "./src/main.js"));
    } else {
      config
        .entry("app")
        .clear()
        .add("webpack-hot-middleware/client?quiet=true")
        .add("webpack/hot/only-dev-server")
        .add(path.join(__dirname, "./src/main.js"));
      config.plugin("hot").use(hmr);
      config.entry.app = ["babel-polyfill", "./src/main.js"];
    }
  }
};
