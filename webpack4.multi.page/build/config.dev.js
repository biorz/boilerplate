/**
 * 本地预览
 */
const path = require("path");
const webpack = require("webpack");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./config.base.js");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const utils = require('./utils')
const conf = require('../build-config')


let entry = utils.getEntries(),
  htmls = utils.createdHtml(entry, 'examples/dist/'),

  plugins = (() => {
    let plugins = [
      new FriendlyErrorsPlugin()
    ]

    return plugins.concat(htmls)
  })()

module.exports = merge(webpackBaseConfig, {
  mode: "development",
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
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm.js"
      // vue: 'vue/dist/vue.runtime.js'
    }
  },
  plugins
});
