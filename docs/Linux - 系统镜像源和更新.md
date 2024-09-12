---
title: Linux - 系统镜像源和更新
uid: 20240123112806944
aliases: []
categories: []
tags:
  - 计算机/Linux
  - 系统更新
  - 系统镜像源
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:22
---

## 教程

一般情况下，源地址在 `/etc/apt/sources.list`

```shell
# 备份源文件
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
# 复制镜像源到文件头部
sudo vi /etc/apt/sources.list
# 防止运营商劫持
sudo apt install apt-transport-https ca-certificates
# 更新地址源索引
sudo apt update
# 更新系统
sudo apt upgrade
# 删除未使用的依赖项
sudo apt --purge autoremove
```

## 国内镜像

1、阿里云镜像站

```sh
deb https://mirrors.aliyun.com/debian/ bullseye main non-free contribdeb-src https://mirrors.aliyun.com/debian/ bullseye main non-free contrib deb https://mirrors.aliyun.com/debian-security/ bullseye-security maindeb-src https://mirrors.aliyun.com/debian-security/ bullseye-security main deb https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contribdeb-src https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib deb https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contribdeb-src https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
```

2、腾讯云镜像站

```sh
deb https://mirrors.tencent.com/debian/ bullseye main non-free contribdeb-src https://mirrors.tencent.com/debian/ bullseye main non-free contrib deb https://mirrors.tencent.com/debian-security/ bullseye-security maindeb-src https://mirrors.tencent.com/debian-security/ bullseye-security main deb https://mirrors.tencent.com/debian/ bullseye-updates main non-free contribdeb-src https://mirrors.tencent.com/debian/ bullseye-updates main non-free contrib deb https://mirrors.tencent.com/debian/ bullseye-backports main non-free contribdeb-src https://mirrors.tencent.com/debian/ bullseye-backports main non-free contrib
```

3、网易云镜像站

```sh
deb https://mirrors.163.com/debian/ bullseye main non-free contribdeb-src https://mirrors.163.com/debian/ bullseye main non-free contrib deb https://mirrors.163.com/debian-security/ bullseye-security maindeb-src https://mirrors.163.com/debian-security/ bullseye-security main deb https://mirrors.163.com/debian/ bullseye-updates main non-free contribdeb-src https://mirrors.163.com/debian/ bullseye-updates main non-free contrib deb https://mirrors.163.com/debian/ bullseye-backports main non-free contribdeb-src https://mirrors.163.com/debian/ bullseye-backports main non-free contrib
```

4、华为镜像站

```sh
deb https://mirrors.huaweicloud.com/debian/ bullseye main non-free contribdeb-src https://mirrors.huaweicloud.com/debian/ bullseye main non-free contrib deb https://mirrors.huaweicloud.com/debian-security/ bullseye-security maindeb-src https://mirrors.huaweicloud.com/debian-security/ bullseye-security main deb https://mirrors.huaweicloud.com/debian/ bullseye-updates main non-free contribdeb-src https://mirrors.huaweicloud.com/debian/ bullseye-updates main non-free contrib deb https://mirrors.huaweicloud.com/debian/ bullseye-backports main non-free contribdeb-src https://mirrors.huaweicloud.com/debian/ bullseye-backports main non-free contrib
```

5、清华镜像站

```sh
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-freedeb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-freedeb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-freedeb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-freedeb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
```

6、中科大镜像站

```sh
deb https://mirrors.ustc.edu.cn/debian/ bullseye main contrib non-freedeb-src https://mirrors.ustc.edu.cn/debian/ bullseye main contrib non-free
deb https://mirrors.ustc.edu.cn/debian/ bullseye-updates main contrib non-freedeb-src https://mirrors.ustc.edu.cn/debian/ bullseye-updates main contrib non-free
deb https://mirrors.ustc.edu.cn/debian/ bullseye-backports main contrib non-freedeb-src https://mirrors.ustc.edu.cn/debian/ bullseye-backports main contrib non-free
deb https://mirrors.ustc.edu.cn/debian-security/ bullseye-security main contrib non-freedeb-src https://mirrors.ustc.edu.cn/debian-security/ bullseye-security main contrib non-free
```

## 参考

- [Debian 源使用帮助 — USTC Mirror Help 文档](https://mirrors.ustc.edu.cn/help/debian.html)
- [清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/)
- [USTC Open Source Software Mirror](https://mirrors.ustc.edu.cn/)
