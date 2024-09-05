---
title: 设计模式 -柯里化 (Currying) 与偏函数 (Partial Function)
uid: 20240123112807436
aliases: []
categories: []
tags:
  - 计算机/设计模式/非GoF设计模式
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 09:10:32
---

**函数柯里化**是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接
受余下的参数而且返回结果的新函数的技术。

**偏函数**它接受一个函数和一个参数列表，返回一个新函数，这个新函数只需要接受剩余的参数就可以了。
