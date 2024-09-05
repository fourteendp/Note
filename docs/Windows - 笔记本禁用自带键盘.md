---
title: Windows - 笔记本禁用自带键盘
uid: 20240123112807450
aliases: []
categories:
  - 系统/Windows
tags: []
archive: false
draft: false
todo: false
createTime: 2023-12-10 20:54:28
updateTime: 2024-09-05 08:54:01
---

```shell
# 禁用
sc config i8042prt start= disabled
# 开启
sc config i8042prt start= auto
```
