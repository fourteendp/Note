---
title: 各类三维引擎综合概述 (OpenGL、DirectX、WebGL、UE4、U3D、ACIS、ParaSolid） - 编程小白
uid: 20240123112809280
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
originalUrl: https://bcxiaobai1.github.io/posts/2b69b7fb8e0cd0685d4e00efb81b627b/
createTime: 2023-12-31 08:05:48
updateTime: 2024-08-02 13:59:23
---

## 关于 OpenGL、DirectX、OpenCV

### OpenCV

OpenCV 是 Open Source Computer Vision Library 主要是提供图像处理和视频处理的基础算法库，还涉及一些机

器学习的算法。比如你想实现视频的降噪、运动物体的跟踪、目标（比如人脸）的识别这些都是 CV 的领域。它是

可以运行在 Linux、Window、和 Mac OS 操作系统上，它是轻量级而且很高效的。

### OpenGL

OpenGL 是 Open Graphics Library 是个定义了一个跨编程语言、跨平台的编程接口规格的专业的图形程序接口。

它用于三维图象（二维的亦可），是一个功能强大，调用方便的底层图形库。

### DirectX

DirectX 是 Direct eXtension 由微软开发，是许多种 API 的集合体，包含

Direct3D，Direct2D，DirectCompute，XAudio，XIput 等内容。DirectX 主要是面向游戏而开发的一系列硬件资

源调用的接口；它的接口范围比较 OpenGL 大

## OpenGL 与 DirectX 的区别

简单来说 DirectX 功能比 OpenGL 强大，OpenGL 主要是一个图形绘制库；从图形绘制技术的角度来说，他们都是

相对底层的技术；可以直接使用作为 3D 引擎使用，但是跟多时候，应用软件不会直接基于他们开发软件。而是基

于专用的三维引擎而开发。比如基于 UE4 三维游戏引擎开发一款游戏；基于 ACIS CAD 三维引擎而开发一款 CAD

三维制图软件等。

此外 OpenGL 与 DirectX 平台支持不同，DirectX 只能在 Windows XBOX 平台运行，而 OpenGL 是夸平台的。

## 常见的三维引擎

三维引擎按平台可分为客户端三维引擎，Web 端三维引擎；按用途可分为游戏三维引擎、CAD/CAM/CAE 三维引擎；

游戏引擎常见的有 UE4、U3D；CAD 工程用的三维引擎又分商用的还有开源的，商用的比较著名的有

ACIS、ParaSolid；开源的有 OCCT；这些三维引擎都是基于 DirectX 或 OpenGL 等底层之上构建的；他们才能真

正意义上的三维引擎；而 OpenGL 与 DirectX 只能称得上是图形绘制接口

而 Web 端的三维引擎主要有 Three.js、Babylon.js、Cesium.js 等，这些 B 端的三维引擎几乎基于 WebGL 而开

发的三维引擎，而 webGL 又是 OpenGL ES 的 B 端 API 封装集；这些 B 端引擎他们都有各自的应用场景，比如

Three.js 用于做效果展示、Babylon.js 用于游戏开发，Cesium.js 用于 GIS 开发；

最后为大家献上一张图，把上面介绍的关系说清楚

![](https://images2.imgbox.com/a6/99/xf7pEQrP_o.png)
