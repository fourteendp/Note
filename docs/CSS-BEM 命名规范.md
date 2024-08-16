---
title: CSS-BEM 命名规范
uid: 20240123112806908
aliases: []
categories: []
tags:
  - 计算机/前端/命名规范
  - 计算机/前端/CSS
  - CSS-BEM
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 14:00:43
---

## 什么是 BEM 命名规范

BEM 是 Block Element Modifier 的缩写,为什么要使用 BEM 命名规范呢?

- Block: 一个独立的组件
- Element: 一个组件的一部分
- Modifier: 一个组件的状态

```css
.block {
}
.block__element {
}
.block--modifier {
}
```

## 个人使用简化版

- 为什么简化:
  - 规范是死的,代码是活的,代码的可读性比规范更重要
  - BEM 的命名规范有点长,不够简洁

```css
.block {
}
.block_element {
}
.block-modifier {
}
```

## 参考

- [BEM 101](https://css-tricks.com/bem-101/)
- [[[译] 这些 CSS 命名规范将省下你大把调试时间 - 掘金](https://juejin.cn/post/6844903556420632583)
- [CSS Naming Conventions that Will Save You Hours of Debugging](https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849)
