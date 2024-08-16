---
title: 开闭原则 OCP(Open Close Principle)
uid: 20240123112807364
aliases: []
categories: []
tags:
  - 计算机/设计模式/基本原则/五大原则SOLID
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:21
---

- 定义：一个软件实体如类、模块和函数应该对扩展开放，对修改关闭
- 解释：一个软件实体应该通过扩展来实现变化，而不是通过修改已有的代码来实现变化
- 优点：可以提高代码的可读性和可维护性，降低变更引起的风险
- 缺点：增加了系统的复杂度和理解难度
- 适用场景：在系统中尽量使用面向接口编程，而不是面向实现编程
