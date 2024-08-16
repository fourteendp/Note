---
title: Vue - Keep-alive 实现原理
uid: 20240123112807096
aliases:
categories: []
tags:
  - 计算机/前端/源码
  - 计算机/前端/JavaScript
  - 计算机/前端/Vue
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-12 15:23:40
---

Vue 的 `<keep-alive>` 组件是一个内置的抽象组件，它被用来缓存不活动的组件实例，避免它们被销毁，从而提高应用的性能。它主要应用于动态组件和与 Vue Router 配合使用的场景中，以保留用户操作状态或避免重复渲染组件。

`<keep-alive>` 组件通过几个 props 来控制其行为：

- `include`：定义一个白名单，只有匹配的组件会被缓存。
- `exclude`：定义一个黑名单，匹配的组件不会被缓存。
- `max`：定义缓存的组件数量上限，超出这个数量后，最久未使用的组件将被移除，采用 LRU（Least Recently Used）缓存策略。

在 Vue 3 中，`<keep-alive>` 的实现原理涉及到组件的渲染、缓存处理、props 参数的处理以及组件卸载过程。它使用 `Map` 对象来缓存组件的 VNode，并使用 `Set` 对象来记录所有缓存的 key。当组件被缓存时，如果缓存数量超过 `max` 属性定义的数量，就会执行 [[LRU（Least Recently Used，最近最少使用）]] 策略，移除最久未使用的缓存。

`<keep-alive>` 组件的生命周期钩子函数在它的实现中扮演了重要角色。在 `created` 钩子中初始化缓存和 key 集合，在 `destroyed` 钩子中清理缓存。`mounted` 钩子则用于监听 `include` 和 `exclude` 的变化，并实时更新缓存。

在 Vue 的渲染过程中，`<keep-alive>` 的渲染是在 patch 阶段进行的。在这个阶段，会检查当前组件是否符合缓存条件，如果符合，就从缓存中获取组件实例并进行渲染；如果不符合，就正常创建和挂载组件。此外，`<keep-alive>` 组件还涉及到一些特殊的钩子函数，例如 `init`、`prepatch` 和 `insert`，这些钩子函数在组件的初始化、更新和插入过程中被调用。

值得注意的是，`<keep-alive>` 本身是一个抽象组件，它不会渲染为 DOM 元素，也不会出现在组件的父级链中。这是因为它在定义时设置了 `abstract: true`，Vue 在处理时会忽略这个组件，直接对其子组件进行操作。

总的来说，`<keep-alive>` 组件通过智能缓存和条件渲染，帮助开发者优化 Vue 应用的性能，尤其是在处理复杂的动态组件时。
