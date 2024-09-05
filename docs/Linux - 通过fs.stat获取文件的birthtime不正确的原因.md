---
title: Linux - 通过fs.stat获取文件的birthtime不正确的原因
uid: 3377699721334530
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-04-19 23:05:17
updateTime: 2024-09-05 10:12:01
---

在 WSL（Windows Subsystem for Linux）中使用 `fs.stat` 获取文件的 `birthtime`（创建时间）不正确的问题，可能由多种原因引起。以下是一些可能导致这种情况的原因：

1. **文件系统支持问题**：某些 Linux 文件系统可能不支持记录文件的创建时间，或者该信息可能不被操作系统暴露给应用程序。例如，在一些基于 Debian 的发行版中，文件的创建时间可能无法通过常规命令获取。
2. **内核版本问题**：根据一些资料，`stat` 命令显示文件的创建时间（`birthtime`）需要内核版本高于或等于 4.11，并且 glibc 版本高于或等于 2.28。如果使用的是旧版本的 Linux 内核，可能无法正确获取 `birthtime`。
3. **WSL 的 Bug 或限制**：有些问题可能是 WSL 本身的问题或限制。例如，在使用 Bun（一种 JavaScript 运行时）时，有用户报告 `fs.stat` 返回的 `birthtime` 是 Unix 纪元时间戳 `0`，而不是实际的创建时间。
4. **Node.js 版本问题**：在某些情况下，Node.js 的某些版本可能没有正确处理 `birthtime` 属性。例如，在 Node.js 0.12 之前，`ctime` 在 Windows 系统上被错误地用作 `birthtime`。
5. **第三方软件问题**：如果在使用第三方软件或工具时遇到问题，可能是该软件没有正确地与 WSL 集成或存在兼容性问题。

## 参数

- [WSL中通过fs.stat获取文件的birthtime不正确的原因_stat 重定向 时间不对-CSDN博客](https://blog.csdn.net/i_am_a_sb/article/details/121216376)
- [在linux上获取文件的创建时间和实战一例 - fanderchan - 博客园 (cnblogs.com)](https://www.cnblogs.com/fander/p/11235328.html)
