---
title: WebRTC（Web Real-Time Communications）简介
uid: 1722837151790
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-05 13:52:31
updateTime: 2024-08-12 16:27:29
---

WebRTC（Web Real-Time Communications）是一种技术，它允许在浏览器中实现音视频通话和数据共享，无需安装任何插件或第三方软件。它支持 [[P2P 点对点技术原理|点对点（P2P）]] 连接，可以减少延迟并提高效率，适用于视频会议、在线教育、远程医疗等场景 。

实现 WebRTC 应用时，你需要关注几个关键概念和技术：

1. **RTCPeerConnection** 接口：表示本地与远程对等方之间的 WebRTC 连接，用于处理数据流式传输。
2. **MediaStream** 接口：表示音视频媒体流，可以包含多个音视频轨道。
3. **RTCDataChannel** 接口：允许在对等方之间打开通道，通过该通道可以发送和接收任意数据。
4. **信令（Signaling）**：WebRTC 对等方需要通过信令交换网络和媒体信息，通常通过 WebSocket 或其他信令服务器实现。
5. **STUN/TURN 服务器**：帮助处理 NAT 穿透问题，确保不同网络环境下的对等方可以建立连接。

WebRTC 的实现通常涉及以下步骤：

- 使用 `navigator.mediaDevices.getUserMedia()` 获取本地音视频流。
- 创建 `RTCPeerConnection` 实例并配置所需的音视频轨道。
- 通过信令服务器交换必要的信令信息，包括 SDP 描述和 ICE 候选。
- 监听 `RTCPeerConnection` 事件，处理连接状态变化和远程媒体流的接收。

在实际开发中，可能还会使用 `adapter.js` 库来解决不同浏览器之间的兼容性问题 。
