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
