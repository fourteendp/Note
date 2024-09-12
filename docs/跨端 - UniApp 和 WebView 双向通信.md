---
title: 跨端 - UniApp 和 WebView 双向通信
uid: 20240123112807080
aliases: []
categories: []
tags:
  - 计算机/前端/通信
  - 计算机/前端/uni-app
  - 计算机/前端/WebView
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:13
---

## WebView 向 UniApp 通信

### Vue

- `index.html` 导入 UniApp-Sdk

```html
<script
  type="text/javascript"
  src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"
></script>
```

- `App.vue`

```javascript
mounted() {
    this.$nextTick(() => { 
 document.addEventListener("UniAppJSBridgeReady",  () => {
        uni.getEnv(function (res) {
          console.log("当前环境：" + JSON.stringify(res));
        });
      });
    });
  },
```

- 向应用发送

```javascript
uni.postMessage({
  data: {
    type: "data",
    data: "message",
  },
})
```

### UniApp

```html
<template>
  <view>
    <web-view
      :webview-styles="webviewStyles"
      src="http://192.168.3.140:8888/"
      @message="getMessage"
    >
    </web-view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        webviewStyles: {
          progress: {
            color: "#FF3333",
          },
        },
      }
    },
    methods: {
      getMessage(e) {
        console.log(e)
      },
    },
  }
</script>
```

## UniApp 向 WebView

## UniApp

```javascript
let currentWebview = _this.$scope.$getAppWebview()
let wv = currentWebview.children()[0]
let params = JSON.stringify({
  function: "handleLabelScanCode",
  data,
})
wv.evalJS("getUniAppMessage(" + params + ")")
```

## Vue

```javascript
export default {
  mounted() {
    window.getUniAppMessage = (e) => {
      if (e.function) {
        this[e.function](e.data)
      }
    }
  },
}
```
