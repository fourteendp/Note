---
title: CSS - image 标签图片的白边
uid: 20240123112807164
aliases: []
categories: []
tags:
  - 计算机/前端/CSS
  - 计算机/前端/HTML
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:24
---

## 为什么 image 标签会有白边

image 标签的默认样式是 `display: inline-block;`，这个样式会导致图片有白边。

## 解决方法

### 1. 设置 `display: block;`

```css
img {
  display: block;
}
```

### 2. 设置 `vertical-align: top;`

```css
img {
  vertical-align: top;
}
```

### 3. 设置 `line-height: 0;`

```css
img {
  line-height: 0;
}
```

### 4. 设置 `font-size: 0;`

```css
img {
  font-size: 0;
}
```
