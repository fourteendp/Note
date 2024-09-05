---
title: BFC
uid: 20240123112806890
aliases: []
categories: []
tags:
  - 计算机/前端/CSS
  - 计算机/前端/HTML
  - BFC
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 14:00:44
---

## 作用

- 形成独立空间作用域不影像外部布局

## 触发

- float 不为 none
- position 不为 relative 和 static
- overflow 不为 auto、scroll 和 hidden
- display 值为 table-cell 或 inline-block

## 解决高度塌陷

- 给父元素触发 BFC
- 添加固定高度
- 给最后一个标签添加 clear: both 清除浮动属性
