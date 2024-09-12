---
title: 工具 - Neovim 的安装和配置
uid: 20240123112806944
aliases: []
categories: []
tags:
  - 计算机/Linux/安装
  - 计算机/Linux/配置
  - 计算机/Linux/Debian
  - 计算机/Linux/Neovim
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:18
---

## Neovim 的安装

### 直接 Debian 远程仓库安装

**版本较旧**

```
apt install neovim
```

### 从 GitHub 仓库下载安装

- 在这 [Neovim Releases](https://github.com/neovim/neovim/releases) 找到对应版本下载到系统中

```shell
wget <url>
```

- 使用 `apt` 安装 `neovim`

```shell
sudo apt install ./nvim-linux64.deb
```

### 配置 NeoVim

- [nvchad](https://nvchad.com/docs/quickstart/install)

### 参考

- [neovim/neovim: Vim-fork focused on extensibility and usability](https://github.com/neovim/neovim)
