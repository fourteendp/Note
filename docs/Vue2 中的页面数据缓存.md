---
title: Vue2 中的页面数据缓存
uid: 20240123112807096
aliases: []
categories: []
tags:
  - 计算机/前端/JavaScript
  - 计算机/前端/Vue
  - 数据处理
  - 数据缓存
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:51
---

## 简介

在使用 Vue 开发单页面应用事，经常会遇到表单页需要显示上次输入的数据，这就需要将整个页面数据的存储下

来

## 全局状态管理

- 将数据保存到全局状态管理工具如 Vuex
- 如果不想数据调式需要对数据做持久化处理

## Keep-alive 缓存

- 使用缓存淘汰算法 --LRU 算法 LRU（Least recently used，最近最少使用）算法根据数据的历史访问记录来进
  行淘汰数据
- 数据保存再内存中关闭页面时，数据丢失

### 示例

```html
<keep-alive>
  <component>
    <!-- 该组件将被缓存！ -->
  </component>
</keep-alive>
```

## 本地缓存

- 将数据保存到浏览器缓存，只要不主动清理缓存，数据不丢失
- 通过 `vm.$data` 获取当前 `vm` 数据，缓存到本地
- 读取数据时因 `vm.$data` 是个只读属性，无法直接把缓存中的数据直接赋值到 `vm.$data`
- vm 中的 data 属性是个方法，可以将读取赋值缓存数据写道 data 方法里通过
  `Object.assign(target, …sources)` 方法克隆合并的对象作为 data 方法的返回值完成，缓存中的数据读取

### 示例

```javascript
export default {
  data() {
    const dataStr = localStorage.getItem("data")
    const data = JSON.parse(dataStr) || {}
    return Object.assign(
      {
        text: "",
      },
      data
    )
  },
  methods: {
    cache() {
      localStorage.setItem("data", JSON.stringify(this.$data))
    },
  },
}
```
