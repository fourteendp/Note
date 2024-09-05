---
title: Debian 中文环境
uid: 20240123112806910
aliases: []
categories: []
tags:
  - 计算机/Linux/Debian
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 14:00:43
---

```shell
# 安装
apt install locales
# 配置
sudo dpkg-reconfigure locales
# 查看当前语言
locale
# 设置失败执行以下
export LANG=zh_CN.UTF-8
# 重启终端
```
