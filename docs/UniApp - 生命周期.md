---
title: UniApp - 生命周期
uid: 20240123112807080
aliases: []
categories: []
tags:
  - 计算机/前端/JavaScript
  - 计算机/前端/uni-app
  - 计算机/前端/Vue/生命周期
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:22
---

## 生命周期执行顺序图示

> [!warning] 不同的环境运行可能有差异,下图为微信小程序执行图示

![[UniApp生命周期.drawio.svg]]

![[Pasted image 20220713154807.png]]

## 应用生命周期

- 详见 [应用生命周期 | uni-app官网](https://uniapp.dcloud.io/tutorial/page.html#lifecycle)

| 函数名               | 说明                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| onLaunch             | 当 uni\-app 初始化完成时触发（全局只触发一次）                               |
| onShow               | 当 uni\-app 启动，或从后台进入前台显示                                       |
| onHide               | 当 uni\-app 从前台进入后台                                                   |
| onError              | 当 uni\-app 报错时触发                                                       |
| onUniNViewMessage    | 对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯 \(opens new window\) |
| onUnhandledRejection | 对未处理的 Promise 拒绝事件监听函数（2\.8\.1\+）                             |
| onPageNotFound       | 页面不存在监听函数                                                           |
| onThemeChange        | 监听系统主题变化                                                             |

## 页面生命周期

- 详见 [页面生命周期 | uni-app官网](https://uniapp.dcloud.io/tutorial/page.html#lifecycle)

| 函数名                              | 说明                                                                                                                                                                                                                                                                                                     | 平台差异说明                                                                        | 最低版本  |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------- |
| onInit                              | 监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad                                                                                                                                                                                       | 百度小程序                                                                          | 3\.1\.0\+ |
| onLoad                              | 监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考示例                                                                                                                                                                                                                    |                                                                                     |           |
| onShow                              | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面                                                                                                                                                                                                                               |                                                                                     |           |
| onReady                             | 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发                                                                                                                                                                                                                                     |                                                                                     |           |
| onHide                              | 监听页面隐藏                                                                                                                                                                                                                                                                                             |                                                                                     |           |
| onUnload                            | 监听页面卸载                                                                                                                                                                                                                                                                                             |                                                                                     |           |
| onResize                            | 监听窗口尺寸变化                                                                                                                                                                                                                                                                                         | App、微信小程序、快手小程序                                                         |           |
| onPullDownRefresh                   | 监听用户下拉动作，一般用于下拉刷新，参考示例                                                                                                                                                                                                                                                             |                                                                                     |           |
| onReachBottom                       | 页面滚动到底部的事件（不是 scroll\-view 滚到底），常用于下拉下一页数据。具体见下方注意事项                                                                                                                                                                                                               |                                                                                     |           |
| onTabItemTap                        | 点击 tab 时触发，参数为 Object，具体见下方注意事项                                                                                                                                                                                                                                                       | 微信小程序、QQ 小程序、支付宝小程序、百度小程序、H5、App、快手小程序、京东小程序    |           |
| onShareAppMessage                   | 用户点击右上角分享                                                                                                                                                                                                                                                                                       | 微信小程序、QQ 小程序、支付宝小程序、字节小程序、飞书小程序、快手小程序、京东小程序 |           |
| onPageScroll                        | 监听页面滚动，参数为 Object                                                                                                                                                                                                                                                                              | nvue 暂不支持                                                                       |           |
| onNavigationBarButtonTap            | 监听原生标题栏按钮点击事件，参数为 Object                                                                                                                                                                                                                                                                | App、H5                                                                             |           |
| onBackPress                         | 监听页面返回，返回 event = \{from:backbutton、navigateBack\}，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack 表示来源是 uni\.navigateBack；详细说明及使用：onBackPress 详解 \(opens new window\)。支付宝小程序只有真机能触发，只能监听非 navigateBack 引起的返回，不可阻止默认行为。 | app、H5、支付宝小程序                                                               |           |
| onNavigationBarSearchInputChanged   | 监听原生标题栏搜索输入框输入内容变化事件                                                                                                                                                                                                                                                                 | App、H5                                                                             | 1\.6\.0   |
| onNavigationBarSearchInputConfirmed | 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的 " 搜索 " 按钮时触发。                                                                                                                                                                                                                               | App、H5                                                                             | 1\.6\.0   |
| onNavigationBarSearchInputClicked   | 监听原生标题栏搜索输入框点击事件（pages\.json 中的 searchInput 配置 disabled 为 true 时才会触发）                                                                                                                                                                                                        | App、H5                                                                             | 1\.6\.0   |
| onShareTimeline                     | 监听用户点击右上角转发到朋友圈                                                                                                                                                                                                                                                                           | 微信小程序                                                                          | 2\.8\.1\+ |
| onAddToFavorites                    | 监听用户点击右上角收藏                                                                                                                                                                                                                                                                                   | 微信小程序                                                                          | 2\.8\.1\+ |

## 组件生命周期

- 详见 [组件生命周期 | uni-app官网](https://uniapp.dcloud.io/tutorial/page.html#componentlifecycle)

| 函数名        | 说明                                                                                                                    | 平台差异说明   | 最低版本 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------- | -------- |
| beforeCreate  | 在实例初始化之前被调用。                                                                                                |                |          |
| created       | 在实例创建完成后被立即调用。                                                                                            |                |          |
| beforeMount   | 在挂载开始之前被调用。                                                                                                  |                |          |
| mounted       | 挂载到实例上去之后调用。注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用 $nextTickVue |                |          |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 打补丁之前。                                                                             | 仅 H5 平台支持 |          |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。详见                                                 | 仅 H5 平台支持 |          |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。详见                                                                      |                |          |
| destroyed     | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。        |                |          |
