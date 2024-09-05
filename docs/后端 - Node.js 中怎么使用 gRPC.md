---
title: 后端 - Node.js 中怎么使用 gRPC
uid: 1724238118563
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-21 19:01:58
updateTime: 2024-09-05 11:17:49
---

[gRPC](https://apifox.com/blog/grpc-and-rpc-debugging/)（gRPC Remote Procedure Call）是一种高性能、开源、通用的远程过程调用框架。在 [Node.js](https://apifox.com/apiskills/how-to-install-nodejs/) 中，使用 gRPC 可以轻松构建分布式系统，实现跨语言通信。

![[assets/d5e5d562424eb40774e15429dd8fc320_MD5.png]]

gRPC 适用于需要高性能、低延迟和跨语言通信的场景。常见使用场景包括微服务架构、分布式系统、实时通信等。如果你的项目需要这些特性，并且希望通过定义服务接口和消息类型来进行强类型约定，那么 gRPC 是一个理想的选择。

## gRPC 基本概念

在开始之前，让我们先了解一些基本概念：

- **Protocol Buffers（ProtoBuf）**: gRPC 使用 ProtoBuf 作为其接口定义语言，用于定义服务接口和消息类型。
- **服务定义**： gRPC 通过 `.proto` 文件定义服务和消息。
- **客户端和服务端 Stub**: 自动生成的客户端和服务端 Stub 用于调用和实现 gRPC 服务。
- **四种服务类型**： gRPC 支持四种服务类型：Unary（一对一，或者称为一元流）、Server Streaming（服务器流）、Client Streaming（客户端流）和 Bidirectional Streaming（双向流）。

## gRPC 功能介绍

gRPC 提供了丰富的功能，包括认证、流控、拦截器等。以下是一些常用功能：

### 1\. 定义服务和消息

在 `.proto` 文件中定义服务和消息：

```protobuf
syntax = "proto3"; service Greeter { rpc SayHello (HelloRequest) returns (HelloResponse); } message HelloRequest { string name = 1; } message HelloResponse { string message = 1; }
```

### 2\. 生成 Stub

使用 Protocol Buffers 编译器生成客户端和服务端 Stub：

```bash
protoc -I=proto_dir --js_out=import_style=commonjs,binary:output_dir --grpc-web_out=import_style=commonjs,mode=grpcwebtext:output_dir service.proto
```

### 3\. 实现服务

在 Node.js 中实现 gRPC 服务：

```javascript
const grpc = require('grpc'); const protoLoader = require('@grpc/proto-loader'); const packageDefinition = protoLoader.loadSync('path/to/service.proto'); const service = grpc.loadPackageDefinition(packageDefinition).Greeter; const server = new grpc.Server(); server.addService(service, { SayHello: (call, callback) => { const response = { message: `Hello, ${call.request.name}!` }; callback(null, response); }, }); server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure()); server.start();
```

### 4\. 客户端调

用在 Node.js 中调用 gRPC 服务：

```javascript
const grpc = require('grpc'); const protoLoader = require('@grpc/proto-loader'); const packageDefinition = protoLoader.loadSync('path/to/service.proto'); const service = grpc.loadPackageDefinition(packageDefinition).Greeter; const client = new service('localhost:50051', grpc.credentials.createInsecure()); const request = { name: 'John' }; client.SayHello(request, (err, response) => { console.log(response.message); });
```

## 在 Node.js 中的实践案例

### 1\. 安装 gRPC 模块

首先，确保你的项目中已经安装了 gRPC 模块。可以使用 npm 进行安装：

```bash
npm install grpc npm install @grpc/proto-loader npm install @grpc/grpc-js npm install minimist
```

### 2\. 创建 .proto 文件

定义一个简单的服务，文件名为 `helloworld.proto`：

```protobuf
syntax = "proto3"; package helloworld; service Greeter { rpc SayHello (HelloRequest) returns (HelloReply) {} rpc SayHelloStreamReply (HelloRequest) returns (stream HelloReply) {} } message HelloRequest { string name = 1; } message HelloReply { string message = 1; }
```

### 3\. 生成 Stub

使用 Protocol Buffers 编译器生成客户端和服务端 Stub：

```bash
protoc -I=proto_dir --js_out=import_style=commonjs,binary:output_dir --grpc-web_out=import_style=commonjs,mode=grpcwebtext:output_dir calculator.proto
```

确保你的项目中有 `protoc` 工具。如果没有，可以通过 [这里](https://grpc.io/docs/protoc-installation/) 安装。

> 注：这一步可先忽略，安装 protoc 是为了避免了手动处理底层细节的麻烦

### 4\. 实现服务端

在 Node.js 中实现 gRPC 服务端，创建一个名为 `server.js` 文件：

```javascript
/* 服务端 */ var PROTO_PATH = __dirname + "/helloworld.proto"; var grpc = require("@grpc/grpc-js"); var protoLoader = require("@grpc/proto-loader"); var packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true, }); var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld; /** * Implements the SayHello RPC method. */ function sayHello(call, callback) { callback(null, { message: "Hello " + call.request.name }); } /** * Starts an RPC server that receives requests for the Greeter service at the * sample server port */ function main() { var server = new grpc.Server(); server.addService(hello_proto.Greeter.service, { sayHello: sayHello, // 新招呼 // sayHelloAgain: sayHelloAgain, }); server.bindAsync( "0.0.0.0:50051", // '127.0.0.1:8080', grpc.ServerCredentials.createInsecure(), () => { server.start(); } ); } main();
```

### 5\. 实现客户端

在 Node.js 中实现 gRPC 客户端，创建一个名为 `client.js` 文件：

```javascript
/* 客户端 */ var PROTO_PATH = __dirname + "/helloworld.proto"; var parseArgs = require("minimist"); var grpc = require("@grpc/grpc-js"); var protoLoader = require("@grpc/proto-loader"); var packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true, }); var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld; function main() { var argv = parseArgs(process.argv.slice(2), { string: "target", }); var target; if (argv.target) { target = argv.target; } else { target = "localhost:50051"; } var client = new hello_proto.Greeter( target, grpc.credentials.createInsecure() ); var user; if (argv._.length > 0) { user = argv._[0]; } else { user = "world"; } client.sayHello({ name: user }, function (err, response) { console.log("服务端消息：", response.message); }); } main();
```

### 6\. 运行代码

在 VSCode 中打开终端，分别运行服务端和客户端：

- 运行服务端：

```bash
node server.js
```

- 在新的终端窗口中运行客户端：

```bash
node client.js
```

确保你的系统中已经安装了 Node.js 和 npm。通过以上步骤，你可以在 VSCode 中运行 gRPC 示例代码。

![[assets/3783f67232b6cbe75a2e6d52c0f7abea_MD5.png]]

## 使用 Apifox 调试 gRPC

目前市面上能够兼容 gRPC 接口的接口调试与管理工具十分有限，而 gRPC 现已广泛应用于微服务架构中，并且可以预见的是，它会变得越来越流行。作为业界领先的接口管理工具，**[Apifox](https://apifox.com/) 现已上线 [gRPC 接口调试和管理](https://apifox.com/help/grpc) 能力**，全面兼容以下四种调用类型：

- Unary：一元调用
- Server Streaming：服务端流
- Client Streming：客户端流
- Bidirectional Streaming：双向流

下文将通过一个示例场景简要演示如何在 Apifox 中新建 [gRPC 项目](https://apifox.com/help/grpc) 并针对接口发起调试。

在 [Apifox](https://app.apifox.com/) 中点击 " 新建项目 " 按钮，选择 gRPC 类型，填写项目名称后轻点 " 新建 " 按钮。

![[assets/a29c13ce10540783ed17c192fd2898d3_MD5.png]]

导入定义 gRPC 接口所使用的服务、方法和消息的 `.proto` 文件。你可以将文件拖拽至其中或使用文件在线 URL 完成导入。

![[assets/a8f1018ced5fa900cdb4569ec8510f22_MD5.png]]

Apifox 将基于 .proto 文件内容生成对应的接口信息，然后就可以进行调试。

![[assets/54faa2fd2d0aaf93395a91a5eea3b6e7_MD5.png]]

## 提示、技巧和注意事项

- **版本兼容性**： 确保 Node.js 和 gRPC 库的版本兼容性。
- **错误处理**： 在客户端和服务端实现中进行适当的错误处理。
- **性能优化**： 使用 Streaming API 来提高性能，特别是在大数据传输场景下。
- **安全性**： 在生产环境中使用安全连接，考虑使用 SSL/TLS。

## 总结

使用 gRPC 在 [Node.js](https://apifox.com/apiskills/how-to-install-nodejs/) 中实现分布式系统是一种高效的方式。本文介绍了基本概念、功能、使用场景和实践案例，希望读者通过这些信息能够更轻松地在 Node.js 项目中集成和使用 [gRPC](https://apifox.com/help/grpc)。

***知识扩展：***

- ***[Node.js 中图片如何转为 base64 格式](https://apifox.com/apiskills/how-to-convert-image-to-base64-in-nodejs/)***
- ***[Node.js 中怎么进行图片压缩](https://apifox.com/apiskills/how-to-compress-image-in-nodejs/)***
- **[Protocol Buffers 编译器 (protoc)在 Windows 中怎么安装](https://apifox.com/apiskills/protocol-buffers-protoc-setup/)**

***参考链接：***

- *gRPC 官方文档：<https://grpc.io/docs/*>
- *Protocol Buffers 官方文档：<https://developers.google.com/protocol-buffers*>
