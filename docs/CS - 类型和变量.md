---
title: CS - 类型和变量
uid: 20240123112807452
aliases: []
categories: []
tags:
  - 编程语言/CS
archive: false
draft: false
todo: false
createTime: 2023-05-08 01:04:27
updateTime: 2024-09-05 09:48:50
---

C# 是一种强类型语言，所以在使用变量之前，必须声明变量的类型。

C# 和 JavaScript 一样，变量的类型可以是基本类型，也可以是引用类型。

## 值/基本类型

### 简单类型

#### 整型 (Integer)

**有符号整型** (Signed Integer) 有正数、负数和 0 三种值，可以表示正数、负数和 0。

**无符号整型** (Unsigned Integer) 只有正数和 0 两种值，只能表示正数和 0。

| 类型/关键字 | 大小 | 范围 | 说明 |.NET 类型 |

| --- | --- | --- | --- | --- | --- |

| `sbyte` | 1 字节 | -128 ~ 127 | 有符号的 8 位整数 | `System.SByte` |

| `byte` | 1 字节 | 0 ~ 255 | 无符号的 8 位整数 | `System.Byte` |

| `short` | 2 字节 | -32768 ~ 32767 | 有符号的 16 位整数 | `System.Int16` |

| `ushort` | 2 字节 | 0 ~ 65535 | 无符号的 16 位整数 | `System.UInt16` |

| `int` | 4 字节 | -2147483648 ~ 2147483647 | 有符号的 32 位整数 | `System.Int32` |

| `uint` | 4 字节 | 0 ~ 4294967295 | 无符号的 32 位整数 | `System.UInt32` |

| `long` | 8 字节 | -9223372036854775808 ~ 9223372036854775807 | 有符号的 64 位整数 | `System.Int64`

|

| `ulong` | 8 字节 | 0 ~ 18446744073709551615 | 无符号的 64 位整数 | `System.UInt64` |

| `nint` | 4 字节或 8 字节 | 取决于（在运行时计算的）平台 | 带符号的 32 位或 64 位整数 |

`System.IntPtr` |

| `nuint` | 4 字节或 8 字节 | 取决于（在运行时计算的）平台 | 无符号的 32 位或 64 位整数 |

`System.UIntPtr` |

#### 字符型

字符串是由字符组成的，字符是一个 Unicode 字符，所以一个字符占用 2 个字节。

`string` 和 `char` 啥区别？

`string` 是一个类，`char` 是一个字符类型。

在 java、C#中，String 类是不可变的，对 String 类的任何改变，都是返回一个新的 String 类对象。

| 类型/关键字 | 大小 | 范围 | 说明 |.NET 类型 |

| --- | --- | --- | --- | --- | --- |

| `char` | 2 字节 | 0 ~ 65535 | 一个 UTF-16 字符 | `System.Char` |

#### 浮点型

浮点型用于表示带小数点的数字，浮点型有两种：单精度浮点型和双精度浮点型。

| 类型/关键字 | 大小 | 范围 | 说明 |.NET 类型 |

| --- | --- | --- | --- | --- | --- |

| `float` | 4 字节 | -3.402823e38 ~ 3.402823e38 | 单精度浮点型 | `System.Single` |

| `double` | 8 字节 | -1.79769313486232e308 ~ 1.79769313486232e308 | 双精度浮点型 | `System.Double`

|

| `decimal` | 16 字节 | -79228162514264337593543950335 ~ 79228162514264337593543950335 | 128 位精度

的十进制数 | `System.Decimal` |

#### 布尔型

布尔型只有两个值：`true` 和 `false`。

| 类型/关键字 | 大小 | 范围 | 说明 |.NET 类型 |

| --- | --- | --- | --- | --- | --- |

| `bool` | 1 字节 | true 或 false | 布尔值 | `System.Boolean` |

### 枚举类型

enum 类型是一种包含已命名常量的独特类型。 每个 enum 类型都有一个基础类型（必须是八种整型类型之一）。

enum 类型的值集与基础类型的值集相同

```csharp
enum Color
{
    Red,
    Green,
    Blue
}

Color color = Color.Red;
```

### 结构类型

结构类型（"structure type" 或 "struct type"）是一种可封装数据和相关功能的值类型 。 使用 struct 关键

字定义结构类型

```csharp
struct Point
{
    public int X;
    public int Y;
}

Point point = new Point();
point.X = 1;
point.Y = 2;
```

### 可空 null 类型

值为 null 的其他所有值类型的扩展

```csharp
int? a = null;
int? b = 1;
```

### 元组类型

元组类型（"tuple type"）是一种特殊的结构类型，它包含一组命名的字段，但没有定义的字段类型。 使用

tuple 关键字定义元组类型

```csharp
tuple<int, string> t = (1, "hello");
```

## 引用类型

### 类类型

> 其它所有类型的最终基类是 `object` 类字符串:`string` 类

类类型（"class type"）是一种引用类型，它封装数据和相关功能。 使用 class 关键字定义类类型

```csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

Person person = new Person();
person.Name = "Tom";
person.Age = 18;
```

### 接口类型

接口类型（"interface type"）是一种引用类型，它封装行为。 使用 interface 关键字定义接口类型

```csharp
interface IAnimal
{
    void Eat();
}

class Cat : IAnimal
{
    public void Eat()
    {
        Console.WriteLine("猫吃鱼");
    }
}

class Dog : IAnimal
{
    public void Eat()
    {
        Console.WriteLine("狗吃肉");
    }
}
```

### 数组类型

数组类型（"array type"）是一种引用类型，它封装一组数据。 使用 array 关键字定义数组类型

```csharp
int[] arr = new int[3];
arr[0] = 1;
arr[1] = 2;
arr[2] = 3;
```

### 委托类型

委托类型（"delegate type"）是一种引用类型，它封装方法。 使用 delegate 关键字定义委托类型

```csharp
delegate void MyDelegate();

class Program
{
    static void Main(string[] args)
    {
        MyDelegate myDelegate = new MyDelegate(Method);
        myDelegate();
    }

    static void Method()
    {
        Console.WriteLine("Hello World!");
    }
}
```
