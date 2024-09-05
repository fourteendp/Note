---
title: 前端 - CommonJS (CJS) 和 ECMAScript Modules (ESM、MJS)
uid: 5348024557987203
aliases:
  - CJS
  - CommonJS
  - ES Modules
  - ESM
  - MJS
categories: 
tags: 
archive: false
draft: false
todo: false
createTime: 2024-04-17 09:55:17
updateTime: 2024-09-05 09:49:38
---

在 JavaScript 中，MJS 和 CJS 分别指的是两种不同的模块系统：

1. **CommonJS (CJS)**:
   - CommonJS 是 Node.js 环境中使用的一种模块系统。
   - 它遵循 `require` 和 `module.exports` 的语法来导入和导出模块。
   - 模块是同步加载的，这意味着在模块被引用之前，必须先完成加载。
   - CommonJS 模块通常用于服务器端 JavaScript。

   ```javascript
   // CommonJS 导出
   module.exports = {
      myFunction: function() {
        // …
      }
   };

   // CommonJS 导入
   const myModule = require('./myModule');
   myModule.myFunction();
   ```

2. **ECMAScript Modules (ESM) / MJS**:
   - ECMAScript Modules 是现代 JavaScript 中推荐使用的模块系统，遵循 ECMAScript 6 (ES6) 标准。
   - 它使用 `import` 和 `export` 语法来导入和导出模块。
   - 模块可以是异步加载的，允许更灵活的加载时机。
   - ESM 在浏览器和现代 Node.js 环境中都得到支持。

   ```javascript
   // ECMAScript Modules 导出
   export const myFunction = () => {
     // …
   };

   // ECMAScript Modules 导入
   import { myFunction } from './myModule.js';
   myFunction();
   ```

在文件扩展名方面：

- CJS 模块通常使用 `.js` 扩展名。
- ESM 模块有时使用 `.mjs` 扩展名来明确表示它们是 ES 模块，尤其是在 Node.js 环境中，因为 Node.js 默认使用 CommonJS 模块系统。使用 `.mjs` 扩展名可以避免与 CommonJS 模块混淆。

请注意，从 Node.js 的某些版本开始，即使没有 `.mjs` 扩展名，只要文件中使用了 ESM 语法，Node.js 也会将文件识别为 ES 模块。然而，使用 `.mjs` 扩展名可以提供更清晰的模块类型指示。

在选择模块系统时，如果你正在开发一个现代的前端应用程序，可能会倾向于使用 ESM。如果你正在编写 Node.js 脚本，并且需要与现有的 CommonJS 模块兼容，可能会继续使用 CJS。随着时间的推移，Node.js 社区也在逐渐向 ESM 过渡。
