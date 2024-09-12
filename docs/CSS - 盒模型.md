---
title: CSS - 盒模型
uid: 20240123112807444
aliases: []
categories: []
tags:
  - CSS
  - HTML
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:24
---

盒模型是 CSS 中的一个概念，用于描述 HTML 元素的布局。盒模型由内容区域、内边距、边框和外边距组成。

![[盒子模型.png]]

## 标准盒模型

- box-sizing 属性为 content-box（默认值）
- 宽高等于内容区域

## 怪异盒模型

- box-sizing 属性为 border-box
- 宽高等于内容区域 + 内间距 + 外边框
