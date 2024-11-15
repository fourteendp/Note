---
title: 设计模式 - 抽象工厂模式 (Abstract Factory)
uid: 20240123112807370
aliases: []
categories: []
tags:
  - 计算机/设计模式/GoF设计模式/创建型模式
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:14
---

- 定义：提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类
- 解释：抽象工厂模式是一种类创建型模式，它提供了一个创建产品族的接口，其每个子类可以生产一系列相关的
  产品
- 优点：隔离了具体类的生成，使得客户端不需要知道什么被创建；将一个系列的产品族统一到一起创建；增加新
  的产品族很方便，无须修改已有系统，符合开闭原则
- 缺点：规定了所有可能被创建的产品集合，产品族中扩展新的产品困难，需要修改抽象工厂的接口
- 适用场景：系统中有多于一个的产品族，而系统只消费其中某一产品族；系统要求提供一个产品类的库，所有产
  品以同样的接口出现，从而使客户端不依赖于具体实现
- 模式结构：
  - 抽象工厂（Abstract Factory）：担任这个角色的是工厂方法模式的核心，任何在模式中创建对象的工厂类必
    须实现这个接口
  - 具体工厂（Concrete Factory）：这个角色含有与业务密切相关的逻辑，并且受到抽象工厂角色的约束。在具
    体工厂中提供了工厂方法，用于返回一个产品。它可以是具体的，也可以是抽象的，也可以是另一个工厂的实
    例
  - 抽象产品（Product）：工厂方法模式所创建的对象的超类型，也就是产品对象的共同父类或共同拥有的接口
  - 具体产品（Concrete Product）：这个角色实现了抽象产品角色所定义的接口
  - 客户端（Client）：客户端无须知道产品的具体类，只需要知道具体工厂的类名即可

## 代码示例

```preview
path: /代码/抽象工厂模式(Abstract Factory).ts
```
