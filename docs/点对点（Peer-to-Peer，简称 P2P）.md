---
title: 点对点（Peer-to-Peer，简称 P2P）
uid: 1721632086059
aliases:
  - 点对点（P2P）
categories: 
tags: 
archive: false
draft: false
todo: false
createTime: 2024-07-22 15:08:06
updateTime: 2024-08-12 16:12:56
---

点对点（Peer-to-Peer，简称 P2P）技术是一种网络通信架构，它允许网络中的各个节点（Peers）直接进行数据交换和通信，无需通过中央服务器或中介。这种技术在许多应用中得到广泛应用，包括文件共享、即时通讯、分布式计算和区块链等。以下是 P2P 技术的一些关键特点和应用场景：

## 关键特点

1. **去中心化**：P2P 网络没有中心服务器，每个节点既是客户端也是服务器，可以独立地提供和获取资源。
2. **分布式**：数据和任务分布在整个网络中，提高了系统的可扩展性和容错性。
3. **自组织**：网络中的节点可以动态加入或离开，网络结构能够自我调整和适应。
4. **冗余性**：数据在多个节点上存储，提高了数据的可用性和抗攻击能力。
5. **直接通信**：节点之间可以直接交换数据，减少了通信延迟和带宽消耗。
6. **隐私性**：由于没有中心服务器，用户的通信和数据交换更难被监控和追踪。

## 技术挑战

1. **网络发现**：在没有中心服务器的情况下，节点需要有效的方法来发现和连接其他节点。
2. **数据一致性**：在分布式环境中，保持数据的一致性和完整性是一个挑战。
3. **安全性**：P2P 网络容易受到各种攻击，如 DDoS 攻击、数据篡改和恶意节点等。
4. **激励机制**：在没有中心控制的情况下，设计有效的激励机制鼓励节点参与和贡献资源是必要的。
5. **可扩展性**：随着网络规模的增长，如何保持网络的性能和稳定性是一个问题。

## 应用场景

1. **文件共享**：如 BitTorrent，用户可以直接从其他用户那里下载文件的片段，提高了下载速度和效率。
2. **即时通讯**：如 Jabber/XMPP，用户可以直接与其他用户通信，无需通过中心服务器。
3. **分布式计算**：如 BOINC，利用全球范围内的志愿者计算机的闲置计算能力来执行科学研究。
4. **区块链技术**：如比特币，网络中的每个节点都保存着整个区块链的副本，共同维护交易记录。
5. **内容分发网络**（CDN）：通过 P2P 技术，内容可以更快速地分发到用户，减少中心服务器的压力。
6. **物联网（IoT）**：在设备数量庞大的物联网中，P2P 技术可以减少中心服务器的负载，提高数据处理效率。

## P2P 连接原理

### NAT

NAT 全称 Network Address Translation，即网络地址转换，NAT 是用于在本地网络中使用私有地址，在连接互联网时转而使用全局 IP 地址的技术，NAT 一开始是为了解决 IPv4 地址短缺而开发的技术，而现在也作为安全防护的一种技术。

#### NAT 工作原理

NAT 设备位于私有网络和公用网络之间，以下是一个简单的工作方式示例：

![[assets/d8e48bd45570b7198194a082d86654f3_MD5.webp]]

1. 内部主机发送数据包到外部网络时，数据包首先到达 NAT 设备。
2. NAT 设备根据**配置规则，**将源 IP 地址和端口号 按规则进行转换
3. NAT 设备将转换后的数据包发送到外部网络。
4. 外部网络返回响应数据包时，NAT 设备将目的 IP 地址和端口号进行逆转换，再将数据包发送回内部网络。

#### NAT 分类

