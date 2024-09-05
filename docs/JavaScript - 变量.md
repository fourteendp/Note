---
title: JavaScript - 变量
uid: 20240123112806880
aliases: []
categories:
  - 编程语言/JavaScript
tags: []
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:32
updateTime: 2024-09-05 08:49:14
---

## 简介

JavaScript 变量可以保存任意类型的数据，有三个关键字可以声明变量：var、const 和 let，var 所有版

本，const 和 let 再 ES6 中添加

## Var 声明

### 用法

```javascript
var message // 定义一个未赋值的变量
message = "hi" // 给message变量赋值"hi"此时变量是字符类型
message = 100 // 此时赋值一个参数类型为数字类型的给message，此时变量数字类型，合法但不推荐
```

### 声明作用域

使用 var 操作符定义的变量会成为包含它的函数的局部变量。

函数变量在函数执行完成后立即销毁

```javascript
function test() {
  var message = "hi" // 函数变量
}
test()
console.log(message) // 报错
```

函数变量内定义变量省略 var 操作符，可以直接创建一个全局变量

```javascript
function test() {
  message = "hi" // 全是变量
}
test()
console.log(message) // "hi"
```

函数内部使用外部变量推荐先在外部先声明

```javascript
var message // 先声明
function test() {
  message = "hi" // 后赋值
}
```

同时定义多个变量，用逗号隔开每个变量

```javascript
var test1 = 1,
  test2 = 2,
  test3 = 3
```

### 声明的提升

声明的变量会自动提升到函数作用域顶部：

```javascript
function foo() {
  console.log(age)
  var age = 26
}
foo() // undefined
```

等价于

```javaScript
function foo(){
  var age
  console.log(age)
  age = 26
}
foo() // undefined
```

所谓的提升就是把所有的变量声明都拉到函数作用域的顶部，反复多次声明同一个也没问题

```javascript
function foo() {
  var age = 16
  var age = 26
  var age = 36
  console.log(age)
}
foo() // 36
```

## Let 声明

### 用法

Let 跟 var 的作用差不多，区别在于 let 声明的范围是块级作用域，var 的范围声明的是函数作用域

```javascript
if (true)
  var name ='Matt';
  console.log(name);
}//Matt
console.log(name); //Matt
if (true){
  let age 26;
  console.log (age); //26
}
console.log(age); //ReferenceError:age有定义 只能作用于块级域
```

Let 也不允许同一个块作用域中出现冗余声明。这样会导致报错：

```javascript
var name
var name
let age
let age //SyntaxError;标识符age己经声明过了
```

对声明冗余报错不会因混用 let 和 var 而受影响。这两个关键字声明的并不是不同类型的变量，它们只是指出变

量在相关作用域如何存在

```javascript
var name
let name // SyntaxError
```

### 暂时性死区

let 声明的变量不会再作用域中被提升

```javascript
// name 被提升
console.log(name) // undefined
var name = "Matt"
// age 不会被提升
console.log(age) // ReferenceError:age没有被定义
let age = 26
```

JavaScript 引擎也会注意在块后面的 let 声明，只不过在此之前不能以任何形式来引用 let 声明的变量，let

声明之前的执行瞬间被称为**暂时死区**，在此阶段引用任何后面的声明的变量都会抛出 ReferenceErro

### 全局声明

Var 会挂载到 window 对象属性上，let 不会

```javascript
var name = "Matt"
console.log(window.name) // "Matt"
let age = 26
console.log(window.age) // undefined
```

Let 声明仍然是在全局作用域中发生的，相应变量会在页面的生命周期内存续。因此，为了避免 SyntaxError，必

须确保作用域不会重复声明同一个变量

### 条件声明

在 if 语句中使用 let 声明的变量，只在 if 语句块中有效

```javascript
  if (true) {
  let test = true
}


console.log(test) // ReferenceError:test没有定义
```
