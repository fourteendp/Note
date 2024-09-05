---
title: Vue3 新增特性
uid: 20240123112807096
aliases: []
categories: []
tags:
  - 计算机/前端/JavaScript
  - 计算机/前端/Vue
  - 计算机/前端/Vue3
  - 新特性
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:51
---

## 新特性

- 更好的 TypeScript 支持

### Setup 语法糖

- 使用语法糖，可以省略 `<script setup>` 标签，直接在 `<script>` 标签中使用 `setup` 函数。

```html
<script setup>
  import { ref, onMounted } from "vue"
  const count = ref(0)
  // ...
</script>
```

- 不使用语法糖

```html
  <script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const count = ref(0)
      return {
        count
      }
      // ...
    }
  }
```

### Composition API(组合式 API)

- 相比于 Options API，Composition API 更加灵活，更加符合函数式编程的思想。万物皆是函数，函数是一等公
  民。

```html
<script setup>
  import { ref, onMounted } from "vue"

  // 响应式状态
  const count = ref(0)

  // 更改状态、触发更新的函数
  function increment() {
    count.value++
  }

  // 生命周期钩子
  onMounted(() => {
    console.log(`计数器初始值为 ${count.value}。`)
  })
</script>

<template>
  <button @click="increment">点击了：{{ count }} 次</button>
</template>
```

![[Pasted image 20221212145551.png]]

### Teleport(传送门)

- Teleport 可以将组件渲染到 DOM 树的任意位置，而不是其父组件的位置。
- 常用于弹窗、模态框等组件，可以将组件渲染到 body 标签下，避免样式污染。

```html
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

### Fragments(片段)

- Fragments 可以让我们在模板中渲染多个根节点，而不是一个根节点。
- 通常情况下，我们需要在模板中渲染一个根节点，但是有时候我们需要渲染多个根节点，这时候就可以使用
  Fragments。

```html
<template>
  <Fragment>
    <h1>标题</h1>
    <p>内容</p>
  </Fragment>
</template>
```

### Emits 组件选项

- Emits 组件选项可以让我们在组件中声明组件可以触发的事件。

```html
<template>
  <button @click="onClick">Click Me</button>
</template>

<script setup>
  import { emit } from "vue"

  const onClick = () => {
    emit("click")
  }

  export default {
    emits: ["click"],
  }
</script>
```

### 单文件组件中的状态驱动的 CSS 变量 (\<style\> 中的 v-bind)

- 在单文件组件中，我们可以在 `<style>` 标签中使用 `v-bind` 绑定组件的状态，从而实现状态驱动的 CSS 变
  量。

```html
<template>
  <div class="text">hello</div>
</template>

<script>
  export default {
    data() {
      return {
        color: "red",
      }
    },
  }
</script>

<style>
  .text {
    color: v-bind(color);
  }
</style>
```

- 这个语法同样也适用于 \<script setup\>，且支持 JavaScript 表达式 (需要用引号包裹起来)

```html
<script setup>
  const theme = {
    color: "red",
  }
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
  p {
    color: v-bind("theme.color");
  }
</style>
```

### SFC \<style scoped\> 新增全局规则和针对插槽内容的规则

- 在单文件组件中，我们可以在 `<style scoped>` 标签中使用 `::v-deep` 选择器，从而实现针对插槽内容的样
  式。
- 在 Vue 3.2 中，我们可以使用 `::v-global` 选择器，从而实现全局样式。
- 两个选择器都可以和 `/deep/` 选择器一样，用于针对插槽内容的样式。
- 两个选择器都可以和 `>>>` 选择器一样，用于全局样式。

```html
<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  color: red;
}

.container::v-deep p {
  color: blue;
}

.container::v-global p {
  color: green;
}

.container /deep/ p {
  color: blue;
}

.container >>> p {
  color: green;
}

.container p {
  color: red;
}

p {
  color: red;
}

```

### 自定义渲染器 API

- 自定义渲染器 API 可以让我们自定义渲染器的行为，比如自定义渲染器的渲染函数。

### Suspense(悬念) 实现性

- Suspense 可以让我们在异步组件加载时显示一个自定义的 loading 状态，而不是显示一个空白的组件。

```html
<template>
  <Suspense>
    <template [[default]]>
      <AsyncComponent />
    </template>
    <template [[fallback]]>
      <div>loading...</div>
    </template>
  </Suspense>
</template>
```
