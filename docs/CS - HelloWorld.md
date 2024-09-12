---
title: CS - HelloWorld
uid: 20240123112806930
aliases: []
categories: []
tags:
  - 笔记方法
  - 编程语言/CS
archive: false
draft: false
todo: false
createTime: 2023-05-08 01:04:27
updateTime: 2024-09-12 08:13:24
---

## C# Hello World

### 项目结构

```shell
CS-Hello
├── bin # 编译后的文件
│   └── Debug
├── CS-Hello.csproj # 项目文件
├── CS-Hello.sln # 解决方案文件
├── obj # 编译后的中间文件
└── Program.cs # 程序入口
```

### 程序入口基本结构

```csharp
// Program.cs
// 引入命名空间
using System; // 在 C# 中，所有的类都在命名空间中，所以需要引入命名空间才能使用类, System 是 C# 的根命名空间，所有的类都在 System 命名空间中, 所以在 C# 中，不需要引入 System 命名空间也可以使用类
namespace Application // 命名空间 Application, 用于区分不同的程序, 一个程序可以有多个命名空间, 但是只能有一个入口类, 也就是只能有一个类有 Main 方法
{ // 如果一个文件中只要一个命名空间，可以省略命名空间的大括号, 可以直接在头部加上 using System; 然后在类前面加上 namespace Application; 就可以了
  class Program
  {
    static int Main(string[] args)
    {
      // 在控制台输出 Hello World!
      Console.WriteLine("Hello World!"); // 如果不引入命名空间，需要使用 System.Console.WriteLine("Hello World!");
      return 0; // 返回 0 表示程序正常退出, 如果不返回值，C# 会自动返回 0,所以可以省略 return 语句
    }
  }
}

```

#### 如果一个文件内有多个命名空间

```csharp
// Program.cs
using System;
namespace Application
{
  class Program
  {
    static int Main(string[] args)
    {
      Console.WriteLine("Hello World!");
      return 0;
    }
  }
}

namespace Application2
{
  class Program
  {
    static int Main(string[] args)
    {
      Console.WriteLine("Hello World!");
      return 0;
    }
  }
}
```

#### 如果文件内只有一个命名空间, 可以省略命名空间的大括号

```csharp
// Program.cs
using System;
namespace Application;
class Program
{
  static int Main(string[] args)
  {
    Console.WriteLine("Hello World!");
    return 0;
  }
}
```

#### 省略返回值

```csharp
// Program.cs
using System;
namespace Application;
class Program
{
  static void Main(string[] args)
  {
    Console.WriteLine("Hello World!");
  }
}
```

#### 如果使用顶级语句

**顶级语句** 是 C# 10.0 引入的新特性，可以让我们不用写 `Main` 方法，直接在文件中写代码，这样可以让我
们的代码更加简洁。

```csharp
// Program.cs
// 顶级语句
Console.WriteLine("Hello World!");
```

> 注意：顶级语句只能在程序入口文件中使用，不能在其他文件中使用。
