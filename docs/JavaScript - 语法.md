---
title: JavaScript - 语法
uid: 20240123112806870
aliases: []
categories: 
tags:
  - 编程语言
  - 语法
  - JavaScript
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:32
updateTime: 2024-09-05 08:45:14
---

## 区分大小写

ECMAScript 中一切都区分大小写。无论是变量、函数名还是操作符，都区分大小写。换句话说，变量 test 和变

量 Test 是两个不同的变量。类似地，typeof 不能作为函数名，因为它是一个关键字。但 Typeof 是一个完全有

效的函数名。

## 标识符

标识符就是变量、函数、属性、或者函数参数的名称

- 必须已字母、下划线 `_` 或者美元符号 `$` 开头
- 剩下的其它字符可以是字母、下划线、美元符号或者数字

## 注释

```javascript
// 这是单行注释
/** 这是多行
注释 */
```

## 严格模式

- 文件

```javascript
"use strict"
```

- 函数

```javascript
function doSomething() {
  "use strict"
  // 函数体
}
```

## 语句

- ECMAScript 中以分号结尾，省略分号解析器会自动纠正语法错误，添加上分号。
- 如果对 ECMAScript 熟悉一定程度后可以只在必要的地方添加分号

```javascript
let sum = a + b // 不推荐
let diff = a - b // 推荐
```

- 代码块 `{语句}`

```javascript
if (test) {
  test = false
  console.log(test)
}
```

- `if` 之类的控制语句只在执行多条语句必须要去有代码块

```javascript
if (test) return // 有效合理使用
if (test) {
  // 推荐
  console.log(test)
}
```
