# vite-plugin-xq-cp-dep

A vite copy all package.json config item 'dependencies' and project directory 'src/assets' to public directory plugin.

一个将package.json配置文件中配置的'dependencies'的所有依赖包和项目目录'src/assets'自动复制到public目录的插件。

## 安装
```bash

npm i -D vite-plugin-xq-cp-dep

```
## 使用
Add plugin to your `vite.config.ts`:
在vite.config.ts引入插件：

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import xqCpDep from 'vite-plugin-xq-cp-dep';
export default defineConfig({
  plugins: [
    xqCpDep()
  ],
}
```

## 工作原理

package.json配置示例：

```ts
{
  "name": "xqhome",
  ......省略其他配置
  "dependencies": {
    "@popperjs/core": "^2.11.6",
    "bootstrap": "^5.2.2",
    "bootstrap-icons": "^1.9.1"
  }
}

```

该插件将自动将'node_modules/bootstrap'和'node_modules/bootstrap-icons'两个目录复制到public目录下，这样在Html文件中可以直接嵌入这两个目录相关的js、css等资源。


```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>标题</title>
    <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css">
    <script type="text/javascript" src="/bootstrap/dist/js/bootstrap.js"></script>
  </head>
```

因为bootstrap和bootstrap-icons的文件都已经复制到public目录下，因此可以直接使用。
另外public是公共目录，在页面引用的路径中无需写上public。

# 备注说明

### 如果复制的目录目标目录已经存在，将会跳过操作。
### 例如：复制'node_modules/bootstrap'目录到public目录下时，'public/bootstrap'目录已经存在，将会被跳过。如果需要更新，则需要将'public/bootstrap'手动删除。
### 如果项目目录'src/assets'存在，整个目录也会被复制到public目录下。