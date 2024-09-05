---
title: JavaScript - Class 与 Style 绑定
uid: 20240123112806880
aliases: []
categories:
  - 编程语言/JavaScript
tags: []
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:49:41
---

```tsx
import { defineComponent } from "vue"

export default defineComponent({
  name: "ClassAndStyleBindings",
  meta: {
    title: "Class与Style绑定",
  },
  setup() {
    // class绑定对象
    let isActive = $ref(true)

    const swapText = $computed(() => (isActive ? "Active" : "Inactive"))
    return () => (
      <div>
        <div
          class={[{ "btn-secondary": isActive }, "btn"]}
          style={{
            color: isActive ? "red" : "blue",
          }}
          onClick={() => {
            isActive = !isActive
          }}
        >
          {swapText}
        </div>
      </div>
    )
  },
})
```
