---
title: Windows - 终端设置代理
uid: 20240123112807160
aliases: []
categories: []
tags:
  - 测试
  - 计算机/Windows
  - 临时代理
  - 设置代理
  - 长期生效
  - 终端
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:20
---

## 临时代理

> [!warning] 终端关闭后失效

```shell
set http_proxy = "http://127.0.0.1:10808"
set https_proxy = "http://127.0.0.1:10808"
```

## 长期生效

设置系统环境变量

![[CMD终端代理设置环境变量.png]]

## 测试

> [!warning] 不能使 ping 命令测试

```sehll
curl www.google.com
```
