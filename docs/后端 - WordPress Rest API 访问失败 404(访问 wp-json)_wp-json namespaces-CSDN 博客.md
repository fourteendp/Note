---
title: 后端 - WordPress Rest API 访问失败 404(访问 wp-json)_wp-json namespaces-CSDN 博客
uid: 20240327093741260
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
originalUrl: https://blog.csdn.net/my466879168/article/details/107169245
createTime: 2024-03-27 17:37:41
updateTime: 2024-09-12 08:13:18
---

## 访问 / wp-json 报 404 错误

安装的 [WordPress](https://so.csdn.net/so/search?q=WordPress&spm=1001.2101.3001.7020) 版本是 5.0.2，

据说是 5 版本以上已经是默认的的开启了 rest API 服务，但是怎么访问都是报错 404，需要使用 nginx 重定向

才能使用

### 1. 修改固定链接

在 WordPress 设置中的固定连接设置中将固定链接设置改为除朴素外任意一种，最好还是数字型

![[assets/d2c93f511498425d355cfd0452f8035a_MD5.png]]

### 2. 修改 [nginx](https://so.csdn.net/so/search?q=nginx&spm=1001.2101.3001.7020).conf 文件

使用 ps -ef | [grep](https://so.csdn.net/so/search?q=grep&spm=1001.2101.3001.7020) nginx 查看 nginx

所在的位置和 conf 文件所在的位置，然后编辑 conf 文件

![[assets/53d8ed7238c9eb04c094ee1bcc4673d5_MD5.png]]

在 server 中插入以下几句话来进

行 [重定向](https://so.csdn.net/so/search?q=%E9%87%8D%E5%AE%9A%E5%90%91&spm=1001.2101.3001.7020)

```
if (-f $request_filename/index.html){
rewrite (.*) $1/index.html break;
}
if (-f $request_filename/index.php){
rewrite (.*) $1/index.php;
}
if (!-f $request_filename){
rewrite (.*) /index.php;
}
rewrite /wp-admin$ $scheme://$host$uri/ permanent;
[[这行是为了防止打开后台、插件页等打不开的。]]

```

![[assets/352e421a1ac76d4ab7ba9fd65e1ad589_MD5.png]]

### 3. 重启 nginx 服务器

修改完之后首先查看 nginx.conf 文件的可用性 `/usr/sbin/nginx -t`

![[assets/bec5e3849c87cdf8535799e19ca4ce22_MD5.png]]

看到上面两句话那就证明是正确的然后重启 nginx 服务 `/usr/sbin/nginx -s reload` 现在再次用 ip+/wp-json

就不会出现 404 错误了，数据也出来了
