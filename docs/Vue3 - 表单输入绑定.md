---
title: Vue3 - 表单输入绑定
uid: 20240123112806884
aliases: []
categories:
  - 前端/Vue3
tags: []
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:51:06
---

## 基础用法

```tsx
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const message = ref("Hello Vue3")
    return () => (
      <div>
        <input type="text" v-model={message.value} />
        <p>{message.value}</p>
      </div>
    )
  },
})
```

## 修饰符

- .lazy 只有在 `change` 事件触发时才更新
- .number 自动将用户的输入值转为 `Number` 类型
- .trim 自动过滤用户输入的首尾空格

```tsx
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const message = ref("Hello Vue3")
    return () => (
      <div>
        <input type="text" v-model={[message.value, { lazy: true }]} />
        <p>{message.value}</p>
      </div>
    )
  },
})
```

## 参考

- [Vue3 官方文档](https://v3.cn.vuejs.org/guide/forms.html)
