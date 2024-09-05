---
title: 深入剖析HTTP3协议
uid: 1724921749615
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-29 16:55:49
updateTime: 2024-08-29 16:56:24
---

自 2017 年起 HTTP3 协议已发布了 29 个 Draft，推出在即，Chrome、Nginx 等软件都在跟进实现最新的草案。本文将介绍 HTTP3 协议规范、应用场景及实现原理。

2015 年 HTTP2 协议正式推出后，已经有接近一半的互联网站点在使用它：

![[assets/892ef39048464208f61a6ef38348057d_MD5.png]]

HTTP2 协议虽然大幅提升了 HTTP/1.1 的性能，然而，基于 TCP 实现的 HTTP2 遗留下 3 个问题：

- 有序 [字节流](https://zhida.zhihu.com/search?q=%E5%AD%97%E8%8A%82%E6%B5%81&zhida_source=entity&is_preview=1) 引出的**队头阻塞**（[Head-of-line blocking](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Head-of-line_blocking)），使得 HTTP2 的 [多路复用](https://zhida.zhihu.com/search?q=%E5%A4%9A%E8%B7%AF%E5%A4%8D%E7%94%A8&zhida_source=entity&is_preview=1) 能力大打折扣；
- **TCP 与 TLS 叠加了握手时延**，建链时长还有 1 倍的下降空间；
- 基于 TCP 四元组确定一个连接，这种诞生于有线网络的设计，并不适合移动状态下的无线网络，这意味着**IP 地址的频繁变动会导致 TCP 连接、TLS 会话反复握手，**成本高昂。

HTTP3 协议解决了这些问题：

- HTTP3 基于 UDP 协议重新定义了连接，在 QUIC 层实现了无序、并发字节流的传输，解决了队头阻塞问题（包括基于 QPACK 解决了动态表的队头阻塞）；
- HTTP3 重新定义了 TLS 协议加密 QUIC 头部的方式，既提高了网络攻击成本，又降低了建立连接的速度（仅需 1 个 RTT 就可以同时完成建链与密钥协商）；
- HTTP3 将 Packet、QUIC Frame、HTTP3 Frame 分离，实现了连接迁移功能，降低了 5G 环境下高速移动设备的连接维护成本。

本文将会从 HTTP3 协议的概念讲起，从连接迁移的实现上学习 HTTP3 的报文格式，再围绕着队头阻塞问题来分析多路复用与 QPACK 动态表的实现。虽然正式的 RFC 规范还未推出，但最近的草案 Change 只有微小的变化，所以现在学习 HTTP3 正当其时，这将是下一代互联网最重要的基础设施。

___

就像 HTTP2 协议一样，HTTP3 并没有改变 HTTP1 的语义。那什么是 HTTP 语义呢？在我看来，它包括以下 3 个点：

- 请求只能由客户端发起，而服务器针对每个请求返回一个响应；
- 请求与响应都由 Header、Body（可选）组成，其中请求必须含有 URL 和方法，而响应必须含有响应码；
- Header 中各 Name 对应的含义保持不变。

HTTP3 在保持 HTTP1 语义不变的情况下，更改了编码格式，这由 2 个原因所致：首先，是为了减少编码长度。下图中 HTTP1 协议的编码使用了 ASCII 码，用空格、冒号以及\\r\\n 作为 [分隔符](https://zhida.zhihu.com/search?q=%E5%88%86%E9%9A%94%E7%AC%A6&zhida_source=entity&is_preview=1)，编码效率很低：

![[assets/22eef1f785e37c67020b83cf04418575_MD5.png]]

HTTP2 与 HTTP3 采用二进制、静态表、动态表与 Huffman 算法对 HTTP Header 编码，不只提供了高压缩率，还加快了发送端编码、接收端解码的速度。

其次，由于 HTTP1 协议不支持多路复用，这样 [高并发](https://zhida.zhihu.com/search?q=%E9%AB%98%E5%B9%B6%E5%8F%91&zhida_source=entity&is_preview=1) 只能通过多开一些 TCP 连接实现。然而，通过 TCP 实现高并发有 3 个弊端：

- 实现成本高。TCP 是由操作系统内核实现的，如果通过多线程实现并发，并发线程数不能太多，否则线程间切换成本会以指数级上升；如果通过异步、非阻塞 socket 实现并发，开发效率又太低；
- 每个 TCP 连接与 TLS 会话都叠加了 2-3 个 RTT 的建链成本；
- TCP 连接有一个防止出现拥塞的 [慢启动](https://zhida.zhihu.com/search?q=%E6%85%A2%E5%90%AF%E5%8A%A8&zhida_source=entity&is_preview=1) 流程，它会对每个 TCP 连接都产生减速效果。

因此，HTTP2 与 HTTP3 都在应用层实现了多路复用功能：

![[assets/008fef3161cee6e9f613995495df5bcf_MD5.png]]

HTTP2 协议基于 TCP 有序字节流实现，因此**应用层的多路复用并不能做到无序地并发，在丢包场景下会出现队头阻塞问题**。如下面的动态图片所示，服务器返回的绿色响应由 5 个 TCP 报文组成，而黄色响应由 4 个 TCP 报文组成，当第 2 个黄色报文丢失后，即使客户端接收到完整的 5 个绿色报文，但 TCP 层不会允许应用进程的 read 函数读取到最后 5 个报文，并发成了一纸空谈：

![[assets/1e5bde0b87abcc807f32f5b3767e99ec_MD5.gif]]

当网络繁忙时，丢包概率会很高，多路复用受到了很大限制。因此，**HTTP3 采用 UDP 作为 [传输层](https://zhida.zhihu.com/search?q=%E4%BC%A0%E8%BE%93%E5%B1%82&zhida_source=entity&is_preview=1) 协议，重新实现了无序连接，并在此基础上通过有序的 QUIC Stream 提供了多路复用**，如下图所示：

![[assets/a1e788f42c0ae018a1489264add38664_MD5.png]]

最早这一实验性协议由 Google 推出，并命名为 gQUIC，因此，IETF 草案中仍然保留了 QUIC 概念，用来描述 HTTP3 协议的传输层和表示层。HTTP3 协议规范由以下 5 个部分组成：

- QUIC 层由 [https://tools.ietf.org/html/draft-ietf-quic-transport-29](https://link.zhihu.com/?target=https%3A//datatracker.ietf.org/doc/html/draft-ietf-quic-transport-29) 描述，它定义了连接、报文的可靠传输、有序字节流的实现；
- TLS 协议会将 QUIC 层的部分报文头部暴露在明文中，方便 [代理服务器](https://zhida.zhihu.com/search?q=%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8&zhida_source=entity&is_preview=1) 进行路由。[https://tools.ietf.org/html/draft-ietf-quic-tls-29规范定义了QUIC与TLS的结合方式；](https://link.zhihu.com/?target=https%3A//tools.ietf.org/html/draft-ietf-quic-tls-29%25E8%25A7%2584%25E8%258C%2583%25E5%25AE%259A%25E4%25B9%2589%25E4%25BA%2586QUIC%25E4%25B8%258ETLS%25E7%259A%2584%25E7%25BB%2593%25E5%2590%2588%25E6%2596%25B9%25E5%25BC%258F%25EF%25BC%259B)
- 丢包检测、RTO 重传定时器预估等功能由 [https://tools.ietf.org/html/draft-ietf-quic-recovery-29](https://link.zhihu.com/?target=https%3A//tools.ietf.org/html/draft-ietf-quic-recovery-29) 定义，目前拥塞控制使用了类似 TCP New RENO 的算法，未来有可能更换为基于带宽检测的算法（例如 BBR）；
- 基于以上 3 个规范，[https://tools.ietf.org/html/draft-ietf-quic-http-29定义了HTTP语义的实现，包括服务器推送、请求响应的传输等；](https://link.zhihu.com/?target=https%3A//tools.ietf.org/html/draft-ietf-quic-http-29%25E5%25AE%259A%25E4%25B9%2589%25E4%25BA%2586HTTP%25E8%25AF%25AD%25E4%25B9%2589%25E7%259A%2584%25E5%25AE%259E%25E7%258E%25B0%25EF%25BC%258C%25E5%258C%2585%25E6%258B%25AC%25E6%259C%258D%25E5%258A%25A1%25E5%2599%25A8%25E6%258E%25A8%25E9%2580%2581%25E3%2580%2581%25E8%25AF%25B7%25E6%25B1%2582%25E5%2593%258D%25E5%25BA%2594%25E7%259A%2584%25E4%25BC%25A0%25E8%25BE%2593%25E7%25AD%2589%25EF%25BC%259B)
- 在 HTTP2 中，由 HPACK 规范定义 HTTP 头部的 [压缩算法](https://zhida.zhihu.com/search?q=%E5%8E%8B%E7%BC%A9%E7%AE%97%E6%B3%95&zhida_source=entity&is_preview=1)。由于 HPACK 动态表的更新具有时序性，无法满足 HTTP3 的要求。在 HTTP3 中，QPACK 定义 HTTP 头部的编码：[https://tools.ietf.org/html/draft-ietf-quic-qpack-16](https://link.zhihu.com/?target=https%3A//datatracker.ietf.org/doc/html/draft-ietf-quic-qpack-16)。注意，以上规范的最新草案都到了 29，而 QPACK 相对简单，它目前更新到 16。

自 1991 年诞生的 HTTP/0.9 协议已不再使用，**但 1996 推出的 HTTP/1.0、1999 年推出的 HTTP/1.1、2015 年推出的 HTTP2 协议仍然共存于互联网中（HTTP/1.0 在企业内网中还在广为使用，例如 Nginx 与上游的默认协议还是 1.0 版本），即将面世的 HTTP3 协议的加入，将会进一步增加协议适配的复杂度**。接下来，我们将深入 HTTP3 协议的细节。

___

## 连接迁移功能是怎样实现的？

对于当下的 HTTP1 和 HTTP2 协议，传输请求前需要先完成耗时 1 个 RTT 的 TCP 三次握手、耗时 1 个 RTT 的 TLS 握手（TLS1.3），**由于它们分属内核实现的传输层、openssl 库实现的表示层，所以难以合并在一起**，如下图所示：

![[assets/9af5bf794ad8c48fa48835c5dde2aae1_MD5.png]]

在 IoT 时代，移动设备接入的网络会频繁变动，从而导致设备 IP 地址改变。**对于通过四元组（源 IP、源端口、目的 IP、目的端口）定位连接的 TCP 协议来说，这意味着连接需要断开重连，所以上述 2 个 RTT 的建链时延、TCP 慢启动都需要重新来过**。而 HTTP3 的 QUIC 层实现了连接迁移功能，允许移动设备更换 IP 地址后，只要仍保有上下文信息（比如连接 ID、TLS 密钥等），就可以复用原连接。

在 UDP 报文头部与 HTTP 消息之间，共有 3 层头部，定义连接且实现了 Connection Migration 主要是在 Packet Header 中完成的，如下图所示：

![[assets/a656611b65c4db5fa99c5df5e35bc709_MD5.png]]

这 3 层 Header 实现的功能各不相同：

- Packet Header 实现了可靠的连接。当 UDP 报文丢失后，通过 Packet Header 中的 Packet Number 实现报文重传。连接也是通过其中的 Connection ID 字段定义的；
- QUIC Frame Header 在无序的 Packet 报文中，基于 QUIC Stream 概念实现了有序的字节流，这允许 HTTP 消息可以像在 TCP 连接上一样传输；
- HTTP3 Frame Header 定义了 HTTP Header、Body 的格式，以及服务器推送、QPACK 编解码流等功能。
- 为了进一步提升网络传输效率，Packet Header 又可以细分为两种：
- Long Packet Header 用于首次建立连接；
- Short Packet Header 用于日常传输数据。

其中，Long Packet Header 的格式如下图所示：

![[assets/5a530aeb8294842508d343d2104e9560_MD5.png]]

建立连接时，连接是由服务器通过 Source Connection ID 字段分配的，这样，后续传输时，双方只需要固定住 Destination Connection ID，就可以在客户端 IP 地址、端口变化后，绕过 UDP 四元组（与 TCP 四元组相同），实现连接迁移功能。下图是 Short Packet Header 头部的格式，这里就不再需要传输 Source Connection ID 字段了：

![[assets/eaa9290024152b2830411224868093d0_MD5.png]]

上图中的 Packet Number 是每个报文独一无二的序号，基于它可以实现丢失报文的精准重发。如果你通过抓包观察 Packet Header，会发现 Packet Number 被 TLS 层加密保护了，这是为了防范各类网络攻击的一种设计。下图给出了 Packet Header 中被加密保护的字段：

![[assets/3ba229f57235f6d9d4279a9c644fa214_MD5.png]]

其中，显示为 E（Encrypt）的字段表示被 TLS 加密过。当然，Packet Header 只是描述了最基本的连接信息，其上的 Stream 层、HTTP 消息也是被加密保护的：

![[assets/e73ff6352d3c5d0ff3b481563a720c48_MD5.png]]

现在我们已经对 HTTP3 协议的格式有了基本的了解，接下来我们通过队头阻塞问题，看看 Packet 之上的 QUIC Frame、HTTP3 Frame 帧格式。

___

## Stream 多路复用时的队头阻塞是怎样解决的？

其实，解决队头阻塞的方案，就是允许微观上有序发出的 Packet 报文，在接收端无序到达后也可以应用于并发请求中。比如上文的动态图中，如果丢失的黄色报文对其后发出的绿色报文不造成影响，队头阻塞问题自然就得到了解决：

![[assets/1e5bde0b87abcc807f32f5b3767e99ec_MD5.gif]]

在 Packet Header 之上的 QUIC Frame Header，定义了有序字节流 Stream，而且 Stream 之间可以实现真正的并发。HTTP3 的 Stream，借鉴了 HTTP2 中的部分概念，所以在讨论 QUIC Frame Header 格式之前，我们先来看看 HTTP2 中的 Stream 长成什么样子：

![[assets/f80a4681a0a1d2d65dca1980345b3e71_MD5.png]]

每个 Stream 就像 HTTP1 中的 TCP 连接，它保证了承载的 HEADERS frame（存放 HTTP Header）、DATA frame（存放 HTTP Body）是有序到达的，多个 Stream 之间可以并行传输。在 HTTP3 中，上图中的 HTTP2 frame 会被拆解为两层，我们先来看底层的 QUIC Frame。

一个 Packet 报文中可以存放多个 QUIC Frame，当然所有 Frame 的长度之和不能大于 PMTUD（Path Maximum Transmission Unit Discovery，这是大于 1200 字节的值），你可以把它与 IP 路由中的 MTU 概念对照理解：

![[assets/c86ad4deec37ab2086be38cda5639081_MD5.png]]

每一个 Frame 都有明确的类型：

![[assets/2e9fc17608387877b1a09e84cf325cd5_MD5.png]]

前 4 个字节的 Frame Type 字段描述的类型不同，接下来的编码也不相同，下表是各类 Frame 的 16 进制 Type 值：

![[assets/1b167e7d14483b03f4d002ed3ca74f68_MD5.png]]

在上表中，我们只要分析 0x08-0x0f 这 8 种 STREAM 类型的 Frame，就能弄明白 Stream 流的实现原理，自然也就清楚队头阻塞是怎样解决的了。Stream Frame 用于传递 HTTP 消息，它的格式如下所示：

![[assets/80799ae19764ce7aa8567a36b0f5ba69_MD5.png]]

可见，Stream Frame 头部的 3 个字段，完成了多路复用、有序字节流以及报文段层面的二进制分隔功能，包括：

- Stream ID 标识了一个有序字节流。当 HTTP Body 非常大，需要跨越多个 Packet 时，只要在每个 Stream Frame 中含有同样的 Stream ID，就可以传输任意长度的消息。多个并发传输的 HTTP 消息，通过不同的 Stream ID 加以区别；
- 消息 [序列化](https://zhida.zhihu.com/search?q=%E5%BA%8F%E5%88%97%E5%8C%96&zhida_source=entity&is_preview=1) 后的 " 有序 " 特性，是通过 Offset 字段完成的，它类似于 TCP 协议中的 Sequence 序号，用于实现 Stream 内多个 Frame 间的累计确认功能；
- Length 指明了 Frame 数据的长度。

你可能会奇怪，为什么会有 8 种 Stream Frame 呢？这是因为 0x08-0x0f 这 8 种类型其实是由 3 个二进制位组成，它们实现了以下 3 标志位的组合：

- 第 1 位表示是否含有 Offset，当它为 0 时，表示这是 Stream 中的起始 Frame，这也是上图中 Offset 是可选字段的原因；
- 第 2 位表示是否含有 Length 字段；
- 第 3 位 Fin，表示这是 Stream 中最后 1 个 Frame，与 HTTP2 协议 Frame 帧中的 FIN 标志位相同。

Stream 数据中并不会直接存放 HTTP 消息，因为 HTTP3 还需要实现服务器推送、权重优先级设定、[流量控制](https://zhida.zhihu.com/search?q=%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6&zhida_source=entity&is_preview=1) 等功能，所以 Stream Data 中首先存放了 HTTP3 Frame：

![[assets/431b01276ee3ba1519a3719ab50f3ffb_MD5.png]]

其中，Length 指明了 HTTP 消息的长度，而 Type 字段（请注意，低 2 位有特殊用途，在 QPACK 章节中会详细介绍）包含了以下类型：

- 0x00：DATA 帧，用于传输 HTTP Body 包体；
- 0x01：HEADERS 帧，通过 QPACK 编码，传输 HTTP Header 头部；
- 0x03：CANCEL\_PUSH 控制帧，用于取消 1 次服务器推送消息，通常客户端在收到 PUSH\_PROMISE 帧后，通过它告知服务器不需要这次推送；
- 0x04：SETTINGS 控制帧，设置各类通讯参数；
- 0x05：PUSH\_PROMISE 帧，用于服务器推送 HTTP Body 前，先将 HTTP Header 头部发给客户端，流程与 HTTP2 相似；
- 0x07：GOAWAY 控制帧，用于关闭连接（注意，不是关闭 Stream）；
- 0x0d：MAX\_PUSH\_ID，客户端用来限制服务器推送消息数量的控制帧。

总结一下，QUIC Stream Frame 定义了有序字节流，且多个 Stream 间的传输没有时序性要求，这样，HTTP 消息基于 QUIC Stream 就实现了真正的多路复用，队头阻塞问题自然就被解决掉了。

___

## QPACK 编码是如何解决队头阻塞问题的？

最后，我们再看下 HTTP Header 头部的编码方式，它需要面对另一种队头阻塞问题。

与 HTTP2 中的 HPACK 编码方式相似，HTTP3 中的 QPACK 也采用了静态表、动态表及 Huffman 编码：

![[assets/20af5d345e37c2cb74e6e51597202931_MD5.png]]

先来看静态表的变化。在上图中，GET 方法映射为数字 2，这是通过客户端、服务器协议实现层的 [硬编码](https://zhida.zhihu.com/search?q=%E7%A1%AC%E7%BC%96%E7%A0%81&zhida_source=entity&is_preview=1) 完成的。在 HTTP2 中，共有 61 个静态表项：

![[assets/38e45c3938cb01b847a0f4077fc0c209_MD5.png]]

而在 QPACK 中，则上升为 98 个静态表项，比如 Nginx 上的 ngx\_htt\_v3\_static\_table 数组所示：

![[assets/0d0fb43624286c71e5361f440ec669b1_MD5.png]]

你也可以从 [这里](https://link.zhihu.com/?target=https%3A//datatracker.ietf.org/doc/html/draft-ietf-quic-qpack-14%23appendix-A) 找到完整的 HTTP3 静态表。对于 Huffman 以及整数的编码，QPACK 与 HPACK 并无多大不同，但动态表编解码方式差距很大。

所谓动态表，就是将未包含在静态表中的 Header 项，在其首次出现时加入动态表，这样后续传输时仅用 1 个数字表示，大大提升了编码效率。因此，动态表是天然具备时序性的，如果首次出现的请求出现了丢包，后续请求解码 HPACK 头部时，一定会被阻塞！

QPACK 是如何解决队头阻塞问题的呢？事实上，QPACK 将动态表的编码、解码独立在单向 Stream 中传输，仅当单向 Stream 中的动态表编码成功后，接收端才能解码双向 Stream 上 HTTP 消息里的动态表索引。

我们又引入了单向 Stream 和双向 Stream 概念，不要头疼，它其实很简单。单向指只有一端可以发送消息，双向则指两端都可以发送消息。还记得上一小节的 QUIC Stream Frame 头部吗？其中的 Stream ID 别有玄机，除了标识 Stream 外，它的低 2 位还可以表达以下组合：

![[assets/18b80ac186d2d7b68cb7878f094ca1c8_MD5.png]]

因此，当 Stream ID 是 0、4、8、12 时，这就是客户端发起的双向 Stream（HTTP3 不支持服务器发起双向 Stream），它用于传输 HTTP 请求与响应。单向 Stream 有很多用途，所以它在数据前又多出一个 Stream Type 字段：

![[assets/6be4618f0fb573e8f2cd9c7f18df35de_MD5.png]]

Stream Type 有以下取值：

- 0x00：控制 Stream，传递各类 Stream 控制消息；
- 0x01：服务器推送消息；
- 0x02：用于编码 QPACK 动态表，比如面对不属于静态表的 HTTP 请求头部，客户端可以通过这个 Stream 发送动态表编码；
- 0x03：用于通知编码端 QPACK 动态表的更新结果。

由于 HTTP3 的 STREAM 之间是乱序传输的，因此，若先发送的编码 Stream 后到达，双向 Stream 中的 QPACK 头部就无法解码，此时传输 HTTP 消息的双向 Stream 就会进入 Block 阻塞状态（两端可以通过控制帧定义阻塞 Stream 的处理方式）。

___

## 小结

最后对本文内容做个小结。

基于四元组定义连接并不适用于下一代 IoT 网络，HTTP3 创造出 Connection ID 概念实现了连接迁移，通过融合传输层、表示层，既缩短了握手时长，也加密了传输层中的绝大部分字段，提升了网络安全性。

HTTP3 在 Packet 层保障了连接的可靠性，在 QUIC Frame 层实现了有序字节流，在 HTTP3 Frame 层实现了 HTTP 语义，这彻底解开了队头阻塞问题，真正实现了应用层的多路复用。

QPACK 使用独立的单向 Stream 分别传输动态表编码、解码信息，这样乱序、并发传输 HTTP 消息的 Stream 既不会出现队头阻塞，也能基于时序性大幅压缩 HTTP Header 的体积。

在下一篇文章中，我将介绍如何基于 Nginx 搭建 HTTP3 Web 服务。

___

## **更多资源**

想要更及时全面地获取 NGINX 相关的技术干货、互动问答、系列课程、活动资源？请前往 NGINX 开源社区：

\- 官网：<u><a href="https://link.zhihu.com/?target=http%3A//nginx.org.cn/" target="_blank" rel="nofollow noreferrer">nginx.org.cn</a></u>

\- [微信公众号](https://zhida.zhihu.com/search?q=%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7&zhida_source=entity&is_preview=1)：<u><a href="https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/XVE5yvDbmJtpV2alsIFwJg" target="_blank" rel="nofollow noreferrer"><span>https://</span><span>mp.weixin.qq.com/s/XVE5</span><span>yvDbmJtpV2alsIFwJg</span><span></span></a></u>

\- [微信群](https://zhida.zhihu.com/search?q=%E5%BE%AE%E4%BF%A1%E7%BE%A4&zhida_source=entity&is_preview=1)：<u><a href="https://link.zhihu.com/?target=https%3A//www.nginx.org.cn/static/pc/images/homePage/QR-code.png%3Fv%3D1621313354" target="_blank" rel="nofollow noreferrer"><span>https://www.</span><span>nginx.org.cn/static/pc/</span><span>images/homePage/QR-code.png?v=1621313354</span><span></span></a></u>

\- B 站：<u><a href="https://link.zhihu.com/?target=https%3A//space.bilibili.com/628384319" target="_blank" rel="nofollow noreferrer"><span>https://</span><span>space.bilibili.com/6283</span><span>84319</span><span></span></a></u>
