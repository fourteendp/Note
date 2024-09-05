---
title: Headless UI 无头 UI 组件
uid: 1725439585465
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-09-04 16:46:25
updateTime: 2024-09-04 16:47:44
---

## Headless UI

在 2017 年，一个在基于 React 的 **高阶函数（HOC）** 以及 **复合组件（Compound Components）** 研发的 [downshift](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdownshift-js%2Fdownshift "https://github.com/downshift-js/downshift") 诞生了，它的诞生无疑间接的促使了 `Headless UI` 的来临；

![[assets/c8806246c3b62fed3ed887aff024b5ce_MD5.webp]]

___

在 2018 年 6 月 22 日一篇受到 [downshift](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdownshift-js%2Fdownshift "https://github.com/downshift-js/downshift") 启发介绍 [Headless User Interface Components](https://link.juejin.cn/?target=https%3A%2F%2Fwww.merrickchristensen.com%2Farticles%2Fheadless-user-interface-components%2F "https://www.merrickchristensen.com/articles/headless-user-interface-components/") 的文章应运而生，只是那时候的评判大多褒贬不一，有赞同博主的，也有质疑博主的；由此 `Headless UI` 一词正式被大家所认知

![[assets/824c122cd79c0f4596c122b84cc59a90_MD5.webp]]

___

后来在 2018 年 10 月 26 日改变现有 React 和 Vue 格局的 《[React Conf 2018](https://link.juejin.cn/?target=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Ddpw9EHDh2bM "https://www.youtube.com/watch?v=dpw9EHDh2bM")》大会引入了现有屌爆了的 `React Hooks` 概念之后； `Headless UI` 概念才慢慢的被大家所接受。

![[assets/4535060294e8ff69c71e184068301aef_MD5.webp]]

___

因为在大家后知后觉中，其实发现 `Headless UI` 概念其实与 `React Hooks` 概念大同小异，只是差别在了一个更多的实现**所有数据或交互的状态逻辑层**，一个实现现有**常见的 UI 库的数据或状态逻辑层**，理解不了没关系，下面再详细介绍下；

但是那时国内其实对 `Headless UI` 这一概念认知还较少，因为在国内这个内卷的时代，大家更多关心的是 `React Hooks`。

___

就这样到了 2020 年，在国内社区有较高知名度和影响的 **Tailwind Labs 团队** 介绍的 [Introducing Headless UI](https://link.juejin.cn/?target=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLiwhObkaHKg "https://www.youtube.com/watch?v=LiwhObkaHKg") 中慢慢开始在国内社区崭露头角；

![[assets/ec71139d2467fa0e0f63ddb8bece2a64_MD5.webp]]

## 二、什么是 Headless UI

`Headless UI` 全称是 **Headless User Interface （无头用户界面）**，是一种前端开发的方法论（亦或者是一种设计模式），其核心思想是将 **用户界面（UI）的逻辑和交互行为** 与 **视觉表现（CSS 样式）** 分离开来；

换句话说，`Headless UI` 提供了一种方式来构建**只包含逻辑和功能**的用户界面组件，而不依赖于特定的 CSS 样式框架或 UI 库。

具体而言，`Headless UI` 的组件通常是纯粹的 JavaScript（或其他编程语言）组件，它们包含了一些**交互逻辑**和**状态管理**，但没有任何与视觉样式相关的代码。

## 三、为什么需要 Headless UI？

众所周知，在传统的 UI 组件中，通常被拆分为两大部分：

- **外观样式**（传统组件 UI 展示层）
- **逻辑部分**（Headless UI 部分）

外观样式负责展示**元素标签与样式**，而逻辑组件部分则负责处理**数据逻辑、状态管理和用户交互**等功能。

我们看图说话

## 传统 UI 组件框架

传统 UI 组件包含部分：

![[assets/794bc676e51214c531e0a0a62be4361c_MD5.webp]]

### 优势

我相信在座的各位同学，都有用过现成的一些 UI 组件库，例如：`Bootstrap` 、`Material UI`、`Ant Design`、`element-ui` 等等，在其中，我们能看的出来，传统 UI 组件的优势主要有：

- **开箱即用：** 字面意思，直接 install 就可以用了；
- **易学易用：** 文档嘛，一看就懂，一用就废；
- **功能性全：** 根据这么些年的发展，这些个开源组件库，几乎能遇到的 bug 都给整治了；
- **部分响应式：** 这不 Bootstrap 就是一个很好的例子吗

### 限制

那么用过的同学肯定也知道现成 UI 组件库的一些痛点，比如：

- **样式难以定制：** 正所谓一个萝卜一个坑，一个公司一套样式，一个项目一套样式，那么这时候的劣势就无限被放大了；
- **耦合性高：** 传统 UI 组件库通常将界面样式、数据逻辑和用户交互等功能耦合在一起，导致代码难以维护和扩展；
- **创意受限：** 公司设计师根据现有传统 UI 组件库提供的一套固定组件和样式，他们想要拓展创意，都收到了很大的影响；
- **依赖过多：** 一些传统 UI 组件库可能依赖于大量的第三方库和插件，增加了项目的复杂性和维护成本；

## 研发中实际场景的重现

**1、需求第一期：**

参与人员：前端 A、后端 A、设计师 A、产品 A

其中有一个功能要实现一个日期选择组件，下图是第一期的实现

![[assets/1906316cc34aa760b48ca43e6540d60d_MD5.webp]]

你噼里啪啦一顿操作的实现了

那么现在需求迭代了

**2、需求第二期：**

参与人员：前端 A、后端 A、设计师 B、产品 B

这时候问题就来了，设计师 B 想把这个日期选择的样式改一下，改成如下：

![[assets/ea93ff793cf301b6af63b4fecfd7c293_MD5.webp]]

那么此时阁下又该如何去面对呢？

- 魔改 ？？
- :deep 强制改 ？？
- !important ？？
- 重写自定义 ？？
- 和设计师沟通 ？？
- 沟通不过来打一顿 ？？
- 不解气，这破工谁爱打谁打

那么我们此时不妨换一种思路，试试用 `Headless UI` 解决看看？？

## Headless UI 的解决方案

根据上述咱们已经知道了，普通的 `Headless UI` 组件包含：**数据逻辑、状态逻辑、用户交互**等等

![[assets/6081d4d10a1cfcf6df8e9b27ec85e1de_MD5.webp]]

> 其实 Headless UI 的一些拓展还可以包括 `浏览器兼容性` 和 `无障碍访问` 等功能

**用传统 UI 组件库实现一个 date 组件代码：**

```ts
<template> <date> 切换 </date> // do something 此处省略 500 行 </template> <script> // do something 此处省略 500 行 </script> <style> // do something 此处省略 500 行 </style>
```

能看到**组件的逻辑**与**标签和样式**都是高度耦合在一起的，很不利于拓展

**我们看下 Headless UI 实现的组件，截取部分：**

![[assets/672951a9484994e13199a157c6242b00_MD5.webp]]

能看到 `Headless UI` 实现的组件简便了很多，完全没有所谓的 `样式集成` 在里面了，你想怎么改就怎么改；

> 说白了，就是 `Headless UI` 的出现就是为了解决传统 UI 组件框架的缺点，你不是要定制样式吗，现在我 ™ 连样式都不给你，全部由你自己来实现，爱咋滴咋滴，想怎么折腾就怎么折腾，无论多离谱的定制化都能实现。

## 四、Headless UI 的优势和特点

![[assets/33e55bc1bca77c6a7243d5584299e101_MD5.webp]]

- **灵活性高：** 因为 Headless UI 将组件的逻辑和样式分离，咱们可以根据项目的需要，想怎么玩就怎么玩，你说呢？
- **可定制：** 样式都没了，我这不是想咋定制就定制了吗，你别说两个设计师，1 V 10 都不成问题，还担心啥呢？
- **轻量级：** 只有逻辑了，那可不少了一大堆代码了；
- **测试友好：** 写过单元测试的同学应该都知道，有样式组件和没样式组件的单元测试那就是一个天一个地；
- **无需学习新的样式框架：** 我只看你的 API 不就行了，那样式有啥好关注的。

## 五、Headless UI 的应用场景

根据个人实际经验，我总结出来的一些实际应用场景：

1. **跨平台应用：** 如果你司同个项目在多个平台上共存，那么此时的样式肯定都是不大一致的，那么现在 Headless UI 就可以发挥它的作用了；
2. **定制化界面：** 如果你们项目需要高度定制样式和功能，我觉得这是一个很不错的选择；
3. **公司项目较多：** 因为一个项目会存在很多个不同样式同逻辑的组件，所以在一个公司中，业务场景较大，以及项目较多，不失为一个很好的选择；

当然 `Headless UI` 也有缺点，并不适用于所有的项目，

- 如果你项目使用简单，对设计没有较大的要求，还是用现成的 UI 库比较合适，毕竟开箱即用；
- 如果公司大家的技术水平参差不齐，还是别瞎整了，还是用现成得吧；
- 切莫为了跟风而且瞎折腾技术，从实际出发

## 总结

上述只是给大家介绍了 `Headless UI` 理论部分，也就是所谓八股文吧；

但是 `Headless UI` 的设计模式还是很值得大家去参考学习的；

下面将会有 `Headless UI` 实战等其它部分：

![[assets/69b5266db6fd30e242e708ffa7c2cbd7_MD5.webp]]
