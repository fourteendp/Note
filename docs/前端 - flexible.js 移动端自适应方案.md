---
title: 前端 - flexible.js 移动端自适应方案
uid: 1722908559116
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-06 09:42:39
updateTime: 2024-09-12 08:13:19
---

flexible.js 是由手淘团队开发的一种移动端自适应方案，其核心原理是通过设置不同的 `font-size` 值给 `html` 根节点，利用 `rem` 单位来实现不同屏幕下的适配 。具体来说，flexible.js 会根据设备的宽度动态计算并设置 `html` 根标签的 `font-size`，而页面元素则使用 `rem` 单位来设置宽、高和相对位置，以此达到适配不同设备屏幕的目的 。

使用 flexible.js 的步骤如下：

1. 下载并引入 flexible.js 到项目中，可以在 `<head>` 标签内通过 `<script>` 标签引入。
2. 设置 `viewport` 的 `meta` 标签，以控制布局在不同设备上的展示方式。例如：

```html
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

1. 在 `head` 标签内使用 `style` 标签设置初始的 `font-size`，通常设置为 `16px`。
2. 使用 `rem` 单位来布局页面元素，其中 `1rem` 等于 `html` 的 `font-size`。

flexible.js 的优势在于提高了开发效率，具有良好的屏幕适应性，并且可以提升页面的加载速度 。然而，它也有一些不足之处，比如在 2 倍屏幕下可能会出现锯齿问题，对于 `rem` 字体的适配不够完美，以及可能存在与其他 CSS 框架集成的问题 。

在实际开发中，可以使用 VSCode 的 `cssrem` 插件来辅助将 `px` 单位转换为 `rem` 单位，提高开发效率 。此外，flexible.js 的源码显示，它会根据设备的 `devicePixelRatio` 来动态调整 `html` 的 `font-size`，实现适配不同分辨率的屏幕 。
