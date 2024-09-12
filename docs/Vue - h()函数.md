---
title: Vue - h()函数
uid: 1722908570706
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-06 09:42:50
updateTime: 2024-09-12 08:13:22
---

在 Vue.js 中，`h()` 函数是一个全局 API，用于创建虚拟 DOM 节点。这个函数在 Vue 3 中引入，用以替代 Vue 2 中的 `createElement` 函数。`h()` 函数的命名来源于 "hyperscript"，即一种生成虚拟 DOM 的脚本语言。

`h()` 函数的基本用法如下：

```javascript
h(type, props, children)
```

- `type`：一个字符串，表示要创建的元素的标签名，例如 `'div'`, `'span'` 等，或是一个组件构造函数。
- `props`：一个对象，包含了元素的属性，例如 `{ id: 'foo', class: 'bar' }`。
- `children`：可以是字符串或数字，表示元素的子节点，也可以是子虚拟 DOM 节点的数组。

## 示例

### 创建一个简单的元素

```javascript
import { h } from 'vue';

const vnode = h('div', { id: 'myDiv' }, 'Hello World!');
```

这将创建一个带有文本子节点的 `div` 元素。

### 创建一个组件

```javascript
import { h } from 'vue';
import MyComponent from './MyComponent.vue';

const vnode = h(MyComponent, { props: { /* 传递给组件的属性 */ } });
```

这将创建一个 `MyComponent` 组件的虚拟 DOM 节点，你可以传递属性给这个组件。

### 传递子节点数组

```javascript
import { h } from 'vue';

const vnode = h(
  'div',
  {},
  [
    h('span', 'Hello'),
    h('span', 'World')
  ]
);
```

这将创建一个包含两个 `span` 子节点的 `div` 元素。

`h()` 函数是 Vue 3 中的一个强大工具，它提供了一种声明式的方式来构建和操作虚拟 DOM。使用 `h()` 函数可以编写更灵活和动态的组件模板。
