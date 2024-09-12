---
title: 前端 - Web Components 组件
uid: 20240123112807160
aliases: []
categories: []
tags:
  - 计算机/前端/组件
  - 计算机/前端/JavaScript
  - 计算机/前端/Web
  - Components
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:19
---

Web Components 允许开发者创建可重用的自定义元素，增强了 HTML 的功能。一个简单的 Web Components 示例可以通过以下步骤实现：

1. **定义一个自定义元素**：使用 JavaScript 的 `class` 关键字来定义一个新的类，这个类继承自 `HTMLElement`。这个类将作为自定义元素的构造函数。

   ```javascript
   class UserCard extends HTMLElement {
     constructor() {
       super(); // 调用基类的构造函数
       // 这里可以初始化元素的内部结构
     }
   }
   ```

2. **使用 `customElements.define` 方法注册自定义元素**：这个方法接受三个参数：自定义元素的标签名、构造函数和可选的配置对象。

   ```javascript
   customElements.define('user-card', UserCard);
   ```

3. **创建元素的内容**：可以在自定义元素的构造函数中创建元素的内部结构。例如，可以创建一个包含图片、用户名和邮箱的卡片。

   ```javascript
   class UserCard extends HTMLElement {
     constructor() {
       super();
       let img = document.createElement('img');
       img.src = 'path/to/image.jpg';
       // 其他内容创建…
       this.appendChild(img); // 将图片添加到元素中
     }
   }
   ```

4. **使用 `<template>` 标签**：可以使用 HTML 的 `<template>` 标签来定义组件的 HTML 结构，然后在 JavaScript 中动态地将其添加到 DOM 中。

   ```html
   <template id="userCardTemplate">
     <!-- 用户卡片的 HTML 结构 -->
   </template>
   ```

5. **使用 Shadow DOM**：Shadow DOM 允许你将组件的内部实现细节与外部 DOM 隔离，使得组件的样式和行为不会影响页面上的其他元素。

   ```javascript
   class UserCard extends HTMLElement {
     constructor() {
       super();
       let shadow = this.attachShadow({ mode: 'open' });
       // 将模板内容添加到 Shadow DOM 中
       let template = document.getElementById('userCardTemplate').content.cloneNode(true);
       shadow.appendChild(template);
     }
   }
   ```

6. **在页面中使用自定义元素**：一旦自定义元素被定义和注册，你可以像使用任何标准 HTML 元素一样在页面中使用它。

   ```html
   <user-card></user-card>
   ```

## 参考

- [Web Components —— Web 组件 - 掘金](https://juejin.cn/post/7048909361062051876)
