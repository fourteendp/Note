---
title: 深入浅出：gRPC 与 RPC 技术详解
uid: 1725506296081
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-09-05 11:18:16
updateTime: 2024-09-05 11:25:55
---

## **一、远程过程调用协议简介**

### **1、RPC 的本质**

首先，我们探讨一下什么是 **[RPC](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2Fapiskills%2Fintroduction-to-rpc-interfaces%2F "https://apifox.com/apiskills/introduction-to-rpc-interfaces/")**。RPC，缩写为 Remote Procedure Call Protocol，直译来看就是**远程过程调用协议**。

讲得通俗一些：

- RPC 是一种**通信机制**
- RPC 实现了**客户端/服务器**通信模型

官方的定义可能会这样解释：**它是一种协议，可以使程序能在网络上请求远程计算机上的服务，而无须关心底层网络技术细节。**

**RPC 的构架可以分为三个层次**：

- **用户与服务器（负责业务逻辑，并调用本地的存根程序）**
- **存根程序（Stub）（负责封装和解封装约定语法和语义）**
- **RPC 运行时（RPCRuntime）（管理网络通信的最底层）**

下面的示意图说明了典型的开发情景：**前端代码调用后端服务**

![RPC 示意图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f21fa664843147b9972d2ebbc1860ab0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=920&h=306&s=50502&e=png&b=fefefe)

### 2、RPC 解决的核心问题

RPC 的设计解决了几个关键问题：

- **协议一致性问题：** 举例来说，如何确保前端和后端能够就 "0 为是，1 为否 " 的约定达成共识。
- **传输协议的弹性：** 当面对网络错误、数据重传、丢失或性能瓶颈时，RPC 如何应对。
- **服务的发现机制：** 客户端应如何发现可用的服务器服务、访问哪个端口等。服务器可能会启动多个远程调用服务，监听在随机端口，客户端需要一种机制来探测这些服务。

### **3、RPC 的使用场景**

两个经典的应用示例包括：

- **即时通讯软件**
- **微服务架构**

### *4、RPC 的工作流程*\*

从调用到结果接收，RPC 的过程概述如下：

- 调用方（Client）发起本地调用式的远程请求；
- 客户端存根（Client stub）接收请求，将调用的方法名、参数等序列化为可网络传输的消息；
- 客户端存根发送序列化后的消息给服务端；
- 服务端存根（Server stub）接受消息并反序列化，以获取调用的方法名和参数；
- 服务端存根执行本地调用获取结果；
- 服务端返回执行结果给它的存根；
- 服务端存根序列化执行结果，发送回客户端；
- 客户端存根反序列化结果，并返回给客户端调用方；
- 调用方（Client）得到最终的 RPC 调用执行结果。

### 5、RPC 与 HTTP 的差异点

RPC 和 HTTP 对比不完全是同等级别的比较，更恰当的是将 RPC 和 "**HTTP + [RestFul](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2Fapiskills%2Frest-api%2F "https://apifox.com/apiskills/rest-api/")**" 放在一起对比。

#### **传输协议方面**

RPC 不限于 **[HTTP](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2Fapiskills%2Fthe-5-pillars-of-every-http-request%2F "https://apifox.com/apiskills/the-5-pillars-of-every-http-request/")**，它还可以选择 TCP 进行传输，而 HTTP 只工作在自身的协议之上。

#### **传输效率方面**

RPC 包含了 HTTP2 的特性，使得它在传输效率上优于标准的 HTTP1。

#### **性能消耗方面**

得益于 HTTP2 的特性（如二进制传输、头部压缩等），RPC 在性能上的消耗相较于 HTTP1 会更低。

#### **负载均衡方面**

大多数 RPC 框架自带负载均衡策略，而传统的 **[HTTP](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2Fapiskills%2Fhttp-vs-https%2F "https://apifox.com/apiskills/http-vs-https/")** 方案则通常需要通过 Nginx/HAProxy 等工具实现。

#### **服务治理方面**

RPC **[框架](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2Fapiskills%2Fcomparison-of-rpc-frameworks%2F "https://apifox.com/apiskills/comparison-of-rpc-frameworks/")** 能实现自动通知和服务调整，而 HTTP 则往往需要手动通知和修改配置。

### **1、gRPC 概述**

简单来说，**[gRPC](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2Fapiskills%2Fintroduction-to-grpc%2F "https://apifox.com/apiskills/introduction-to-grpc/")** 是一个开源的 RPC 框架，它建立在 HTTP2 的基础设施之上，因而自然具备了 HTTP2 的一系列优势：

- **二进制分帧的数据传输**
- **多路复用**
- **服务端推送**
- **头部压缩**

### 2、gRPC 的通信流程

如下图所示，通过 gRPC 进行远程服务调用时，客户端（client）仅需 gRPC 存根，通过 Proto Request 请求 gRPC 服务器，服务器则通过 Proto Response(s) 返回结果。

![gRPC 通信流程图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d20e9a7406c348dcbbbdc9bf862616e7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=740&h=458&s=60859&e=png&b=ffffff)

## **三、了解 JSON-RPC 接口**

JSON-RPC 是一种简洁的使用 JSON 格式数据的 RPC 传输协议，它通过 HTTP 进行通信。Postman 是 API 开发中常用的工具，能够轻松实现 JSON-RPC 接口的测试与使用。

## **四、如何调试 gRPC**

[**Apifox**](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2F "https://apifox.com/") 提供基于 .proto 文件的 gRPC 接口调试功能，支持包含一元调用和流式调用。项目创建时，选择「gRPC 项目」并导入 .proto 文件，即可开始调试，无需编写额外代码。

![Apifox gRPC 调试](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaa815a929714307b3cedd6754c9f018~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=830&s=107464&e=png&a=1&b=ffffff)

导入 .proto 文件之前，需要确认是否有其他依赖的.proto 文件，并添加相应的依赖路径。

![导入 .proto 文件](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dfabe8fa1514e67a5861b396d912455~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=830&s=100481&e=png&a=1&b=ffffff)

### **一元调用**

通过将 gRPC URL 填入地址栏并点击「调用」按钮，即可实现一元调用。

![一元调用](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b87d1b014e4f40d9b6f10a89bd00bf8e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=830&s=148045&e=png&a=1&b=fefefd)

### **流式调用**

流式调用包括服务端流、客户端流和双向流。调用成功后，用户可以在消息标签区编写并发送消息。Apifox 展示了时间线视图，按顺序分布显示调用状态、发送的消息和收到的消息。点击具体消息可以方便地查看详细信息。

![流式调用](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dbe8118d2464234bdee26f0da3c709e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1280&h=830&s=162333&e=png&a=1&b=fefefe)

**知识扩展：**

- **[REST API 简介 - RESTful Web 服务](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2Fapiskills%2Frest-api%2F "https://apifox.com/apiskills/rest-api/")**
- **[分布式系统框架对比：gRPC vs Dubbo](https://link.juejin.cn/?target=https%3A%2F%2Fapifox.com%2Fapiskills%2Fgrpc-vs-dubbo%2F "https://apifox.com/apiskills/grpc-vs-dubbo/")**
