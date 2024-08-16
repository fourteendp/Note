---
title: 防抖与节流模式 (Debounce & Throttle)
uid: 20240123112807532
aliases: []
categories: []
tags:
  - 计算机/设计模式/非GoF设计模式
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:18
---

## 防抖与节流模式 (Debounce & Throttle)

- 防抖：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
- 节流：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内
  某事件被触发多次，只有一次能生效
- 适用场景：搜索框搜索联想、窗口大小 resize、按钮提交表单、滚动加载更多等
