const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const conf = require("../config");

process.env.NODE_ENV = "development";

const config = {
  devtool: "source-map",

  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: conf.base + conf.name + "/" + conf.version + "/",
    filename: conf.name + ".js",
    library: conf.name,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue"
    }
  },
  plugins: [
    // @todo
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
      }
    })
  ]
}

module.exports = merge(webpackBaseConfig, config)
