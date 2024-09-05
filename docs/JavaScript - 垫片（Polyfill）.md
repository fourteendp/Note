---
title: JavaScript - 垫片（Polyfill）
uid: 1722582826617
aliases: []
categories: 
tags:
  - 名词解释
archive: false
draft: false
todo: false
createTime: 2024-08-02 15:13:46
updateTime: 2024-09-05 09:00:51
---

**什么是垫片**

在软件开发中，" 垫片 "（Polyfill）是一种代码片段或插件，用于在旧的或不支持某些现代特性的浏览器或环境中模拟现代 Web API。简而言之，垫片允许开发者使用新的或改进的 Web 技术，而不必担心兼容性问题。

以下是垫片的一些关键点：

1. **兼容性**：垫片提供了一种方法，使得在不支持某些特性的旧浏览器中也能使用这些特性。
2. **功能模拟**：垫片通过实现底层的逻辑来模拟现代 Web API 的功能。
3. **渐进增强**：通过使用垫片，开发者可以采用渐进增强的策略，即在所有浏览器上提供基本功能，同时在支持的浏览器上提供增强功能。
4. **维护性**：随着浏览器对新特性的支持逐渐普及，垫片可能不再需要，但它们在过渡期间非常有用。
5. **社区支持**：许多垫片是由社区成员开发的，并且通常可以在开源项目中找到。
6. **性能考虑**：虽然垫片可以提高兼容性，但它们可能会增加页面加载时间和运行时性能的开销，因为它们需要在不支持的浏览器中执行额外的代码。
7. **使用场景**：垫片常用于实现 HTML5、CSS3、ECMAScript 6（ES6）等现代 Web 标准的特性，例如 Promises、Fetch API、Array.find() 等。

举个例子，如果你想要在一个不支持 ES6 Promises 的旧浏览器中使用 Promises，你可以引入一个 Promise 垫片，如下所示：

```html
<script src="path/to/promise-polyfill.js"></script>
<script>
  // 现在你可以在不支持Promise的浏览器中使用Promise了
  new Promise((resolve, reject) => {
    // …
  });
</script>
```

使用垫片是一种常见的做法，特别是在需要支持旧浏览器的情况下。然而，随着现代浏览器对新特性的支持越来越好，垫片的使用也在逐渐减少。

## 参考

- [javascript - 何为垫片？垫片是一种什么概念在js中？ - SegmentFault 思否](https://segmentfault.com/q/1010000007256959)
