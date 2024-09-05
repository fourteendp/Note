---
title: Dart 变量声明
uid: 1723015784091
aliases: []
categories: []
tags:
  - Dart
archive: false
draft: false
todo: false
createTime: 2024-08-07 15:29:44
updateTime: 2024-08-07 16:02:28
---

在 Flutter 中，变量声明方式与 Dart 语言的变量声明方式一致。Dart 是一种类型安全的编程语言，这意味着每个变量在声明时都需要指定其类型。

在 Dart 中，**类型声明在变量名之前**

## 基本类型声明

- 整数（`int`）:

```dart
int age = 25;
```

- 双精度浮点数（`double`）:

```dart
double price = 19.99;
```

- 布尔值（`bool`）:

```dart
bool isApproved = true;
```

## 字符串类型

- 使用单引号或双引号声明字符串（`String`）:

```dart
String name = 'John Doe';
String greeting = "Hello, world!";
```

## 列表（数组）

- 使用 `List<T>` 类型声明列表，`T` 是列表中元素的类型：

```dart
List<String> names = ['Alice', 'Bob', 'Charlie'];
```

## 映射（字典）

- 使用 `Map<K, V>` 类型声明映射，`K` 是键的类型，`V` 是值的类型：

```dart
Map<String, int> scores = {'Alice': 95, 'Bob': 82};
```

## 集合

- 使用 `Set<T>` 类型声明集合：

```dart
Set<int> numbers = {1, 2, 3, 4, 5};
```

## 可选类型

- 使用 `T?` 表示类型 `T` 的可选类型，这意味着变量可以是 `T` 类型，也可以是 `null`：

```dart
int? optionalNumber;
```

## 动态类型

- 使用 `var` 关键字声明变量时，Dart 会根据赋值的值自动推断变量的类型：

```dart
var name = 'John Doe';
var age = 25;
```

## 常量

- 使用 `const` 或 `final` 关键字声明常量。`const` 用于编译时常量，`final` 用于运行时常量：

```dart
const double pi = 3.14159;
final String username = 'user123';
```

## 非空延迟初始化

- 使用 `late` 关键字声明非空延迟初始化变量：

```dart
late String name;

void main() {
  name = 'John Doe';
  print(name);
}
```

## 命名构造函数

- Dart 允许使用命名构造函数来创建具有特定属性的对象：

```dart
class Point {
  num x, y;
  Point(this.x, this.y); // 位置构造函数
  Point.origin() : x = 0, y = 0; // 命名构造函数
}
```

## 类型推断

- Dart 支持类型推断，可以使用 `var` 关键字声明变量，Dart 会根据赋值的值自动推断变量的类型：

```dart
var name = 'John Doe';
var age = 25;
```

## 动态任意类型

- 使用 `dynamic` 关键字声明变量时，`编译器不检查` 和 `TypeScript` 中的 `any` 类似：

```dart
dynamic value = 42;
value = 'Hello, world!';
```

- 使用 `Object` 类型声明变量时，`编译器会检查`，`Object` 是所有 Dart 类型的基类：

```dart
Object object = 'Hello, world!';
```
