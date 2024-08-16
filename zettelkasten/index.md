---
title: index
uid: 1723768203076
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-16 08:30:03
updateTime: 2024-08-16 09:32:17
---

```dataviewjs
const cur = dv.current();
const list = dv.pages(`"${cur.file.folder}"`)
.filter(p => {
  return p.file.name !== cur.file.name;
})
.map(p => {
  return dv.paragraph(`
> [!info] ${p.file.name}
> ![[${p.file.path}|${p.file.name}]]
`);
});
```
