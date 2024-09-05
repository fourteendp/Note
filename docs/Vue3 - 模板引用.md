---
title: Vue3 - 模板引用
uid: 20240123112806884
aliases: []
categories:
  - 前端/Vue3
tags: []
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:51:32
---

## 什么是模板引用

ref 是一个特殊的 attribute，和 v-for 章节中提到的 key 类似。它允许我们在一个特定的 DOM 元素或子组件

实例被挂载后，获得对它的直接引用。这可能很有用，比如说在组件挂载时将焦点设置到一个 input 元素上，或

在一个元素上初始化一个第三方库。

## Ref 的用法

### Ref 用在 DOM 元素上

```tsx
import { ComponentOptionsBase, ComponentPublicInstance, defineComponent, onMounted, ref } from "vue"
type EL =
  | ComponentPublicInstance<
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      false,
      ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>,
      {}
    >
  | Element
  | null
export default defineComponent({
  name: "TemplateRefs",
  meta: {
    title: "模板引用",
  },
  setup() {
    // 声明一个 ref 来存放该元素的引用
    // 必须和模板里的 ref 同名
    const inputRef = ref<HTMLInputElement | null>(null)

    onMounted(() => {
      // 在 mounted 时，获取该元素的引用
      // 通过 ref.value 获取
      console.log(inputRef.value) // { value: <input> }
    })

    // 列表渲染时，可以通过 ref 获取到每个元素的引用
    const list = $ref([1, 2, 3])
    const listRef = $ref<EL[]>([])

    onMounted(() => {
      console.log(listRef)
    })
    return () => (
      <div>
        <input ref={inputRef} placeholder="REF" />
        {list.map((item: number, index: number) => (
          <div
            ref={(el) => {
              listRef[index] = el
            }}
          >
            {item}
          </div>
        ))}
      </div>
    )
  },
})
```

### Ref 用在组件上

- 和 ref 用在 DOM 元素上的用法类似，只是 ref 的值是组件实例
