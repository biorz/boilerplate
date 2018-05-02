const pkg = require('./package.json');

const config = {
  // dev server
  port: 5050,

  // bundle
  vender: "vender",

  // 七牛
  ak: "iD3jx4tz-4p0FeGfhDrdRX6fcXrM3u-B_Atuzvah",
  sk: "2BYDSFEU3sHaqhZ5eGd6UvcDUmN_YW-i66nFsoxV",
  dist: "dist",
  bucket: "biorz",
  base: "http://p6nknvmlm.bkt.clouddn.com/"
}

module.exports = Object.assign(pkg, config)
