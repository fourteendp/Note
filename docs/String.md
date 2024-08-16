---
title: String
uid: 20240123112807010
aliases: []
categories: []
tags:
  - 计算机/前端/JavaScript
  - 编程语言
  - 编程语言/JavaScript/内置对象
  - 编程语言/String
  - 编程语言/String
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:32
updateTime: 2024-08-02 13:59:53
---

## 什么是 String 对象

- `String` 全局对象是一个用于字符串或一个字符序列的构造函数。

### 语法

```js
new String([value])
String([value])
"value"`value`
```

## String 对象的属性

- `String.length`：返回字符串的长度。

## String 对象的方法

### String.prototype.localeCompare() 方法

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
