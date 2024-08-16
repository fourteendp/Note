---
title: WSL 系统代理
uid: 20240123112807156
aliases: []
categories: []
tags:
  - 计算机/Linux/系统代理
  - 计算机/Linux/WSL
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:50
---

## WSL1

WSL1 的 Linux 子系统和 Windows 共享了网络端口

```sh

export ALL_PROXY="http://127.0.0.1:10808"

```
