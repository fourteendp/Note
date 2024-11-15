---
title: 设计模式 - 适配器模式 (Adapter)
uid: 20240123112807530
aliases: []
categories: []
tags:
  - 计算机/设计模式/GoF设计模式/结构型模式
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:14
---

- 定义：将一个类的接口转换成客户希望的另外一个接口，适配器模式使得原本由于接口不兼容而不能一起工作的
  那些类可以一起工作
- 解释：适配器模式是一种结构型设计模式，它能将对象的接口转换成不同的接口，让原本接口不兼容的对象可以
  一起工作
- 优点：可以让任何两个没有关联的类一起运行；提高了类的复用；增加了类的透明度；灵活性好
- 缺点：过多使用适配器，会让系统非常零乱，不易整体进行把握；由于 JAVA 至多继承一个类，所以至多只能适
  配一个适配者类，而且目标类必须是抽象类
- 适用场景：系统需要使用现有的类，而此类的接口不符合系统的需要；想创建一个可以复用的类，该类可以与其
  他不相关的类或不可预见的类协同工作；（对象适配器）需要适配的是一个类，但是适配者类不是抽象类，而是
  一个具体类，而且不可能改变它的代码
- 模式结构：
  - 目标（Target）接口：当前系统业务所期待的接口，它可以是抽象类或接口
  - 适配者（Adapted）类：需要适配的类
  - 适配器（Adapter）类：通过包装一个适配者对象，把原接口转换成目标接口
  - 客户（Client）类：客户端通过适配器发起请求
