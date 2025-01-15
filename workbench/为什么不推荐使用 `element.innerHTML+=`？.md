---
title: 为什么不推荐使用 `element.innerHTML+=`？
uid: 1736480890580
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2025-01-10 11:48:10
updateTime: 2025-01-10 11:48:58
---

> 在 JavaScript 开发中，许多人习惯于使用 `element.innerHTML+=` 来向一个元素添加内容。

在 JavaScript 开发中，许多人习惯于使用 `element.innerHTML+=` 来向一个元素添加内容。然而，这种做法存在多种缺点。本文将探讨这些问题，并介绍更好的替代方法。

## 1. 性能问题

每次设置 `innerHTML` 时，浏览器都需要解析 HTML 字符串，构建 DOM 树，然后插入到文档中。这一过程耗时较长，特别是当 `innerHTML` 包含大量内容时。例如，如果一个元素中已有大量的 div、表格、列表和图片，再次使用 `innerHTML+=` 添加一个新的 div 会导致重新解析这些内容，从而拖慢性能。

## 2. 事件处理器丢失

使用 `innerHTML` 会破坏元素上已有的事件处理器。每当 `innerHTML` 被设置，旧的内容会被删除，新内容会被解析并插入，这个过程中事件处理器会被移除。这可能会导致功能异常，尤其是在动态更新内容时。

## 3. 安全问题

直接设置 `innerHTML` 存在安全隐患。未经过滤的输入可能导致跨站脚本攻击（XSS），这是一个严重的安全问题。Mozilla 已对直接修改 `innerHTML` 提出警告，建议使用更安全的方法。

替代方法
----

## 1. `Element.insertAdjacentHTML`

使用 `insertAdjacentHTML` 可以避免重新解析整个元素内容，只插入新内容。例如：

```
element.insertAdjacentHTML('beforeend', '<div>Hello World</div>');


```

这种方法更加高效，并且保留了原有内容的事件处理器。

## 2. `Document.createElement` 和 `Element.appendChild`

通过创建新元素并附加到现有元素，可以更好地控制 DOM 操作。例如：

```
var newElement = document.createElement('div');
newElement.textContent = 'Hello World';
element.appendChild(newElement);


```

这种方法不仅高效，还能确保事件处理器不会丢失。

## 3. `DOMParser` 解析

使用 `DOMParser` 可以更安全地解析 HTML 字符串，并将其插入 DOM 中。例如：

```
const parser = new DOMParser();
const doc = parser.parseFromString('<div>Hello World</div>', 'text/html');
element.appendChild(doc.body.firstChild);


```

这种方法能够有效防止 XSS 攻击，并确保插入的脚本节点正确执行。

总结
--

虽然 `element.innerHTML+=` 是一种简便的方法，但其性能、安全性和兼容性问题使其不适合作为长期解决方案。通过使用 `insertAdjacentHTML`、`appendChild` 和 `DOMParser` 等方法，可以实现更高效、安全的 DOM 操作，确保网页性能和用户体验的提升。
