---
title: Linux 查看硬件和系统信息
uid: 20240123112806940
aliases: []
categories: []
tags:
  - 操作系统版本
  - 发行版本
  - 计算机/Linux
  - 计算机/Linux/硬件信息
  - 计算机/Linux/硬件信息
  - 系统内核
  - 系统信息
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:53
---

## 查看操作系统版本信息

| 命令                  | 说明                  |
| --------------------- | --------------------- |
| `cat /proc/version`   | 查看系统版本信息      |
| `uname -a`            | 查看系统内核信息      |
| `cat /etc/issue`      | 查看发行版本信息      |
| `cat /etc/os-release` | 查看详细发行版本信息  |
| `cat /proc/cpuinfo`   | 查看硬件信息          |
| `getconf LONG_BIT`    | 查看 32bit 还是 64bit |
