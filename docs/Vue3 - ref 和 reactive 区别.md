---
title: Vue3 - ref 和 reactive 区别
uid: 20240123112806864
aliases: []
categories:
  - 前端/Vue3
tags:
  - 框架
  - 前端
  - Vue3
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:43:24
---

## 区别

- ref 适合声明基本类型的响应式数据，reactive 适合声明复杂的对象类型的响应式数据
- reactive 返回的是一个代理对象，ref 返回的是一个对象，对象中有一个 value 属性，value 属性才是真正的
  响应式数据
- reactive
  - 适合声明复杂的对象类型的响应式数据
  - 返回的是一个代理对象
  - 不能直接对对象的属性进行解构赋值
  - 深层次的属性也是响应式的
- ref
  - 适合声明基本类型的响应式数据
  - 返回的是一个对象，对象中有一个 value 属性，value 属性才是真正的响应式数据
  - 可以直接对对象的属性进行解构赋值
  - 浅层次的属性是响应式的，深层次的属性不是响应式的
  - 如果传入的是一个对象，本质是调用 reactive，`.value` 返回的是一个代理对象

## 参考

- [深入源码彻底搞清vue3中reactive和ref的区别](https://juejin.cn/post/7134631293941186567#heading-7)
- [Vue3 官方文档](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html)
