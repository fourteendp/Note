---
title: JavaScript - String.prototype.localeCompare()
uid: 20240123112807010
aliases: []
categories: []
tags:
  - 编程语言
  - 编程语言/JavaScript/方法
  - 编程语言/JavaScript/内置对象
  - 编程语言/String
  - 计算机/前端/JavaScript
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:32
updateTime: 2024-09-12 08:13:23
---

- 用于比较两个字符串，返回一个数字，表示比较结果。
  - 该方法的返回值如下：
    - 如果字符串在字母表中应该排在字符串参数之前，则该方法返回一个负数。
    - 如果字符串等于字符串参数，则该方法返回 0。
    - 如果字符串在字母表中应该排在字符串参数之后，则该方法返回一个正数。
  - 语法：`str.localeCompare(compareString[, locales[, options]])`
  - 参数：
    - compareString：必需。一个字符串，用来比较 str。
    - locales：可选。一个字符串或字符串数组，包含用来比较的语言环境。
    - options：可选。一个对象，包含以下属性：
      - usage：一个字符串，指定比较字符串的用途。可能的值有 "sort"、"search" 或 "match"。默认为
        "sort"。
      - sensitivity：一个字符串，指定比较时大小写和重音的敏感性。可能的值有
        "base"、"accent"、"case"、"variant"。默认为 "variant"。
      - ignorePunctuation：一个布尔值，指定是否忽略标点符号。默认为 false。
      - numeric：一个布尔值，指定是否按照数字顺序比较字符串。默认为 false。
      - caseFirst：一个字符串，指定是否区分大小写。可能的值有 "upper"、"lower" 或 "false"。默认为
        "false"。
  - 返回值：一个数字，表示比较结果。

## 示例

```js
var str1 = "ab"
var str2 = "cd"
var str3 = "ab"
var str4 = "AB"
// 这里需要注意的是，并不是所有解释器都执行相同的排序规则以及返回的结果
console.log(str1.localeCompare(str2)) // -1
console.log(str2.localeCompare(str1)) // 1
console.log(str1.localeCompare(str3)) // 0
console.log(str1.localeCompare(str4)) // 1
console.log(str1.localeCompare(str4, "en", { sensitivity: "base" })) // 0
```

## 注意

- 浏览器支持情
  况：[Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/?search=localeCompare)
- 并不是所有的浏览器都执行相同的排序规则以及返回的结果，因此不要依赖于 localeCompare() 的返回值来排
  序数组
- 该方法不支持比较 Unicode 扩展字符（非基本多文种平面字符）

## 参考

- [String.prototype.localeCompare()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
