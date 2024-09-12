---
title: Nodejs - 版本管理工具 volta
uid: 1722915414296
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-06 11:36:54
updateTime: 2024-09-12 08:13:22
---

**Volta 命令行工具**

Volta 是一个 Node.js 版本管理器，它允许您在系统上安装和管理多个 Node.js 版本。

## 安装 Volta

### Unix 安装

在包括 macOS 在内的大多数 Unix 系统上，您可以使用以下命令安装 Volta：

```
curl https://get.volta.sh | bash
```

对于 bash、zsh 和 fish，此安装程序将自动更新您的控制台启动脚本。如果您希望防止修改您的控制台启动脚本，请参阅跳过 Volta 设置。要手动配置您的 shell 以使用 Volta，请编辑您的控制台启动脚本以：

将 VOLTA_HOME 变量设置为 $HOME/.volta

将 $VOLTA_HOME/bin 添加到您的 PATH 变量的开头

### Windows 安装

对于 Windows，下载并运行 Windows 安装程序并按照说明进行操作。

**注意**

Volta 的功能取决于创建符号链接，因此您必须：

启用开发者模式（推荐）

以提升的权限运行 Volta（不推荐）

### 适用于 Linux 的 Windows 子系统

如果您在适用于 Linux 的 Windows 子系统中使用 Volta，请按照上述 Unix 安装指南进行操作。

### 选择默认 Node 版本

这是 Volta 将在没有固定版本的项目之外的任何地方使用的版本。

要选择特定版本的 Node，请运行：

```
volta install node@20.11.0
```

或者使用最新的 LTS 版本，请运行：

```
volta install node
```

## 帮助

```sh
JavaScript 启动器 ⚡

若要安装工具链中的工具，请使用 `volta install`。
若要固定项目的运行时或包管理器，请使用 `volta pin`。

用法：
    volta [标志] [子命令]

标志：
        --verbose    启用详细诊断
        --quiet      防止不必要的输出
    -v, --version    打印 Volta 的当前版本
    -h, --help       打印帮助信息

子命令：
    fetch          获取本地计算机上的工具
    install        在工具链中安装工具
    uninstall      从工具链中卸载工具
    pin            固定项目的运行时或包管理器
    list           显示当前工具链
    completions    生成 Volta 补全
    which          找到 Volta 将调用的实际二进制文件
    setup          为当前用户/外壳启用 Volta
    run            使用自定义 Node、npm、pnpm 和/或 Yarn 版本运行命令
    help           打印此消息或给定子命令的帮助
```

## 参考

 - [Volta - The Hassle-Free JavaScript Tool Manager](https://volta.sh/)
