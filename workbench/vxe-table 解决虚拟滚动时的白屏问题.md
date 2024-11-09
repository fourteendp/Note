---
title: vxe-table 解决虚拟滚动时的白屏问题
uid: 1728454526461
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-10-09 14:15:26
updateTime: 2024-10-11 14:51:04
---

项目中使用虚拟滚动，滚动一快就会白屏，花了两天时间看了源码，检查渲染元素，发现元素渲染的是很快的，跟得上的，但是还是会出现白屏，后面检查样式，发现只要把表格背景色去掉，滚动一点问题都没有，这个白屏居然是表格的背景色导致的

## 更新版本即可解决

> [#2160](https://github.com/x-extends/vxe-table/pull/2160) pr 已合并，[vue3](https://so.csdn.net/so/search?q=vue3&spm=1001.2101.3001.7020) 更新 vxe-table 到 v4 最新版即可 `npm i -s vxe-table@latest`，vue2 更新 vxe-table 到 v3 版本最新版即可 `npm i -s vxe-table@legacy`

## v3 版本去掉背景色（不推荐，这里仅为举例）

```
.vxe-table--main-wrapper .vxe-table--render-default .vxe-table--body-wrapper,
.vxe-table--main-wrapper .vxe-table--render-default .vxe-table--footer-wrapper {
  background-color: transparent !important;
}

```

## v4 版本去掉背景色（不推荐，这里仅为举例）

```
.vxe-table--render-default .vxe-table--body-wrapper {
    background-color: transparent !important;
}

```

## （推荐解决方案）把 `.vxe-table--body-wrapper` 的 `background` 属性设置成 `none`，即可覆盖 `background-color`，需要背景色的话改成给子元素的 `table` 设置 `background-color`

给官方提的 pr 就是这一方案

![[assets/df93dd3e7e528400befa410a12adbb70_MD5.png]]

直接给 table 设置背景色不会出现白屏，只有给最外层这个 div 设置背景色，会出现这样情况，感觉这时的浏览器渲染机制是，先渲染背景色，再渲染表格

个人感觉最有可能是绘制顺序的原因

![[assets/88eebf8da3460506dc32ec39a1673970_MD5.png]]

![[assets/f7730c9e35601645d496b0faf138cee7_MD5.png]]
