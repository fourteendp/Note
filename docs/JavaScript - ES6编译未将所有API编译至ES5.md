---
title: JavaScript - ES6编译未将所有API编译至ES5
uid: 1721632808434
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-07-22 15:20:08
updateTime: 2024-10-29 10:47:08
---

原因出在于 [Babel](https://www.babeljs.cn/) 无法将所有 API 完全编译至 ES5

1. [ECMAScript](https://262.ecma-international.org/) 最新标准 [Babel](https://www.babeljs.cn/) 未及时进行支持或未更新，等待支持或更新
2. API 不支持编译成 ES5，比如 Vue3 中的 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

ES5 可以实现但未支持的 API 可以手写实现如 [Array.prototype.find()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

```javascript
// polyfill
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value: function (predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }
      var thisArg = arguments[1];
      var k = 0;
      while (k < len) {
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        k++;
      }
      return undefined;
    },
    configurable: true,
    writable: true,
  });
}
```
