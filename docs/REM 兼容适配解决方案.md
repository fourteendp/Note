---
title: REM 兼容适配解决方案
uid: 20240123112807004
aliases: []
categories: []
tags:
  - 计算机/前端/解决方案
  - 计算机/前端/CSS
  - 计算机/前端/HTML
  - 兼容适配
  - REM
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:53
---

## 使用 rem 做响应式布局

原理：rem 是相对于根元素 html 的 font-size 来计算的，所以只要根元素的 font-size 发生变化，rem 的值也

会发生变化，从而达到响应式布局的目的。

## 实现 750px 设计稿的响应式布局

动态 root 字体大小公式: 1rem = clientWidth / 750 \* 100

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>rem</title>
    <style>
      body {
        margin: auto;
      }
      .box {
        width: 7.5rem;
        height: 7.5rem;
        background-color: red;
      }
    </style>
  </head>

  <body>
    <div class="box"></div>
    <script>
      ;(function (doc, win) {
        var docEl = doc.documentElement,
          resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
          recalc = function () {
            var clientWidth = docEl.clientWidth
            if (!clientWidth) return
            docEl.style.fontSize = 100 * (clientWidth / 750) + "px"
          }
        if (!doc.addEventListener) return
        win.addEventListener(resizeEvt, recalc, false)
        doc.addEventListener("DOMContentLoaded", recalc, false)
      })(document, window)
    </script>
  </body>
</html>
```

## 参考

- [[CSS- 单位]]
