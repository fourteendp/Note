---
title: Vue3 - 花了一天的时间，地板式扫盲了 vue3 所有 API 盲点
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
updateTime: 2024-09-12 08:13:21
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

![[assets/bb85cc6362c76d12d7ebaa6edb31e591_MD5.webp]]

下面将依据上面提到的六大点内容，来进行相应的剖析和讲解。

## 二、🎨全局 API

vue3 的全局 API 包含两个部分：应用实例和通用 API。那它们各自都有哪些内容呢？

### 1、应用实例

![[assets/2f4c905f78717aa9eaf4e8ed89b0f892_MD5.webp]]

### 2、通用 API

![[assets/0722d1d317dd5d059159eb73edba81b6_MD5.webp]]

## 三、🚲组合式 API

谈到 `vue3` ，相信大家最为熟悉的就是 `composition API` 了，也就是 `组合式 API` 。那么，`vue3` 的

`组合式 API` 都给我们带来了什么呢？

### 1、setup

![[assets/add55e468b1518fc6f9b3dddded44cde_MD5.webp]]

### 2、响应式：核心

![[assets/2c3e1964dfb573ffbff0e019afff18b7_MD5.webp]]

### 3、响应式：工具函数

![[assets/501a41f9adcc16ade9d5e71c524825b8_MD5.webp]]

### 4、响应式：进阶

![[assets/6a284880defe4695d327341e42a71ae4_MD5.webp]]

### 5、生命周期钩子

![[assets/8613d99fed290cdfd230c2b797f3013d_MD5.webp]]

### 6、依赖注入

![[assets/d7543e00d60eb5dec01cab6242157fdf_MD5.webp]]

## 四、🌠选项式 API

`选项式API` 即 `options API` 。可能有的小伙伴会觉得它在 `vue2` 项目下会更为常见一些。但在 `vue3` 项

目中，也是有一些 `选项式API` 值得我们去挖掘的。那都有哪些内容呢，我们来一探究竟。

### 1、状态选项

![[assets/36bdaca2d4255cb475e1810f6f2a76d0_MD5.webp]]

### 2、渲染选项

![[assets/9016a75f6a19b05121ae2f4829bced21_MD5.webp]]

### 3、生命周期选项

![[assets/44270dad4094808fca99e7b609acc471_MD5.webp]]

### 4、组合选项

![[assets/c244586bca3984a8a1125cdfe1d293bb_MD5.webp]]

### 5、其他杂项

![[assets/959d836a03cca697df72b64dcacca754_MD5.webp]]

### 6、组件实例

![[assets/fdcdc6b6fc6f3b592423837b06a25bfa_MD5.webp]]

## 五、🏕内置内容

`vue3` 的内置内容包括**指令**、**组件**、**特殊元素 element** 和**特殊属性 attributes**。如果要谈在

什么场景下会用到内置内容，那周一可能觉得，在一般的 `vue` 项目开发中，基本都会用到**内置内容**。较为

常见的是用 v-if 和 v-else-if 来判断什么时候显示某个组件，什么时候不显示某个组件。

还有像 `v-model` 、`v-on` 和 `v-for` 等指令，都是在 `vue` 项目中非常高频率使用的指令。那 `vue3` 的内

置内容都还有哪些东西呢？请看下方介绍。

### 1、指令

![[assets/2688115ecce9ca19cf23fbca0553dbd0_MD5.webp]]

### 2、组件

![[assets/1e4331fcc01a2166ed090d43e63cedf5_MD5.webp]]

### 3、特殊元素

![[assets/6f364a73508c19b09d91ce99d595ff65_MD5.webp]]

### 4、特殊属性 Attributes

![[assets/ad0db59f7bccea9f4f628c493989ed37_MD5.webp]]

## 六、📸单文件组件

对于 `vue` 来说，相信大家都会非常熟悉它的组件化思想，似乎有一种理念是：万物皆可组件。那对于一个组件

来说，我们都需要了解它的什么内容呢？比如，我们写的 `<template>` 是什么，用 `<script setup>` 和

`<script lang="ts">` 都分别是什么含义，`<style>` 用了 `scoped` 是什么意思，`:slotted` 插槽选择器又在

什么情况下使用呢？我们一起来一探究竟。

### 1、SFC 语法定义

![[assets/cb358dc280876cf96109ced50a6fcc3d_MD5.webp]]

### 2、单文件组件 script setup

![[assets/5f55445c2067ede2cc11a0fb6569359a_MD5.webp]]

### 3、css 功能

![[assets/ffc595e519a133a6f2a1885f36d6ac6e_MD5.webp]]

## 七、📈进阶 API

上面我们了解了 `vue3` 的基础 API，准确来说，上面的 `API` 可以解决实际工作中 `80%` 的问题。那下面，我

们就再来看一些较为进阶的 `api` 操作。下面所涉及到的这些 `API` ，更多的是可以在**某些定制化的场

景**下，做一些高阶的操作。比如：我们可以在一个 `headless` 组件里，用 `render` 和 `h()` 函数，来渲染

自定义的页面。那 `进阶 API` 都还有哪些东西呢，来看下面的内容。

### 1、渲染函数

![[assets/568777ff0825dd568cd0d1cb683cdb79_MD5.webp]]

### 2、服务端渲染

![[assets/a14eaee4ea7518b1e83cb385f9806f4f_MD5.webp]]

### 3、TypeScript 工具类型

![[assets/aa897ce6efbc320c32d1da68d7a35798_MD5.webp]]

### 4、自定义渲染

![[assets/1a72c88c256cd3139f38c93953982f62_MD5.webp]]

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
