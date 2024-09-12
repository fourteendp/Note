---
title: WSL - 修改默认安装目录到其他盘
uid: 20240123112807156
aliases: []
categories: []
tags:
  - 计算机/Linux/WSL
  - 默认安装目录
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:20
---

## 导出

```shell
wsl --export Debian d:\wsl-debian.tar
```

## 注销

```shell
wsl --unregister Deabin
```

## 导入

```shell
wsl --import Debian d:\Debian d:\wsl-debian.tar --version 2
```
