const qiniu = require("qiniu");
const conf = require("../build-config");
const fs = require("fs");
const path = require("path");

const mac = new qiniu.auth.digest.Mac(conf.ak, conf.sk);

const main = (() => {
  let { files, remotes } = getFiles(conf.dist);
  let fv,
    rv,
    res = [];

  let next = idx => {
    idx = idx || 0;
    if ((fv = files[idx])) {
      rv = remotes[idx];
      return upload(fv, rv, (body, info) => {
        res.push({ body, info });
        next(++idx);
      });
    }

    refreshCdn(remotes);
  };
  next();
})();

/**
 * 获取上传文件
 *
 * @param {any} dir
 * @returns
 */
function getFiles(dir) {
  let files = [];
  let remotes = [];

  function get(dir) {
    let f = fs.readdirSync(dir);

    f.forEach(it => {
      let pa = path.join(dir, it);
      let st = fs.statSync(pa);
      if (st.isDirectory()) {
        return get(pa);
      }
      files.push(pa);
      pa = pa
        .split(path.sep)
        .slice(1)
        .join("/");
      remotes.push([pkg.name, pkg.version, pa].join("/"));
    });
  }

  get(dir);
  return { files, remotes };
}

/**
 * 上传
 *
 * @param {any} file
 * @param {any} remote
 * @param {any} callback
 */
function upload(file, remote, callback) {
  // 覆盖上传
  let keyToOverwrite = remote;
  let popiton = {
    scope: conf.bucket + ":" + keyToOverwrite
  };
  let putPolicy = new qiniu.rs.PutPolicy(popiton);
  let uploadToken = putPolicy.uploadToken(mac);

  // 上传
  let uoption = {};
  let formUploader = new qiniu.form_up.FormUploader(uoption);
  let putExtra = new qiniu.form_up.PutExtra();

  // 文件上传
  formUploader.putFile(
    uploadToken,
    remote,
    file,
    putExtra,
    (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
      } else {
        console.log(respInfo);
        console.log(respBody);
      }
      callback(respBody, respInfo);
    }
  );
}

/**
 * 刷新cdn
 *
 * @param {any} remotes
 */
function refreshCdn(remotes) {
  let cdnManager = new qiniu.cdn.CdnManager(mac);

  let urlsToRefresh = remotes.map(it => {
    return conf.base + it;
  });

  console.log(urlsToRefresh);
  //刷新链接，单次请求链接不可以超过100个，如果超过，请分批发送请求
  cdnManager.refreshUrls(urlsToRefresh, function(err, respBody, respInfo) {
    if (err) {
      throw err;
    }
    if (respInfo.statusCode == 200) {
      let jsonBody = JSON.parse(respBody);
      console.log(jsonBody.code);
    }
  });
}
