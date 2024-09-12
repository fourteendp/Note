---
title: 工具 - 坑：ssh： connect to host github-com port 22： Connection refused
uid: 20240123112809280
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
originalUrl: https://zhuanlan.zhihu.com/p/521340971
createTime: 2024-01-23 19:08:51
updateTime: 2024-09-12 08:13:17
---

## **问题现象**

本文以 Windows 系统为例进行说明，在个人电脑上使用 Git 命令来操作 GitHub 上的项目，本来都很正常，突然

某一天开始，会提示如下错误 `ssh: connect to host github.com port 22: Connection refused`。

```
$ git pull
ssh: connect to host github.com port 22: Connection refused
fatal: Could not read from remote repository.
​
Please make sure you have the correct access rights
and the repository exists.

```

## **排查思路**

`ssh: connect to host github.com port 22: Connection refused` 这个错误提示的是连接 `github.com` 的

22 端口被拒绝了。

原本以为 [http://github.com](http://github.com) 挂了，但是浏览器访问

[http://github.com](http://github.com) 一切正常。

网上搜索这个报错，发现很多人遇到这个问题，大概有 2 个原因和对应解决方案：

### **使用 GitHub 的 443 端口**

22 端口可能被防火墙屏蔽了，可以尝试连接 GitHub 的 443 端口。

```
$ vim ~/.ssh/config
```

## Add section below to it

Host github.com

Hostname ssh.github.com

Port 443

```
$ ssh -T git@github.com
Hi xxxxx! You've successfully authenticated, but GitHub does not
provide shell access.

```

这个解决方案的思路是：给 `~/.ssh/config` 文件里添加如下内容，这样 ssh 连接 GitHub 的时候就会使用 443

端口。

```
Host github.com
  Hostname ssh.github.com
  Port 443

```

如果 `~/.ssh` 目录下没有 config 文件，新建一个即可。

修改完 `~/.ssh/config` 文件后，使用 `ssh -T git@github.com` 来测试和 GitHub 的网络通信是否正常，如果

提示 `Hi xxxxx! You've successfully authenticated, but GitHub does not provide shell access.` 就表示

一切正常了。

但是，这个方案在我这里行不通，修改后还是提示

`ssh: connect to host github.com port 443: Connection refused`。

**这个方案有效的前提是**：执行命令 `ssh -T -p 443 git@ssh.github.com` 后不再提示
`connection refused`，所以要尝试这个方案的小伙伴先执行这条命令测试下。

### **使用 https 协议，不要使用 ssh 协议**

在你的 GitHub 的本地 repo 目录，执行如下命令：

```
$ git config --local -e

```

然后把里面的 url 配置项从 git 格式

```
url = git@github.com:username/repo.git

```

修改为 https 格式

```
url = https://github.com/username/repo.git

```

这个其实修改的是 repo 根目录下的 `./git/config` 文件。

**但是这个方法在我这里同样不生效**。

## **解决方案**

网上的招都没用，只能自力更生了。既然和 GitHub 建立 ssh 连接的时候提示 `connection refused`，那我们就

详细看看建立 ssh 连接的过程中发生了什么，可以使用 `ssh -v` 命令，`-v` 表示 verbose，会打出详细日志。

```
$ ssh -vT git@github.com
OpenSSH_9.0p1, OpenSSL 1.1.1o  3 May 2022
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: Connecting to github.com [::1] port 22.
debug1: connect to address ::1 port 22: Connection refused
debug1: Connecting to github.com [127.0.0.1] port 22.
debug1: connect to address 127.0.0.1 port 22: Connection refused
ssh: connect to host github.com port 22: Connection refused

```

从上面的信息马上就发现了诡异的地方，连接 [http://github.com](http://github.com) 的地址居然是 `::1`

和 `127.0.0.1`。前者是 IPV6 的 localhost 地址，后者是 IPV4 的 localhost 地址。

到这里问题就很明确了，是 DNS 解析出问题了，导致 [http://github.com](http://github.com) 域名被解析成

了 localhost 的 ip 地址，就自然连不上 GitHub 了。

Windows 下执行 `ipconfig /flushdns` 清楚 DNS 缓存后也没用，最后修改 hosts 文件，增加一条 github.com

的域名映射搞定。

```
140.82.113.4 github.com

```

查找 [http://github.com](http://github.com) 的 ip 地址可以使用

[https://www.ipaddress.com/](https://www.ipaddress.com/) 来查询，也可以使用 `nslookup` 命令

```
nslookup github.com 8.8.8.8

```

`nslookup` 是域名解析工具，`8.8.8.8` 是 Google 的 DNS 服务器地址。直接使用

```
nslookup github.com

```

就会使用本机已经设置好的 DNS 服务器进行域名解析，`ipconfig /all` 可以查看本机 DNS 服务器地址。

这个问题其实就是 DNS 解析被污染了，有 2 种可能：

- DNS 解析被运营商劫持了
- 使用了科学上网工具

按照我上面写的解决方案操作即可解决。

## **References**

- [https://chaxuri.com/archives/43.html](https://chaxuri.com/archives/43.html)
- [https://stackoverflow.com/questions/15589682/ssh-connect-to-host-github-com-port-22-connection-timed-out](https://stackoverflow.com/questions/15589682/ssh-connect-to-host-github-com-port-22-connection-timed-out)
- [https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey](https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey)
- [https://gist.github.com/Tamal/1cc77f88ef3e900aeae65f0e5e504794](https://gist.github.com/Tamal/1cc77f88ef3e900aeae65f0e5e504794)
