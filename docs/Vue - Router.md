---
title: Vue - Router
uid: 20240123112807090
aliases: []
categories: []
tags:
  - 计算机/前端/JavaScript
  - 计算机/前端/Vue
  - 计算机/前端/Vue3
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:21
---

## Setup 中使用 router

```js
import { useRouter } from "vue-router"
// cosnt router = useRouter() // 无法使用
export default {
  setup() {
    const router = useRouter()
    return {
      router,
    }
  },
}
```

## 路由元信息类型提示

```js
router.d.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    showMenu?: boolean
  }
}
```
