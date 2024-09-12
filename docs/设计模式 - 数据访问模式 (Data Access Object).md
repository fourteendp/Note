---
title: 设计模式 - 数据访问模式 (Data Access Object)
uid: 20240123112807430
aliases: []
categories: []
tags:
  - 计算机/设计模式/非GoF设计模式
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:14
---

- 定义：数据访问对象模式（Data Access Object Pattern）或 DAO 模式用于把低级的数据访问 API 或操作从高
  级的业务服务中分离出来。以下是数据访问对象模式的参与者。
- 解释：数据访问对象模式（Data Access Object Pattern）或 DAO 模式用于把低级的数据访问 API 或操作从高
  级的业务服务中分离出来。以下是数据访问对象模式的参与者。
- 优点：数据访问对象模式的优点在于它提供了一种统一的数据访问方式，从而使得数据访问层的代码可以被重
  用，从而降低了系统的维护成本
- 缺点：数据访问对象模式的缺点在于它可能会导致系统设计中类的数量增加
- 应用场景：数据访问对象模式通常适用于以下场景：当系统需要提供一个应用程序与多个数据库的数据源交互
  时，可以使用数据访问对象模式；当系统需要提供一个应用程序与多个数据库的数据源交互时，可以使用数据访
  问对象模式
- 模式结构：
  - 数据访问对象接口（Data Access Object Interface）：定义了在一个模型对象上要执行的标准操作
  - 数据访问对象实体类（Data Access Object concrete class）：实现了上述的接口。该类负责从数据源获取
    数据，数据源可以是数据库，也可以是 xml，或者是其他的存储机制
  - 模型对象/数值对象（Model Object/Value Object）：该对象是简单的 POJO，包含了 get/set 方法来存储通
    过使用 DAO 类检索到的数据
