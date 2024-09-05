---
title: 单行、多行溢出省略号
uid: 20240123112807316
aliases: []
categories: []
tags:
  - 计算机/前端/CSS
  - 溢出省略号
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:24
---

## 使用 CSS 实现

### 单行

```css
overflow: hidden; //超出的文本隐藏
text-overflow: ellipsis; //溢出用省略号显示
white-space: nowrap; //溢出不换行
```

### 多行

```css
display: -webkit-box;
overflow: hidden;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

### 无固定宽度省略号的显示

- 在需要文本超出显示省略号盒子上添加 `width: fit-content` 属性
- 在 `flex` 盒子等较复杂的布局下，可以尝试在需超出显示省略号的元素盒子上添加 `min-width:0` 属性，并
  且在 dom 结构树当前最外的盒子添加 `width:100%` 属性
