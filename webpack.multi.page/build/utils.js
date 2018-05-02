const conf = require('./config')
const path = require('path');
const fs = require('fs')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const filterFile = (w, b) => {

}

const getEntries = () => {
  let pageDir = path.resolve(__dirname, "../src/pages"),
    readDir = (dir, cb) => {
      let files = fs.readdirSync(dir);
      files.forEach((file) => {
        cb(file);
      })
    },
    entry = {}

  readDir(pageDir, (item) => {
    let filePath = path.join(pageDir, item),
     stat = fs.statSync(filePath)

    if(stat.isFile()) return;

    readDir(filePath, (it) => {
      let fp = path.join(filePath, it),
        fileName = path.basename(fp)

      if(fileName === 'index.js') {
        let dir = path.dirname(fp)
        dir = dir.split(/[\/\\]/).pop()
        entry[dir] = fp
      }
    })
  })

  console.log('entry:', entry)
  return entry;
}

const createdHtml = (entry, dist) => {
  let htmlPlugins = []

  for(let k in entry){
    let ins = new HtmlWebpackPlugin({
      inject: true,
      filename: path.resolve(__dirname, '..', dist, `${k}.html`),
      template: path.resolve(__dirname, '..', "examples/index.html"),
      chunks: ['vender', k]
    })

    htmlPlugins.push(ins)
  }

  console.log('htmlPlugins:', htmlPlugins)

  return htmlPlugins
}

module.exports = {
  getEntries,
  createdHtml,
  filterFile
}

if(require.main === module) {
  getEntries()
}

