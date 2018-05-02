/**
 * 打包发布
 */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./config.base.js");
const utils = require('./utils')
const conf = require('../build-config')

process.env.NODE_ENV = "production";

let entry = utils.getEntries(),
  htmls = utils.createdHtml(entry, 'dist/pages/'),

  plugins = (() => {
    let plugins = []

    return plugins.concat(htmls)
  })()

const config = {
  mode: "production",
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
