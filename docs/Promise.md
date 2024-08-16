---
title: Promise
uid: 20240123112807004
aliases: []
categories: []
tags:
  - 计算机/技术
  - 计算机/前端/JavaScript
  - 编程语言
  - 编程语言/JavaScript/内置对象
  - 编程语言/Promise
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:32
updateTime: 2024-08-02 13:59:53
---

## Promise 的状态

Promise 的状态只能从 `pending` 变为 `fulfilled` 或 `rejected`，且状态一旦改变就不会再变。

## Promise 的三种状态

- `pending`：初始状态，既不是成功，也不是失败状态。
- `fulfilled`：操作成功完成。
- `rejected`：操作失败。

## Promise 方法

- `Promise.race(iterable)`：方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的
  promise 就会解决或拒绝。
- `Promise.all(iterable)`：方法返回一个 promise，只有当迭代器中的所有 promise 都解决时，返回的
  promise 才会解决。
- `Promise.allSettled(iterable)`：方法返回一个在所有给定的 promise 都已被解决或拒绝后被解决的
  promise，并带有一个对象数组，每个对象表示对应的 promise 结果。
- `Promise.any(iterable)`：所有 promise 都拒绝或参数为空时，返回的 promise 将被拒绝；如果参数中的任
  何一个 promise 被解决，则返回的 promise 将被解决。

## 如何中断 Promise

- `Promise.race`：可以用来中断 Promise，只要有一个 Promise 被解决或拒绝，就会中断其他 Promise。
- 当 Promise 链中的某个 Promise 被拒绝时，后续的 Promise 都会被拒绝，这时可以使用 `catch` 方法捕获错
  误。
