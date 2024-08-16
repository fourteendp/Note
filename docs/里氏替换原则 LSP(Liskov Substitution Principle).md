---
title: 里氏替换原则 LSP(Liskov Substitution Principle)
uid: 20240123112807530
aliases: []
categories: []
tags:
  - 计算机/设计模式/基本原则/五大原则SOLID
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:18
---

- 定义：所有引用基类的地方必须能透明地使用其子类的对象
- 解释：子类必须完全实现父类的方法，而且子类可以有自己的个性化方法
- 优点：可以在运行时判断任意一个实例对象是否是某个类的实例
- 缺点：增加了代码的复杂度
- 适用场景：只有当子类可以替换掉所有父类的出现的地方，父类才能真正被复用，而且子类还能增加父类的新功
  能
