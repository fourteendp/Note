---
title: Lambda 表达式
uid: 20240123112806930
aliases: []
categories: []
tags:
  - 计算机/技术
  - 编程语言
  - Lambda
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:54
---

## 什么是 Lambda 表达式

Lambda 是一种匿名函数，可以用来创建一些简单的函数，但是这些函数的功能非常强大。

## 为什么要使用 Lambda 表达式

Lambda 表达式可以简化代码，让代码更加简洁，更加易读。

## Lambda 表达式的语法

Lambda 表达式的语法格式如下：

```C#
(parameters) => expression
```

## Lambda 和匿名方法的区别

Lambda 表达式和匿名方法的区别如下：

| 匿名方法                                 | Lambda 表达式                             |
| ---------------------------------------- | ----------------------------------------- |
| 匿名方法是一个完整的方法，可以有多条语句 | Lambda 表达式是一个表达式，只能有一条语句 |
| 匿名方法可以有多个参数                   | Lambda 表达式只能有一个参数               |
| 匿名方法可以有返回值                     | Lambda 表达式只能有一个返回值             |
| 匿名方法可以有访问修饰符                 | Lambda 表达式只能有访问修饰符             |

## Lambda 表达式的使用

Lambda 表达式的使用如下：

```C#
// Lambda表达式
Func<int, int> func = x => x * x;
Console.WriteLine(func(5)); // 25

// 匿名方法
Func<int, int> func = delegate (int x) { return x * x; };
Console.WriteLine(func(5)); // 25
```

## 参考

- [Lambda 表达式（C# 引用）](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/lambda-expressions)
