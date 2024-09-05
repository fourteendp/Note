---
title: 元组和数组的区别
uid: 20240123112807210
aliases: []
categories: []
tags:
  - 计算机/技术
  - 计算机/前端/数组
  - 编程语言
  - 编程语言/TypeScript
  - 元组
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:32
updateTime: 2024-08-02 13:59:49
---

## 元组

元组是一个固定长度的数组，它的长度是在定义时确定的。

```ts
let x: [string, number]
x = ["hello", 10] // OK
x = [10, "hello"] // Error
```

## 数组

数组是一个可变长度的数组，它的长度是在运行时确定的。

```ts
let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3]
```
