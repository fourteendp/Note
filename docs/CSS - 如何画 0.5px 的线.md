---
title: CSS - 如何画 0.5px 的线
uid: 20240123112807336
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

## 前言

浏览器中的 `1px` 的像素单位，并不是物理意义上的一个像素点，而是和安卓的 `dp`、IOS 的 `pt` 类似的逻辑

单位

## 代码实现

```html
<body>
  <style>
    .line0::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background: #000;
    }

    .line1::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background: #000;
      transform: scaleY(0.5);
    }

    .line2::after {
      content: "";
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 1px;
      box-shadow: 0px 0.5px 0px red;
    }
  </style>
  <div class="line0">1px</div>
  <div class="line1">0.5px:缩放元素</div>
  <div class="line2">0.5px:阴影不受影响</div>
</body>
```

## 其它方法

- SVG 标签
- base64 背景

## 参考

- [如何画0.5px的边框线](https://cloud.tencent.com/developer/article/2177386)
- [0.5px的线如何实现](https://juejin.cn/post/7067514310393593870)

## 参考

- [[CSS - 单位]]
