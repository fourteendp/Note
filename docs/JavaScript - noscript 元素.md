---
title: JavaScript - noscript 元素
uid: 20240123112806864
aliases: []
categories:
  - 编程语言/JavaScript
tags:
  - JavaScript
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:44:01
---

浏览器不支持 JavaScript 是显示该标签

```html
<noscript>
  <p>此页面需要启用JavaScript浏览器</p>
</noscript>
```

类似的还有 audito 和 video 支持正常显示，不支持显示标签内内容

```html
<audio src="someaudio.wav">您的浏览器不支持 audio 标签。</audio>
<video src="movie.ogg" controls="controls">您的浏览器不支持 video 标签。</video>
```
