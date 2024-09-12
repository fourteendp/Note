---
title: WSL - SSH 远程连接
uid: 20240123112807100
aliases: []
categories: []
tags:
  - 服务安装
  - 计算机/Linux
  - 计算机/Linux/WSL
  - 配置信息
  - 远程连接
  - SSH
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:20
---

## SSH 服务安装

WSL 子系统的 SSH 服务无法连接，需要重新安装

```shell
apt remove openssh-server
apt install openssh-server
```

## 编辑配置信息

- 编辑 `/etc/ssh/sshd_config`

```shell
PasswordAuthentication yes
Port 22
PermitRootLogin yes
```

- 开启服务 `service ssh start`
- 查看状态 `service ssh status`
