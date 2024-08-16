---
title: 花了一天的时间，地板式扫盲了 vue3 所有 API 盲点
uid: 20240123112809284
aliases: []
categories: []
tags:
  - 计算机/前端/Vue3
archive: false
draft: false
todo: false
originalUrl: https://juejin.cn/post/7164159759619194893
createTime: 2023-05-07 22:01:33
updateTime: 2024-08-02 13:59:18
---

## 📍前言

最近在一次理解 `vue` 项目的代码时，发现周一对好多 `API` 都不太熟悉。这间接导致的问题是，代码理解速度

要比平常要慢很多。于是乎，赶忙把 `vue API` 的学习提上了日程。

在下面的文章中，将地板式地扫盲 `vue3` 文档中 `API` 模块的所有内容，融入周一的理解进行深入介绍。下面

就来一起看看吧~🍬

## 一、🖇框架搭建

### 1、关于文档

首先附上官方文档的具体材

料：[cn.vuejs.org/api/](https://link.juejin.cn?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2F "https://cn.vuejs.org/api/")

### 2、VUE3 API 整体盘点

在 `vue3` 的全新 `API` 中，有部分在 `vue2` 的基础上沿用了。还有另外一部分，是 `vue3` 所新增加的。我

们先来看 `vue3 API` 文档主要包含哪些内容？

`vue3 API` 主要包含以下六个部分：

- 全局 API —— 全局会用到的 API
- 组合式 API —— vue3 所拥有的组合式 API
- 选项式 API —— vue2 所拥有的选项式 API
- 内置内容 —— 指令、组件、特殊元素和特殊属性
- 单文件组件 —— 语法定义、
- 进阶 API —— 渲染函数、服务端渲染、TS 工具类型和自定义渲染

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a558d668bdb4098b5906856113fa41a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

下面将依据上面提到的六大点内容，来进行相应的剖析和讲解。

## 二、🎨全局 API

vue3 的全局 API 包含两个部分：应用实例和通用 API。那它们各自都有哪些内容呢？

### 1、应用实例

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48d3faec9e3e4347bab736c6a56ad4c1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 2、通用 API

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22e0ba81bdb0419ab7db3683e96c677e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

## 三、🚲组合式 API

谈到 `vue3` ，相信大家最为熟悉的就是 `composition API` 了，也就是 `组合式 API` 。那么，`vue3` 的

`组合式 API` 都给我们带来了什么呢？

### 1、setup

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c40e772cbf184b75bf6e6a869f317c03~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 2、响应式：核心

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14078b9e9ca14b5caf2ed92692bc40a2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 3、响应式：工具函数

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1b1da9b608e449ca8f21038fd761e59~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 4、响应式：进阶

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5f1183e88624bc69a930897b47ee2ae~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 5、生命周期钩子

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d78d13c852c4a6eab6a44a6601015c9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 6、依赖注入

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b40f6eedb6f4046af0645c5564c09e0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

## 四、🌠选项式 API

`选项式API` 即 `options API` 。可能有的小伙伴会觉得它在 `vue2` 项目下会更为常见一些。但在 `vue3` 项

目中，也是有一些 `选项式API` 值得我们去挖掘的。那都有哪些内容呢，我们来一探究竟。

### 1、状态选项

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7209eb996134846a80afdccdc1cf88a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 2、渲染选项

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1af1316b37249dbba7add34476ba36b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 3、生命周期选项

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4cdbd423f5441a88535af4c9c48d45a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 4、组合选项

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b0ff576506d49dbb9a37ef0e99aba2e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 5、其他杂项

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b2246ebc65344cb93f1f1d4ef024a10~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 6、组件实例

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/037d0d3a71ea4129a64dd6c8aea93abd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

## 五、🏕内置内容

`vue3` 的内置内容包括**指令**、**组件**、**特殊元素 element** 和**特殊属性 attributes**。如果要谈在

什么场景下会用到内置内容，那周一可能觉得，在一般的 `vue` 项目开发中，基本都会用到**内置内容**。较为

常见的是用 v-if 和 v-else-if 来判断什么时候显示某个组件，什么时候不显示某个组件。

还有像 `v-model` 、`v-on` 和 `v-for` 等指令，都是在 `vue` 项目中非常高频率使用的指令。那 `vue3` 的内

置内容都还有哪些东西呢？请看下方介绍。

### 1、指令

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/434b8e6051904290a8d878becfa183cf~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 2、组件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3d10419800648108118383899dd6a58~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 3、特殊元素

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e30e4b2adbbd43508cb50d2c5b194394~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 4、特殊属性 Attributes

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3064e1d58d8421cb4d15026bdcea024~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

## 六、📸单文件组件

对于 `vue` 来说，相信大家都会非常熟悉它的组件化思想，似乎有一种理念是：万物皆可组件。那对于一个组件

来说，我们都需要了解它的什么内容呢？比如，我们写的 `<template>` 是什么，用 `<script setup>` 和

`<script lang="ts">` 都分别是什么含义，`<style>` 用了 `scoped` 是什么意思，`:slotted` 插槽选择器又在

什么情况下使用呢？我们一起来一探究竟。

### 1、SFC 语法定义

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ba637efb1d0432b9bfaf9156f2a5d67~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 2、单文件组件 script setup

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24cd675bd15f462bbf1bdea7a2fa38df~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 3、css 功能

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb956ae4b93a433ca01be19cbc47480b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

## 七、📈进阶 API

上面我们了解了 `vue3` 的基础 API，准确来说，上面的 `API` 可以解决实际工作中 `80%` 的问题。那下面，我

们就再来看一些较为进阶的 `api` 操作。下面所涉及到的这些 `API` ，更多的是可以在**某些定制化的场

景**下，做一些高阶的操作。比如：我们可以在一个 `headless` 组件里，用 `render` 和 `h()` 函数，来渲染

自定义的页面。那 `进阶 API` 都还有哪些东西呢，来看下面的内容。

### 1、渲染函数

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ede9874e71314de5abaa8694e928b237~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 2、服务端渲染

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ca5312a130b41239b47e73c4da823bb~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 3、TypeScript 工具类型

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/814883d4d24e44c99d1d12cac9932f81~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 4、自定义渲染

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68153183f580470aafbb0697f640ac6c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

## 八、🛒结束语

到这里，我们也就讲完了 `vue3 API` 所有的知识点。个人认为，原理知识的学习，是为了更好的将其运用到项目

中。所以在学完以上内容后，不妨可以进一步将其运用到项目里，总结出工作中的最佳实践。

文章根据周一的理解做了一些输出，有观点不当之处欢迎交流~

## 🐣彩蛋 One More Thing

思维导图 `github` 地

址：[github.com/mondaylab/v…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmondaylab%2Fvue3-api "https://github.com/mondaylab/vue3-api")

`vue3` 入门指南文章推

荐：[焕然一新的 Vue 3 中文文档要来了🎉](https://juejin.cn/post/7077701166397653028 "https://juejin.cn/post/7077701166397653028")

以上就是本文的全部内容，我们下期见！🍻🍻🍻
