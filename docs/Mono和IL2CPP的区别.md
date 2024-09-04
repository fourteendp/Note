---
title: Mono和IL2CPP的区别
uid: 1724211960274
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-21 11:46:00
updateTime: 2024-09-02 11:11:57
---

[[assets/247b65a950493c85d01a03c499e36570_MD5.jpeg|Open: Pasted image 20240902111131.png]]

![[assets/247b65a950493c85d01a03c499e36570_MD5.jpeg]]

**Mono：**

基于.NET 框架和 Mono 虚拟机：Mono 是用于 Unity 的一个开源、跨平台的.NET 框架实现，包含一个小型的 CLR（公共语言运行时），允许在非 Windows 平台上运行.NET 应用。

动态代码执行：Mono 提供了 JIT（Just-In-Time）编译器，在运行时将中间语言（IL）动态编译成本地代码，这可以带来更好的灵活性和开发时调试体验。

兼容性：Mono 支持更多的.NET 特性，但在某些平台上可能受限于性能和兼容性问题。

**IL2CPP：**

AOT 编译：使用 IL2CPP，将 IL 代码转换为 C++ 源代码，然后再编译为目标平台的本地代码。这样就不再依赖于运行时的 JIT 编译器，提高了运行时性能和安全性。

性能提升：由于提前编译成了原生代码，IL2CPP 通常能带来更好的性能表现，特别是在移动设备上，因为它消除了运行时的编译开销，并允许对代码进行更多优化。

兼容性：IL2CPP 使得 Unity 能够更好地支持那些不允许或限制 JIT 编译器的平台，比如 iOS 和某些游戏主机平台。
