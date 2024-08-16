---
title: 在 WLS2 Debian 上安装
uid: 20240123112809280
aliases:
  - 在 WLS2 Debian 上安装 Docker
categories: []
tags: []
archive: false
draft: false
todo: false
originalUrl: https://blog.csdn.net/qq_50883920/article/details/120540509
createTime: 2023-08-30 22:51:45
updateTime: 2024-08-02 13:59:23
---

## 在 WLS2 [Debian](https://so.csdn.net/so/search?q=Debian&spm=1001.2101.3001.7020) 上安装 Docker

​ **1.1 准备安装环境**

​ **win10 专业版 20H2**

这里一定要注意，博主已经踩过坑了，因为不是这个安装环境，导致博主卸载又安装 20 多次

[docker](https://so.csdn.net/so/search?q=docker&spm=1001.2101.3001.7020)！

![](https://img-blog.csdnimg.cn/0a6ba2ebf847443cb1ac7bb420978f6c.png)

​ **1.2 如果你之前安装过其它版本，先卸载**

```
sudo apt-get remove docker docker-engine docker.io containerd runc

```

​ **1.3 直接使用阿里云的脚本安装**

```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

```

![](https://img-blog.csdnimg.cn/55af48c0e46f44949c90a0af148cb336.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5pWW5LiZMTk2,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

到此，脚本已经帮你安装完成！

​ **1.4 启动 docker**

然后发现启动失败，原因是没有该目录，下面我们创建该目录，并解决 bug

![](https://img-blog.csdnimg.cn/67a3ea8e40b246b5bd308f591a9f8d03.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5pWW5LiZMTk2,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

```
[[启动docker]]
sudo service docker start

[[查看docker的状态]]
sudo service docker status

[[解决bug]]
sudo touch /etc/fstab

sudo update-alternatives --set iptables /usr/sbin/iptables-legacy

sudo update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy

[[再次启动]]
sudo service docker start

[[hello-world测试]]
sudo docker run hello-world


```

![](https://img-blog.csdnimg.cn/194df273d0384da0aff85d521df73ffd.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5pWW5LiZMTk2,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

到此 安装完成！

**1.5 配置国内镜像**

无需翻墙，可以直接加快你的下速度

```
[[进入/etc/docker目录]]
cd /etc/docker

[[如果没有daemon]].json，创建一个
vim daemon.json

[[然后添加如下内容]]
{
"registry-mirrors" : [
  "https://lregistry.docker-cn.com" ,

  "http:// hub-mirror.c.163.com",

  "https:// docker.mirrors.ustc.edu.cn"
]
}

```

关于 docker 的使用，敬请期待后续更新！
