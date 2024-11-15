---
title: Vue3 - 计算属性
uid: 20240123112806870
aliases: []
categories:
  - 前端/Vue3
tags:
  - 前端
  - Vue3
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:44:26
---

## 什么是计算属性

- 依赖其他响应式数据的响应式数据
- 依赖的响应式数据发生变化，计算属性也会发生变化
- 计算属性的值是缓存的，只有依赖的响应式数据发生变化，计算属性的值才会重新计算
- 计算属性的值是只读的，不能直接修改

## 计算属性的使用

```ts
import { ref, computed } from "vue"

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)
    return {
      count,
      double,
    }
  },
}
```

## 计算属性的 setter

```ts
import { ref, computed } from "vue"

export default {
  setup() {
    const count = ref(0)
    const double = computed({
      get: () => count.value * 2,
      set: (val) => {
        count.value = val / 2
      },
    })
    return {
      count,
      double,
    }
  },
}
```