要进一步理解 NAT，首先就是了解 NAT 的分类。[RFC2663](https://link.juejin.cn?target=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Ftools%2Fblog-entry%3Ftarget%3Dhttps%253A%252F%252Fdatatracker.ietf.org%252Fdoc%252Fhtml%252Frfc2663%2523section-4.0%26source%3Darticle%26objectId%3D1934525 "https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc2663%23section-4.0&source=article&objectId=1934525") 把 NAT 分成了四类：传统 NAT、双向 NAT、两次 NAT、多宿主 NAT。由于最常见的就是传统 NAT，这里只介绍传统 NAT。 传统 NAT 还可以分成两类：基本 NAT（Basic NAT）、NAPT（Network Address Port Translation，网络地址端口转换）。

##### 基本 NAT

基本 NAT 就是只针对 IP 地址的 " 重命名 "。由于基本 NAT 并不考虑更高层的协议 (如 TCP、)，所以它只是实现了一个内部 IP 地址到公网 IP 地址的一一对应。如果内部 IP 数量更少，那么每个内部地址都能被映射到一个共有公网 IP。如果公网 IP 数量少于内部 IP 的话，就不能保证同一时间每个内部设备都能访问外网了（可能分配不到公网 IP）。

###### 静态 NAT

静态 NAT：一对一映射，将一个私有 IP 地址映射到一个公共 IP 地址。 ![[assets/b5516b48f2cbead00c04b2787c3df8be_MD5.webp]]

###### 动态 NAT

动态 NAT：动态分配公共 IP 地址给私有 IP 地址，使得多个私有 IP 地址可以共享少量公共 IP 地址。 ![[assets/ee470231cb32cb75e3eb9a93d7779fda_MD5.webp]]

##### NAPT

![[assets/14e6ef6567040cc273f4c1e720820ae8_MD5.webp]]NAPT 也被称为 " 一对多 " 的 NAT，或者叫 PAT（Port Address Translations，[端口地址转换](https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E7%25AB%25AF%25E5%258F%25A3%25E5%259C%25B0%25E5%259D%2580%25E8%25BD%25AC%25E6%258D%25A2%2F17610869%3FfromModule%3Dlemma_inlink "https://baike.baidu.com/item/%E7%AB%AF%E5%8F%A3%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2/17610869?fromModule=lemma_inlink")）、地址超载（address overloading）。上节讲述的 静态 NAT 和 动态 NAT 都可归类为 基础性 NAT，**它们仅将内网主机的私有 IP 地址 一对一地转换为公网地址**，并不将 TCP/UDP 端口信息进行转换。而 NAPT 不但会改变经过这个 NAT 设备的 IP 数据包的 IP 地址，还会改变数据包的 TCP/UDP 端口号。 NAPT 主要用于企业只有一个公网 IP 但是有多个业务系统需要被互联网访问的场景。NAPT 普遍用于 [接入设备](https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E6%258E%25A5%25E5%2585%25A5%25E8%25AE%25BE%25E5%25A4%2587%2F10610129%3FfromModule%3Dlemma_inlink "https://baike.baidu.com/item/%E6%8E%A5%E5%85%A5%E8%AE%BE%E5%A4%87/10610129?fromModule=lemma_inlink") 中，它可以将中小型的网络隐藏在一个合法的 IP 地址后面。。

NAPT 的主要优势在于，能够使用一个全球有效 IP 地址获得通用性。主要缺点在于其通信仅限于 TCP 或 UDP。当所有通信都采用 TCP 或 UDP，NAPT 允许一台内部计算机访问多台外部计算机，并允许多台内部 [主机](https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E4%25B8%25BB%25E6%259C%25BA%2F0%3FfromModule%3Dlemma_inlink "https://baike.baidu.com/item/%E4%B8%BB%E6%9C%BA/0?fromModule=lemma_inlink") 访问同一台外部计算机，相互之间不会发生冲突。

#### NAPT 类型

在 NAPT 模式下，在 [rfc3489中](https://link.juejin.cn?target=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc3489%23section-4 "https://datatracker.ietf.org/doc/html/rfc3489#section-4")，根据数据包过滤限制的不同点 又可细分为几种不同的类型。

##### 完全圆锥型

- 一旦内部地址 iAddr:iPort 映射到外部地址 eAddr:ePort ，所有发自 iAddr:iPort 的数据包都经由 eAddr:ePort 向外发送。
- 任意外部主机发送的数据包都能经由 eAddr:ePort 到达 iAddr:iPort

![[assets/78ccfd85d1419fd10b2ce7d5bf0e13ae_MD5.webp]]

##### 受限圆锥形

- 一旦内部地址 iAddr:iPort 映射到外部地址 eAddr:ePort ，所有发自 iAddr:iPort 的数据包都经由 eAddr:ePort 向外发送；
- 但只有曾经接收到 iAddr:iPort 发送的数据包的外部主机 nAddr:any 发送的数据包，才能经由 eAddr:ePort 到达 iAddr:iPort 。（注意，这里的 any 指外部主机源端口不受限制。**即受限圆锥型限制了可以发送数据包的外部主机的 IP，但没有限制外部主机的端口号**。）

![[assets/dd4bd2503102e12fc3e98ded517ba5b3_MD5.webp]]

##### 端口受限型

- 端口受限圆锥型在受限圆锥型的基础上，加上了对外部主机的端口号限制，即只有曾经接收到 iAddr:iPort 发送的数据包的外部主机 nAddr:nPort 发送的数据包，才能经由 eAddr:ePort 到达 iAddr:iPort 。

![[assets/103d284b81329df31e2e5c681c132c38_MD5.webp]]

##### 对称型

对称型的场景比较复杂一些。我们将内部地址 iAddr:iPort 与外部主机 nAddr:nPort 的地址和端口号组成一个四元组 (iAddr, iPort, nAddr, nPort) ，对于四元组中的不同取值，NAT 都会对应分配一个外部地址 eAddr:ePort ；并且也只有曾经收到内部主机数据的对应的外部主机，才能够把数据包发回 ![[assets/c2c95da93d626f03a4db4f5a6293c0a5_MD5.webp]]

### 穿透服务/协议

#### 不同 NAT 之间的穿透性

NAT 之间连接有十种组合类型

|全锥型|全锥型|可打通|
|---|---|---|
|全锥型|受限锥型|可打通|
|全锥型|端口受限锥型|可打通|
|全锥型|对称型|可打通|
|受限锥型|受限锥型|可打通|
|受限锥型|端口受限锥型|可打通|
|受限锥型|对称型|可打通|
|端口受限锥型|端口受限锥型|可打通|
|端口受限锥型|对称型|无法打通|
|对称型|对称型|无法打通|

#### 打洞流程示例

以下演示了，双方都位于不同的 NAT 服务之下的打洞流程。示例来自于:[bford.info/pub/net/p2p…](https://link.juejin.cn?target=https%3A%2F%2Fbford.info%2Fpub%2Fnet%2Fp2pnat%2F "https://bford.info/pub/net/p2pnat/") 博文。

假设存在两台设备 A 和 B，它们分别位于各自的 NAT_A 和 NAT_B 之后。此时 A 第一次尝试和 B 建立点对点连接，向 NAT_B 发送数据包；然而 NAT_B 经过查表发现，之前并没有 A 和 B 的映射（即 A 的请求无法被转发到 B），于是来自 A 的数据包就会被丢弃。 为了能绕过 NAT 的限制，我们需要借助一台公网上的服务器 S 做地址转发。如下图 [1](https://link.juejin.cn?target=https%3A%2F%2Fwebrtc.mthli.com%2Fbasic%2Fp2p-hole-punching%2F%23fn-1 "https://webrtc.mthli.com/basic/p2p-hole-punching/#fn-1") 所示： ![[assets/50616e0ae1f2accbd9b106fb3c1e86e7_MD5.webp]]

1. A 与 S 建立连接（Session A-S），向 S 注册自己的内网地址 10.0.0.1:4321 ；S 会同时记录 A 在公网的地址 155.99.25.11:62000 。B 与 S 建立连接（Session B-S），向 S 注册自己的内网地址 10.1.1.3:4321 ；S 会同时记录 B 在公网的地址 138.76.29.7:31000 。
2. A 向 S 发送请求，获取 B 的地址（Request Connection to B）；S 会同时把 A 的地址转发给 B（Forward A's Endpoints to B）。然后 A 和 B 都开始尝试相互向对方发送数据包。
3. 当 A 向 B 第一次发送数据包时（Send to B at）会在 NAT_A 中产生映射 (10.0.0.1:4321, 138.76.29.7:31000) ；此时 NAT_B 并没有 A 和 B 的映射记录，数据包仍然会被丢弃。
4. 当 B 向 A 第一次发送数据包时（Send to A at）会在 NAT_B 中产生映射 (10.1.1.3:4321, 155.99.25.11:62000) ；因为之前 NAT_A 已经创建了 A 和 B 的映射，所以 B 请求成功。
5. 当 A 向 B 第二次发送数据包时，因为 NAT_B 也有了 A 和 B 的映射记录，所以 A 也请求成功。于是打洞完成，A 和 B 可以直接建立点对点连接（Session A-B）。

真实的网络情况可能会更加复杂，比如需要在多层 NAT 之间打洞。以及目前业界习惯使用 UDP 协议进行打洞，而不是 TCP 协议。

#### ICE

ICE (Interactive Connectivity Establishment) 交互式连接建立协议框架 是一种集成式 NAT 穿透技术框架，这个框架能让交互双端找到对方，并基于双方的 NAT 类型 建立连接。大致流程如下：

1. TCP 直接连接时，通过 HTTP 端口或 HTTPS 端口
2. UDP 直连时，使用 STUN (Session Traversal Utilities for NAT) 服务器做 地址转发
3. 间接连接时，使用 TURN (Traversal Using Relays around NAT) 服务器做流量中继。

ICE 的交互流程中，探测双方的 NAT 类型是由专门的 STUN 或 TURN 服务服完成的。

#### STUN/TURN 协议

**STUN**（**Session Traversal Utilities for NAT**，NAT 会话穿越应用程序）是一种 [网络协议](https://link.juejin.cn?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E7%25BD%2591%25E7%25BB%259C%25E5%258D%258F%25E8%25AE%25AE "https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE")，它允许位于 [NAT](https://link.juejin.cn?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E7%25BD%2591%25E7%25BB%259C%25E5%259C%25B0%25E5%259D%2580%25E8%25BD%25AC%25E6%258D%25A2 "https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2")（或多重 NAT）后的客户端找出自己的公网地址，查出自己位于哪种类型的 NAT 之后以及 NAT 为某一个本地端口所绑定的 Internet 端端口。这些信息被用来在两个同时处于 NAT 路由器之后的主机之间建立 UDP 通信。该协议由 [RFC 5389](https://link.juejin.cn?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc5389 "https://tools.ietf.org/html/rfc5389") 定义。

##### 方案

STUN 使用下列的 [算法](https://link.juejin.cn?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E6%25BC%2594%25E7%25AE%2597%25E6%25B3%2595 "https://zh.wikipedia.org/wiki/%E6%BC%94%E7%AE%97%E6%B3%95")（取自 RFC 3489）来发现 NAT 中间件以及防火墙（firewalls）:![[assets/61ee56e1f131f1b451c694ac8840ae67_MD5.webp]]

#### TURN

TURN 服务是为了解决 对称型 NAT 无法被穿越的问题， 此时需要使用 TURN 服务来转发流量。

位于对称型 NAT 之后的客户端需要先在 TURN 服务器上创建连接，然后告诉所有对端设备发包到这个服务器上，然后服务器再把包转发给这个客户端。并且 TURN 服务器通常是和 STUN 服务器成对出现的，当 STUN 判断 NAT 为对称型时，就会交由 TURN 处理。

## 参考

- [P2P连接原理简述 - 掘金 (juejin.cn)](https://juejin.cn/post/7362309246556995623?searchId=20240812160730D32A1AE22CEC39557590)
