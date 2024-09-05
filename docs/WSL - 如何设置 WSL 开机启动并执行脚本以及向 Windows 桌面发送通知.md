---
title: Windows 如何设置 WSL 开机启动并执行脚本以及向 Windows 桌面发送通知
uid: 20240123112807160
aliases: []
categories: []
tags:
  - 发送通知
  - 计算机/Linux/WSL
  - 计算机/Windows
  - 开机启动
  - 执行脚本
archive: false
draft: false
todo: false
publishUrl: "https://juejin.cn/post/7235177983311642685"
createTime: 2023-05-21 07:30:58
updateTime: 2024-08-02 13:59:51
---

> 环境：WIndows 10 和 WSL1 其它版本也是类似的思路

## 首先设置 WSL 在 Windows 开机时启动

- 打开 Windows 开机启动执行目录 `Win` + `R` 输入 `shell:startup`,新建一个 `vbs` 脚本

![[Pasted image 20230520213714.png]]

## 编写 WSL 启动脚本

- 下面是脚本代码

```vbs
' 获取执行对象
Set ws = CreateObject("Wscript.Shell")
' 执行命令
' 直接使用执行对象执行命令有权限限制，所以这里使用powershell执行wsl命令
' -d 指定wsl发行版本 -u 指定登录执行的账户, 账户后面可以直接添加需要执行的命令
' 如：wsl -d Debian -u root /etc/init.d/wsl [start|stop|status]
' 应为我这里的是admin, 可以直接把需要开机启动的脚本放在.bashrc或者.zshrc等根据自己的使用的终端设置终端的配置文件会在登录后执行
' 把执行脚本放在终端配置文件有问题就是每次登录的时候这里都会执行一次，可以自行做服务是否已启动判断
ws.Run "powershell.exe -Command ""wsl -d Debian -u admin""", vbhide
```

这个时候就可以在 Windows 开机的时候启动 WSL 并执行需要的服务脚本啦

## WSL 向 Windows 桌面发送通知

![[Pasted image 20230520220103.png]]

- 用管理员的方式打开 `PowerShell` 安装 [BurntToast](https://github.com/Windos/BurntToast),执行
  `Install-Module -Name BurntToast` 现在你可以尝试，在 `PowerShell` 里向桌面发送通知啦
- `New-BurntToastNotification`,更多示例请看文档 [BurntToast](https://github.com/Windos/BurntToast)
  ![[Pasted image 20230520221203.png]]

下面只需要在 WSL 里执行 `PowerShell` 命令就可以啦

![[Pasted image 20230520222414.png]]
