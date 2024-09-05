---
title: Vue3 - 条件和列表渲染
uid: 20240123112806880
aliases: 
categories:
  - 前端/Vue3
tags: 
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:49:50
---

## 什么是条件渲染

- 根据条件来决定是否渲染某个元素
- 有两种方式
  - v-if
    - JSX 中使用, 用三元表达式
  - v-show
- v-if 会根据条件来决定是否渲染元素
- v-show 会根据条件来决定元素的 display 属性

## 列表渲染

- v-for
- JSX 中使用, 用 map 方法

## 条件渲染的使用

```tsx
import { defineComponent } from "vue"

export default defineComponent({
  name: "ConditionalRendering",
  meta: {
    title: "条件和列表渲染",
  },
  setup() {
    let todos = $ref([
      { text: "Learn JavaScript" },
      { text: "Learn Vue" },
      { text: "Build something awesome" },
    ])
    const remove = (index: number) => {
      todos.splice(index, 1)
    }

    return () => (
      <div>
        {/* 条件渲染 */}
        {todos.length > 0 ? <div>有待办事项</div> : <div>没有待办事项</div>}
        {/* 列表渲染 */}
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.text}
              <button class={["btn"]} onClick={() => remove(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <div v-show={todos.length}>
          <button class={["btn"]}>添加</button>
        </div>
      </div>
    )
  },
})
```
