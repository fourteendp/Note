---
title: vue3中如何获取组件props的ts类型
uid: 1722318724834
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-07-30 13:52:04
updateTime: 2024-08-02 13:59:51
---

```javascript
type ChildProps = InstanceType<typeof Components>['$props']
```

## 参考

- [vue.js - vue3中如何获取组件props的ts类型 - SegmentFault 思否](https://segmentfault.com/q/1010000041918619)
