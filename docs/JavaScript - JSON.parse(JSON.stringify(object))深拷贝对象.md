---
title: JavaScript - JSON.parse(JSON.stringify(object))深拷贝对象
uid: 1721868470860
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2024-07-25 08:47:50
updateTime: 2024-09-09 08:36:47
---

## 缺点

1. **不适用于所有数据类型**：
- `JSON.stringify` 无法序列化函数、undefined、symbol 和循环引用的对象。尝试这样做会导致这些数据丢失或抛出错误。
1. **丢失原型链**：
- 经过 `JSON.stringify` 和 `JSON.parse` 处理后，新对象会丢失原对象的原型链，也就是说新对象不再是一个实例。
1. **不保留对象的方法**：
- 原对象中的方法（函数属性）不会被保留在新对象中，因为 `JSON.stringify` 不会处理函数。
1. **数据精度问题**：
- 对于大于 `Number.MAX_SAFE_INTEGER` 的数字，`JSON.stringify` 会将其转换为字符串，因此在解析回对象时会失去精度。
1. **日期对象被转换为字符串**：
- 日期对象在被序列化和解析后会变成字符串，而不是日期对象。
1. **不保留属性顺序**：
- 对象的属性顺序可能会在序列化和解析过程中改变。
1. **性能开销**：
- `JSON.stringify` 和 `JSON.parse` 都有性能开销，尤其是对于大型对象或数组，这种转换可能会很慢。
1. **不可序列化的属性丢失**：
- 如果对象中有不可序列化的属性（例如，带有循环引用的属性），这些属性会被丢失。

为了解决这些问题，如果你需要深拷贝一个对象，你可能需要使用其他方法，比如使用一个库如 `lodash` 的 `_.cloneDeep` 方法，或者编写一个自定义的深拷贝函数来处理这些特殊情况。
