---
title: TypeScript - 接口和抽象类
uid: 20240123112807372
aliases: []
categories: []
tags:
  - 编程语言
  - 编程语言/TypeScript
  - 抽象类
  - 计算机/技术
  - 接口
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:32
updateTime: 2024-09-12 08:13:22
---

## 接口和抽象类的区别

- 接口是对行为的抽象，抽象类是对具体事物的抽象
- 接口只能约束类的公有成员，抽象类可以约束公有、私有、受保护成员
- 接口不能包含具体的实现，抽象类可以包含具体的实现
- 接口可以多继承，抽象类只能单继承
- 接口可以被类实现，抽象类可以被子类继承
- 接口不能有构造函数，抽象类可以有构造函数

## 接口

### 接口的定义

```ts
interface Person {
  name: string
  age: number
}
```

### 接口的继承

```ts
interface Person {
  name: string
  age: number
}

interface Student extends Person {
  school: string
}
```

### 接口的实现

```ts
interface Person {
  name: string
  age: number
}

class Student implements Person {
  name: string
  age: number
  school: string
}
```

## 抽象类

### 抽象类的定义

```ts
abstract class Person {
  name: string
  age: number
  abstract say(): void
}
```

### 抽象类的继承

```ts
abstract class Person {
  name: string
  age: number
  abstract say(): void
}

class Student extends Person {
  school: string
  say() {
    console.log("say")
  }
}
```

### 抽象类的实现

```ts
abstract class Person {
  name: string
  age: number
  abstract say(): void
}

class Student implements Person {
  name: string
  age: number
  school: string
  say() {
    console.log("say")
  }
}
```

### 抽象类的构造函数

```ts
abstract class Person {
  name: string
  age: number
  abstract say(): void
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

class Student extends Person {
  school: string
  say() {
    console.log("say")
  }
}
```

### 参考

- [接口vs抽象类](https://www.bilibili.com/video/BV1Xv411T7DA/?spm_id_from=333.788.recommend_more_video.0&vd_source=ba86147e5f227bf668c6edb61e35dcf4)
