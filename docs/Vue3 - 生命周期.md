---
title: Vue3 - 生命周期
uid: 20240123112807096
aliases: []
categories: []
tags:
  - 计算机/前端/Vue
  - 计算机/前端/Vue/生命周期
  - 计算机/前端/Vue3
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:21
---

## 什么是生命周期

- Vue 实例从创建到销毁的过程, 就是生命周期
- Vue3 中没有了 beforeCreate 和 created 生命周期钩子

## Vue2 和 Vue3 生命周期的对比

| Vue2          | Vue3          | 说明           |
| ------------- | ------------- | -------------- |
| beforeCreate  | setup         | 组件实例化之前 |
| created       | setup         | 组件实例化之后 |
| beforeMount   | beforeMount   | 挂载之前       |
| mounted       | mounted       | 挂载之后       |
| beforeUpdate  | beforeUpdate  | 更新之前       |
| updated       | updated       | 更新之后       |
| beforeDestroy | beforeUnmount | 销毁之前       |
| destroyed     | unmounted     | 销毁之后       |
| errorCaptured | errorCaptured | 错误捕获       |

## 开发模式钩子

| 钩子            | 说明                 |
| --------------- | -------------------- |
| renderTracked   | 跟踪响应式数据的变化 |
| renderTriggered | 触发响应式数据的变化 |

## 页面路由钩子

| 钩子          | 说明       |
| ------------- | ---------- |
| onActivated   | 路由激活时 |
| onDeactivated | 路由失活时 |

## 服务端渲染钩子

| 钩子             | 说明           |
| ---------------- | -------------- |
| onServerPrefetch | 服务端预取数据 |

## 生命周期图示

![[Pasted image 20221215201422.png]]
