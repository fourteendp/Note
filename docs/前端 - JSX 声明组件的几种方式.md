---
title: JSX 声明组件的几种方式
uid: 20240123112806930
aliases: []
categories: []
tags:
  - 计算机/前端/组件
  - 计算机/前端/JavaScript
  - 计算机/前端/Vue
  - 计算机/前端/Vue3
  - JSX
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:54
---

## `defineComponent` 声明组件

```tsx
import { defineComponent } from "vue"

export default defineComponent({
  name: "Home",
  setup(props) {
    return () => <div>Home</div>
  },
})
```

## 箭头函数声明组件

```tsx
export default () => <div>Home</div>
```
