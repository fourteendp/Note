---
title: 设计模式 - 事件循环（Event Loop）
uid: 20240123112807180
aliases: []
categories: []
tags:
  - 编程语言
  - 计算机/技术
  - 计算机/前端/JavaScript
  - 事件循环
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:32
updateTime: 2024-09-12 08:13:14
---

JavaScript 中的事件循环（Event Loop）是实现异步编程的核心机制之一，它是 JavaScript 单线程执行模型的

基础。事件循环负责管理执行栈和消息队列，并将事件推送到执行栈中执行。

当 JavaScript 代码执行时，它会被添加到执行栈中。当执行栈为空时，事件循环开始从消息队列中取出事件，并

将其添加到执行栈中执行。当事件处理完毕后，执行栈再次为空，事件循环继续从消息队列中取出事件执行，直到

消息队列为空。

在事件循环中，有三个主要的部分：宏任务（macro-task）、微任务（micro-task）和回调队列（callback

queue）。

- 宏任务是事件循环的最外层，包括定时器（setTimeout、setInterval 等）、事件（DOM 事件、网络请求等）和
  I/O 操作（文件读写等）等。
- 微任务是宏任务执行完毕后立即执行的任务，包括 Promise 回调、MutationObserver 回调、process.nextTick
  回调、Object.observe 回调、queueMicrotask 回调等
- 回调队列存储在事件循环的微任务队列中，它们会在下一个事件循环迭代中被调用。事件循环的具体流程可以分
  为以下几个步骤：

1. 执行当前执行栈中的所有同步代码，直到执行栈为空。
2. 从宏任务队列中取出一个任务执行，直到宏任务队列为空或者达到最大执行时间限制。
3. 执行所有微任务，直到微任务队列为空。
4. 更新渲染。
5. 如果存在回调队列，从回调队列中取出一个回调执行，回到第 3 步。
6. 如果代码正在执行中，则继续执行代码。

## 事件循环（Event Loop）面试题

难度从简到难

```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
new Promise((resolve) => {
  console.log(3)
  resolve()
}).then(() => {
  console.log(4)
})

console.log(5)
```

```js
console.log(1)
setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
  })
}, 0)

new Promise((resolve) => {
  console.log(4)
  resolve()
}).then(() => {
  console.log(5)
})

console.log(6)
```

```js
console.log(1)

setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
  })
})

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data)

  Promise.resolve()
    .then(() => {
      console.log(6)
    })
    .then(() => {
      console.log(7)

      setTimeout(() => {
        console.log(8)
      }, 0)
    })
})

setTimeout(() => {
  console.log(9)
})

console.log(10)
```

```js
async function async1() {
  console.log("async1 start")
  await async2()
  console.log("async1 end")
}
async function async2() {
  console.log("async2")
}
console.log("script start")
setTimeout(function () {
  console.log("setTimeout")
}, 0)
async1()
new Promise(function (resolve) {
  console.log("promise1")
  resolve()
}).then(function () {
  console.log("promise2")
})
console.log("script end")
```

```js
const p1 = new Promise((resolve, reject) => {
  console.log("promise1")
  resolve()
})
  .then(() => {
    console.log("then11")
    new Promise((resolve, reject) => {
      console.log("promise2")
      resolve()
    })
      .then(() => {
        console.log("then21")
      })
      .then(() => {
        console.log("then23")
      })
  })
  .then(() => {
    console.log("then12")
  })

const p2 = new Promise((resolve, reject) => {
  console.log("promise3")
  resolve()
}).then(() => {
  console.log("then31")
})
```

```js
const p1 = new Promise((resolve, reject) => {
  console.log("promise1") // 1
  resolve()
})
  .then(() => {
    console.log("then11") // 2
    return new Promise((resolve, reject) => {
      console.log("promise2") // 3
      resolve()
    })
      .then(() => {
        console.log("then21") // 4
      })
      .then(() => {
        console.log("then23") // 5
      })
  })
  .then(() => {
    console.log("then12") //6
  })
```

```js
console.log("1")

setTimeout(function () {
  console.log("2")
  process.nextTick(function () {
    console.log("3")
  })
  new Promise(function (resolve) {
    console.log("4")
    resolve()
  }).then(function () {
    console.log("5")
  })
})

new Promise(function (resolve) {
  console.log("7")
  resolve()
}).then(function () {
  console.log("8")
})
process.nextTick(function () {
  console.log("6")
})

setTimeout(function () {
  console.log("9")
  process.nextTick(function () {
    console.log("10")
  })
  new Promise(function (resolve) {
    console.log("11")
    resolve()
  }).then(function () {
    console.log("12")
  })
})
```

```js
console.log("1")
setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
    process.nextTick(function foo() {
      console.log(4)
    })
  })
})
Promise.resolve().then(() => {
  console.log(5)
  setTimeout(() => {
    console.log(6)
  })
  Promise.resolve().then(() => {
    console.log(7)
  })
})

process.nextTick(function foo() {
  console.log(8)
  process.nextTick(function foo() {
    console.log(9)
  })
})
console.log("10")
```

## 参考

- [JavaScript 宏任务与微任务 - Web前端工程师面试题讲解\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1eQ4y1d7mE/?share_source=copy_web&vd_source=2d3491d8d73e0966a37eba2105c2d30c)
- [JS事件循环机制（event loop）之宏任务/微任务 - 掘金](https://juejin.cn/post/6844903638238756878)
- [10分钟了解JS堆、栈以及事件循环的概念 - 掘金](https://juejin.cn/post/6844903618999500808)
- [面试一定会问到的-js事件循环 - 掘金](https://juejin.cn/post/6844903968292749319)
- [图解搞懂JavaScript引擎Event Loop - 掘金](https://juejin.cn/post/6844903553031634952)
- [会用 Performance 工具，就能深入理解 Event Loop - 掘金](https://juejin.cn/post/7155350299295612941)
- [微任务、宏任务与Event-Loop - 掘金](https://juejin.cn/post/6844903657264136200)
- [最后一次搞懂 Event Loop - 掘金](https://juejin.cn/post/6844903827611598862)
- [浏览器与Node的事件循环(Event Loop)有何区别? - 掘金](https://juejin.cn/post/6844903761949753352)
- [带你彻底弄懂Event Loop - 掘金](https://juejin.cn/post/6844903670291628046)
- [彻底搞懂JavaScript事件循环 - 掘金](https://juejin.cn/post/6992167223523541023)
- [浏览器与Node的事件循环(Event Loop)有何区别? - 掘金](https://juejin.cn/post/6844903761949753352)
- [微任务、宏任务与Event-Loop - 掘金](https://juejin.cn/post/6844903657264136200#heading-8)
