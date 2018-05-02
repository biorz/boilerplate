/**
 * 公共配置
 */
const path = require("path");
const webpack = require("webpack");
const conf = require("../build-config");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  // 加载器
  module: {
    // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
    rules: [
      {
        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              }
            ],
            less: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "less-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          postLoaders: {
            html: "babel-loader?sourceMap"
          },
          sourceMap: true
        }
      },

      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          sourceMap: true
        },
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        loaders: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },

      {
        test: /\.less$/,
        loaders: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },

      {
        test: /\.scss$/,
        loaders: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },

      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=8192"
      },

      {
        test: /\.(html|tpl)$/,
        loader: "html-loader"
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: "common"
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },

  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": resolve("src")
    }
  },

  externals: {
    jQuery: {
      root: "jQuery",
      commonjs: "jQuery",
      commonjs2: "jQuery",
      amd: "jQuery"
    },
    jquery: {
      root: "jQuery",
      commonjs: "jQuery",
      commonjs2: "jQuery",
      amd: "jQuery"
    },
    $: {
      root: "jQuery",
      commonjs: "jQuery",
      commonjs2: "jQuery",
      amd: "jQuery"
    },
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue"
    }
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env.VERSION": `'${conf.version}'`
    })
  ]
};
