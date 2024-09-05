---
title: Flutter-速记
uid: 20240123112806916
aliases: []
categories: []
tags:
  - 计算机/前端/Flutter
archive: false
draft: false
todo: false
createTime: 2024-01-23 19:28:06
updateTime: 2024-08-09 16:42:14
---

## 其它

- Getx
- Bloc
- Rx

## 库

- Flutter_inappwebview
- Auto_route
- Image_picker
- File_picker
- Open_file
- Path_provider
- Dio

## 变量

类型声明再变量的前面

类型声明变量 = 变量值

Object 动态任意类型，**编译阶段**检查类型

Dynamic 动态任意类型，**编译阶段不检查**类型

Late 显式声明一个非空的变量，但不初始化

Var 没有初始值**可以**变成任何类型

Const 常量初始化时赋值

Final 后赋值只赋值一次

## Flutter 生命周期

![[Pasted image 20220922110031.png]]

![[Pasted image 20220922110153.png]]

## Widget

- [Flutter 系列（三）：Flutter 特点及常用 Widget 介绍 - 掘金](https://juejin.cn/post/7134343543975313445)
- [Flutter-常用Widget - 掘金](https://juejin.cn/post/7025196336253239303)

## 必备库

```yaml
dependencies:
  flutter:
    sdk: flutter
  get: ^4.6.6
  get_storage: ^2.1.1
  marqueer: ^1.4.5
  intl: ^0.19.0
  dio: ^5.5.0+1
  flutter_screenutil: ^5.9.3
  permission_handler: ^11.3.1
```

## 自定义字体

```yaml
flutter:
  uses-material-design: tru
  fonts:
  - family: HarmonyOS
    fonts:
      - asset: assets/fonts/HarmonyOS_Sans_SC_Black.ttf
      - asset: assets/fonts/HarmonyOS_Sans_SC_Bold.ttf
      - asset: assets/fonts/HarmonyOS_Sans_SC_Light.ttf
      - asset: assets/fonts/HarmonyOS_Sans_SC_Medium.ttf
      - asset: assets/fonts/HarmonyOS_Sans_SC_Regular.ttf
      - asset: assets/fonts/HarmonyOS_Sans_SC_Thin.ttf
```
