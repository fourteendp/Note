---
title: CSS 判断是否包含某个子节点
uid: 1722222573630
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-07-29 11:09:33
updateTime: 2024-08-02 14:00:44
---

如果有 child 子节点则 parent 字体红色

```css

.parent:has(.child) {
  color: red;
}
```
