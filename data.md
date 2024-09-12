---
title: data
uid: 1725505377167
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-09-05 11:02:57
updateTime: 2024-09-09 08:21:04
---

```dataviewjs
dv.pages().filter(p => p.todo).map(p => dv.el('li', `[[${p.file.path}|${p.title}]]`));
```
