---
title: Windows 创建软连接
uid: 20240123112807160
aliases: []
categories: []
tags:
  - 创建软连接
  - 符号链接
  - 计算机/Windows
  - 目录联接
  - 硬链接
  - nvm
  - pnpm
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:51
---

## 简介

- 创建符号链接可以用于 C 盘数据迁移到其它盘而不影响原来的文件路径，
- 列如：
  - 迁移浏览器缓存
  - `node` 版本管理器 `nvm`
  - `JavaScript` 包管理器 `pnpm`

## 语法

```shell
mklink /? # 打印帮助

# 创建符号链接。
MKLINK [[/D] |[/H] | [/J]] Link Target
        /D      创建目录符号链接。默认为文件符号链接。
        /H      创建硬链接而非符号链接。
        /J      创建目录联接。
        Link    指定新的符号链接名称。
        Target  指定新链接引用的路径
                (相对或绝对)。
```

## 实例

- 迁移 Google 浏览器缓存数据

```shell
mklink /J "C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\Cache" "F:\chrome\cache"
```

## 注意

- 只有 cmd 窗口下才可用，在 powershell 下不行
- `Link` 必须不存在才可创建
