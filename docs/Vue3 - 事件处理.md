---
title: Vue3 - 事件处理
uid: 20240123112806880
aliases: []
categories:
  - 前端/Vue3
tags: []
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:50:45
---

## 事件修饰符

- .stop 阻止冒泡
- .prevent 阻止默认行为
- .capture 捕获阶段触发
- .self 只有事件在当前元素本身触发时才触发
- .once 只触发一次
- .passive 事件处理函数不会调用 `event.preventDefault()`，如果事件处理函数中调用了
  `event.preventDefault()`，则会报错
- .left 鼠标左键
- .right 鼠标右键
- .middle 鼠标中键
- .enter 回车键
- .tab tab 键
- .delete 删除键
- .esc esc 键
- .space 空格键
- .up 上箭头
- .down 下箭头
- .left 左箭头
- .right 右箭头
- .ctrl ctrl 键
- .alt alt 键
- .shift shift 键
- .meta meta 键
- .exact 精确匹配修饰符
- .keyCode 键盘码
- .native 监听组件根元素的原生事件
