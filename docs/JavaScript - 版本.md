---
title: JavaScript - 版本
uid: 20240123112806864
aliases: []
categories:
  - 编程语言/JavaScript
tags:
  - 版本
  - JavaScript
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:23
---

## 浏览器中的 JavaScript

![[Pasted image 20220715105230.png]]

- ECMAScript（核心）
- DOM（文档对象模型）
- BOM（浏览器对象模型）

> [!note] DOM 和 BOM 是浏览器宿主环境提供的，而不是 ECMAScript 定义的标准接口。类似地，Node 宿主环境
> 也提供了一些常规的服务端语言具备的基本 API。

## 不涉及宿主环境的 ECMA-262 定义什么

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 全局对象

## ECMA-262 的版本

- ES1
  - 网景的 JavaScript1.1 删除浏览器扩展，保留核心
- ES2
  - 编校工作，主要是为了更新之后严格符合 ISO/IEC-16262 的要求，并没有增减或改变任何特性
- ES3
  - 第一次真正对这个标准进行更新，更新了字符串处理、错误定义和数值输出。此外还增加了对正则表达式、新
    的控制语句、try/catch 异常处理的支持，以及为了更好地让标准国际化所做的少量修改
- ES4
  - 在 ES3 的基础上定义了一门新语言。包括强类型变量、新语句和数据结构、真正的类和经典的继承，以及操
    作数据的新手段。
- ES3.1
  - ES4 改动太大，ES4 被抛弃,后变成了 ES5
- ES5 2009 年 12 月 3 日
  - 解决歧义，增加了新功能。新功能包括原生的解析和序列化 JSON 数据的 JSON 对象、方便继承和高级属性定
    义的方法，以及新的增强 ECMAScript 引擎解释和执行代码能力的严格模式。第 5 版在 2011 年 6 月发布了
    一个维护性修订版，这个修订版只更正了规范中的错误，并未增加任何新的语言或库特性
- ES6 2015 年 6 月
  - 这一版包含了大概这个规范有史以来最重要的一批增强特性。ES6 正式支持了类、模块、迭代器、生成器、箭
    头函数、期约、反射、代理和众多新的数据类型
- ES7 2016 年 6 月
  - 修订只包含少量语法层面的增强，如 Array. Prototype. Includes 和指数操作符。
- ES8 2017 年 6 月
  - 增加了异步函数（async/await）、SharedArrayBuffer 及 Atomics API，以及
    Object.values()/Object.entries()/Object.getOwnPropertyDescriptors() 和字符串填充方法，另外明确支
    持对象字面量最后的逗号
- ES9 2018 年 6 月
  - 修订包括异步迭代、剩余和扩展属性、一组新的正则表达式特性、Promise finally()，以及模板字面量修
    订。
- ES10 2017 年 6 月
  - 增加了
    Array.prototype.flat()/flatMap()、String.prototype.trimStart()/trimEnd()、Object.fromEntries()
    方法，以及 Symbol.prototype.description 属性，明确定义了 Function.prototype.toString() 的返回值
    并固定了 Array.prototype.sort() 的顺序。另外，这次修订解决了与 JSON 字符串兼容的问题，并定义了
    catch 子句的可选绑定。
