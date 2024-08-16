---
title: index
uid: 20240123112806560
aliases:
  - 首页
categories: []
tags:
  - 索引
archive: false
draft: false
todo: false
createTime: 2023-05-08 06:01:30
updateTime: 2024-08-15 18:34:10
---

![[assets/b13df23e67d85980097259322b67572a_MD5.jpeg]]

## 待办

```dataviewjs
dv.pages().filter(p => p.todo).map(p => dv.el('li', `[[${p.file.path}|${p.title}]]`));
```
