---
title: 前端 - APP 混合开发
uid: 20240123112806890
aliases: []
categories: []
tags:
  - 计算机/跨平台
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:19
---

## 编程方式

- 原生
- uniapp
- taro
- flutter
- webview
- react native
- WebAssembly
- 小程序

### 方案

### Uniapp 混编方案

- uniapp + flutter 实现混合

  [使用插件实现 flutter 的混合](https://ext.dcloud.net.cn/plugin?id=4302#detail),一套代码支持多端

混合 flutter 开发,将 flutter 打包成插件诺快,主要解决 uniapp 无法实现的需求，同时原生开发能力有限的情

况，使用 fluteer 以更低的学习成本，和开发成本开发插件，同时获得 fluterr 的生态环境，当然如果连

fluterr 也解决不了的问题，还是需要写原生

- uniapp + 原生插件实现混合

  插件开发需要原生开发能力，多端需要同时维护两套代码

  已 uniapp 为主程序，原生插件实现需要高性能，高复杂的需求

- 原生程序 + uni 小程序 SDK

  以原生开发为主程序，unisdk 快速开发需求，减少开发成本

> 后两个混合开发方式同时支持混合 flutter，可以使用原生程序作为 uniapp 和 flutter 的通信桥

## 注意

- 此插件已经不维护了，目前也没有开源，只留下了一个空项目
- 目前我觉的可以研究 react native 和 flutter 的通信方案，看是否能得出 uniapp 的通信方案
