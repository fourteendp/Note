---
title: 前端 - 关于package.json中type属性的含义
uid: 20240123112807170
aliases: []
categories: 
tags:
  - 计算机/前端/工程化
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:19
originalUrl: 'https://juejin.cn/post/7032278473389539365'
---

关于 package.json 中 type 属性的含义

## JavaScript 模块化的前世今生

Javascript 的模块化包括有 CMD、AMD、UMD、CommonJS、ES Modules 等规范。而 NodeJS 的模块化方案正是采用 CommonJS 规范。

我们这里不展开对以上几种模块化方案的细节讨论，我们关心的是 package.json 中的 type 属性定义。

## NodeJS 支持 ES6 模块化

在早期的 nodejs 版本中，node 仅支持 CommonJS 模块化方案，不过在 nodejs 版本 **13.2.0** 中，node 正式支持 ES Modules 模块化，在 package.json 中的 type 字段声明

```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## 总结说明

1. type 字段用于定义 package.json 文件和该文件所在目录根目录中 **.js** 文件和**无扩展名**文件的模块化处理规范，默认值为 `commonjs`
2. type 字段省略则默认采用 commonjs 规范
3. 当 type 字段指定值为 **module** 则采用 ES Modules 规范
4. node 官方建议包的开发者明确指定 package.json 中的 type 字段值
5. 不论 package.json 中的 type 字段为何值，**.mjs** 的文件都按照 es 模块来处理，**.cjs** 的文件都按照 commonjs 模块来处理
