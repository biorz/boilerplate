/**
 * 本地预览
 */
const path = require("path");
const webpack = require("webpack");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const utils = require('./utils')
const conf = require('../config')


let entry = utils.getEntries(),
  htmls = utils.createdHtml(entry, 'examples/dist/'),

  plugins = (() => {
    let plugins = [
      new webpack.optimize.CommonsChunkPlugin({
        name: conf.vender,
        filename: "[name].js",
        minChunks: 3
      }),
      new FriendlyErrorsPlugin()
    ]

    return plugins.concat(htmls)
  })()

module.exports = merge(webpackBaseConfig, {
  devtool: "eval-source-map",

  // 入口
  entry,
  // 输出
  output: {
    path: path.join(__dirname, "../examples/dist"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm.js"
      // vue: 'vue/dist/vue.runtime.js'
    }
  },
  plugins
});
