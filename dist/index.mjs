/*!
 * vite-plugin-xq-cp-dep v1.0.5 (http://xqkeji.cn/)
 * Author xqkeji.cn
 * LICENSE SSPL-1.0
 * Copyright 2023 xqkeji.cn
 */
 import path from 'path';
import fs from 'fs';

const pkg_file = path.resolve(__dirname, "../../../package.json");
const pkg = JSON.parse(fs.readFileSync(pkg_file, "utf8"));
const node_modules_path = path.resolve(__dirname, "../../../node_modules");
function xqCpDep() {
  return {
    name: "xq-cp-dep",
    config(config) {
      let root = config.root;
      let publicDir = path.join(root, "public");
      if (Object.prototype.hasOwnProperty.call(pkg, "dependencies")) {
        const deps = pkg.dependencies;
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
      let assetsDir = path.join(root, "assets");
      let destAssetsDir = path.join(publicDir, "assets");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
      }
      if (fs.existsSync(assetsDir) && !fs.existsSync(destAssetsDir)) {
        fs.cp(assetsDir, destAssetsDir, { recursive: true }, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  };
}

export { xqCpDep as default };
