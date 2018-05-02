/**
 * 打包发布
 */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const utils = require('./utils')
const conf = require('../config')

process.env.NODE_ENV = "production";

let entry = utils.getEntries(),
  htmls = utils.createdHtml(entry, 'dist/pages/'),

  plugins = (() => {
    let plugins = [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendors",
        filename: "vendor.bundle.js",
        minChunks: 3,
      })
    ]

    return plugins.concat(htmls)
  })()

const config = {
  devtool: "source-map",

  entry,
  output: {
    path: path.resolve(__dirname, "../dist/public"),
    publicPath: conf.base + conf.name + "/" + conf.version + "/",
    filename: '[name].js',
    chunkFilename: "[name].chunk.js"
  },
  plugins
}

module.exports = merge(webpackBaseConfig, config)
