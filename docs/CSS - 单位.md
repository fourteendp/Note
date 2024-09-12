---
title: CSS - 单位
uid: 20240123112806908
aliases: []
categories: []
tags:
  - 单位
  - 计算机/前端/CSS
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:24
---

## 相对单位

- 字体
  - em
    - 是相对于父元素的字体大小，如果父元素没有设置字体大小，那么就是相对于浏览器的默认字体大小。
  - rem ^f590d2
    - 是相对于根元素的字体大小，如果根元素没有设置字体大小，那么就是相对于浏览器的默认字体大小。
  - ex
    - 是相对于字体的 x-height，x-height 是字体中小写字母 x 的高度。
  - ch
    - 是相对于字体的 0 的宽度。
- 视口
  - vw
    - 是相对于视口宽度的百分比。
  - vh
    - 是相对于视口高度的百分比。
  - vmin
    - 是相对于视口宽度和高度中较小的那个的百分比。
  - vmax
    - 是相对于视口宽度和高度中较大的那个的百分比。

## 绝对单位

- px
  - 是相对于显示器屏幕分辨率的，也就是 1px = 1/96th of 1in。
  - 注意，浏览器渲染小数像素时，会四舍五入到最近的整数像素，所以，如果想要渲染小数像素，可以使用
    `transform: scale(0.5)`。
  - 详见下方的参考。
- cm
  - 是相对于显示器屏幕分辨率的，也就是 1cm = 96px/2.54。
- mm
  - 是相对于显示器屏幕分辨率的，也就是 1mm = 1/10th of 1cm。
- in
  - 是相对于显示器屏幕分辨率的，也就是 1in = 2.54cm = 96px。
- pt
  - 是相对于显示器屏幕分辨率的，也就是 1pt = 1/72th of 1in。
- pc
  - 是相对于显示器屏幕分辨率的，也就是 1pc = 12pt。

## 百分比

- %
  - 是相对于父元素的百分比。

## 分辨率

- dpi
  - 是相对于显示器屏幕分辨率的，也就是 1dpi = 1dpcm = 1dppx。
- dpcm
  - 是相对于显示器屏幕分辨率的，也就是 1dpcm = 2.54cm = 96px。
- dppx
  - 是相对于显示器屏幕分辨率的，也就是 1dppx = 1px。

## 参考

- [[CSS - 如何画 0.5px 的线]]
- [一文读懂 CSS 单位 - 知乎](https://zhuanlan.zhihu.com/p/440269115)
- [CSS Units for Responsive Design](https://www.sitepoint.com/css-units-responsive-design-why-its-still-a-big-deal/)
- [浏览器渲染小数像素 - 简书](https://www.jianshu.com/p/e2a801e0347f)
- [浏览器的最小渲染单位不是 1px？ - V2EX](https://v2ex.com/t/760925)
