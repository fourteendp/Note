---
title: 工程化之统一编辑器字符 EditorConfig
uid: 20240123112807360
aliases: []
categories: []
tags:
  - 计算机/工程化
archive: false
draft: false
todo: false
createTime: 2023-05-14 18:40:09
updateTime: 2024-09-05 09:03:15
---

EditorConfig 是一个用于定义代码格式的文件格式和一组文本编辑器插件。它可以帮助开发人员在不同的编辑器

和 IDE 中保持一致的代码风格。

EditorConfig 文件通常命名为 `.editorconfig`，并存储在项目的根目录中。它包含一组用于定义代码格式的规

则，例如缩进风格、缩进大小、换行符类型等。当您在支持 EditorConfig 的编辑器中打开项目中的文件时，编辑

器会自动应用这些规则，以确保您的代码风格与项目中其他文件保持一致。

## 开始

在您正在使用的编辑器插件市场搜索 `EditorConfig` 一般第一个就是安装它，使编辑器支持 `EditorConfig` 设

置

下面是一个简单的 `.editorconfig`` 文件示例：

```ini
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# 使用大括号扩展表示法匹配多个文件
# 设置默认字符集
[*.{js,py}]
charset = utf-8

# 4 个空格缩进
[*.py]
indent_style = space
indent_size = 4

# 制表符缩进（未指定大小）
[Makefile]
indent_style = tab

# 覆盖 lib 目录下所有 JS 的缩进
[lib/**.js]
indent_style = space
indent_size = 2

# 精确匹配 package.json 或 .travis.yml 文件
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

## 配置参考

- **indent_style**：设置为 tab 或 space，分别使用硬制表符或软制表符。
- **indent_size**：一个整数，定义每个缩进级别使用的列数和软制表符的宽度（如果支持）。当设置为 tab
  时，将使用 tab_width（如果指定）的值。
- **tab_width**：一个整数，定义用于表示制表符字符的列数。这默认为 indent_size 的值，通常不需要指定。
- **end_of_line**：设置为 lf、cr 或 crlf，以控制如何表示换行符。
- **charset**：设置为 latin1、utf-8、utf-8-bom、utf-16be 或 utf-16le，以控制字符集。
- **trim_trailing_whitespace**：设置为 true 以删除换行符前面的任何空格字符，设置为 false 以确保不删
  除。
- **insert_final_newline**：设置为 true 以确保保存文件时以换行符结尾，设置为 false 以确保不是这样。
- **root**：应在文件顶部的任何部分之外指定的特殊属性。设置为 true 以停止在当前文件上搜索
  `.editorconfig` 文件。

## 参考

- [EditorConfig](https://EditorConfig.org)
