---
title: Vue - DOM 更新时机
uid: 20240123112806910
aliases: []
categories: []
tags:
  - 计算机/前端/Vue
  - 原理
  - DOM更新
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:22
---

当你更改响应式状态后，DOM 会自动更新。然而，你得注意 DOM 的更新并不是同步的。相反，Vue 将缓冲它们直

到更新周期的 " 下个时机 " 以确保无论你进行了多少次状态更改，每个组件都只更新一次
