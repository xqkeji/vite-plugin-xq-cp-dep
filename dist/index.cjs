/*!
 * vite-plugin-xq-cp-dep v1.0.3 (http://xqkeji.cn/)
 * Author xqkeji.cn
 * LICENSE SSPL-1.0
 * Copyright 2022 xqkeji.cn
 */
 'use strict';

const path = require('path');
const fs = require('fs');

const pkg_file = path.resolve(__dirname, "../../../package.json");
const pkg = JSON.parse(fs.readFileSync(pkg_file, "utf8"));
const node_modules_path = path.resolve(__dirname, "../../../node_modules");
function xqCpDep() {
  return {
    name: "xq-cp-dep",
    config(config) {
      if (Object.prototype.hasOwnProperty.call(pkg, "dependencies")) {
        const deps = pkg.dependencies;
        let root = config.root;
        let publicDir = path.join(root, "public");
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir);
        }
        for (const dep in deps) {
          const dirPath = path.join(node_modules_path, dep);
          const cpDest = path.join(publicDir, dep);
          if (!fs.existsSync(cpDest)) {
            fs.cp(dirPath, cpDest, { recursive: true }, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        }
      }
    }
  };
}

module.exports = xqCpDep;
