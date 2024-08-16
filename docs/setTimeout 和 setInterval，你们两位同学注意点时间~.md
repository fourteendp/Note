---
title: setTimeout 和 setInterval，你们两位同学注意点时间~
uid: 20240123112809260
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
originalUrl: https://juejin.cn/post/7028823525125259272
createTime: 2023-05-07 22:01:33
updateTime: 2024-08-02 13:59:53
---

## 基本定义与用法

### 1、定义

- `setTimeout()` 方法用于在指定的时间（单位毫秒）后执行回调函数或指定的一段代码
- `setInterval()` 方法可按照指定的时间间隔（单位毫秒）来调用回调函数或指定的一段代码

### 2、参数

- 第一个参数 function，必填，回调函数。或者是一段字符串代码，但是这种方式不建议使用，就和使用 `eval()` 一样，有安全风险；而且还有作用域问题（字符串会在全局作用域内被解释执行）

  ```javascript
  setTimeout("console.log(123);fn()", 2000);
  ```

- 第二个参数 delay，可选，单位是 ms，对于 `setTimeout` 是延迟时间，对于 `setInterval` 是间隔时间，默认都是 0
- 第三个参数 param1,param2,param3…，可选，是传递给回调函数的参数，不大常用

  ```javascript
  setTimeout(
    function (a, b) {
      console.log(a, b);
    },
    2000,
    "我是",
    "定时器"
  );
  ```

### 3、返回值

- 返回一个 ID（数字），可以将这个 ID 传递给 `clearTimeout()` 或 `clearInterval()` 来取消执行
- PS: `setTimeout()` 和 `setInterval()` 共用一个编号池，技术上，`clearTimeout()` 和 `clearInterval()` 可以互换使用，但是为了避免混淆，一般不这么做

## 二、setTimeout 和 setInterval 的实际表现

### 1、使用 setInterval 实现计时

```javascript
const startTime = new Date().getTime();
let count = 0;
const interval = setInterval(function () {
  count++;
  console.log(new Date().getTime() - (startTime + count * 1000) + "ms");
  if (count === 10) {
    clearInterval(interval);
  }
}, 1000);
```

`new Date().getTime() - (startTime + count * 1000)` 理想情况下应该是 0ms，然而事实并不是这样，而是存在着误差：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/413fa6cbed5c46bd8a761f920028fc20~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 2、使用 setTimeout 实现计时

```javascript
const startTime = new Date().getTime(),
  delay = 1000;
let count = 0;
let timer = setTimeout(doFunc, delay);
function doFunc() {
  count++;
  console.log(new Date().getTime() - (startTime + count * 1000) + "ms");
  if (count < 10) {
    timer = setTimeout(doFunc, delay);
  }
}
```

setTimeout 也同样存在着误差，而且时间越来越大（setTimeout 需要在同步代码执行完成后才重新开始计时）：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88ff9ecaabc44b3ca4bf28da54be81f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 三、为什么会出现误差

### 1、setTimeout 的最短延迟时间

`setTimeout` 遵循的规范由 whatwg 来维护，在 [HTML Standard - 8.6 Timers](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Ftimers-and-user-prompts.html%23dom-settimeout "https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout") 中写到了定义定时器的详细步骤，其中有两条：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48672062a7bd44c1aea12510cf135aa5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

上面的意思就是说，如果设置的 timeout 小于 0，则设置为 0，如果嵌套的层级超过了 5 层（计时器嵌套），并且 timeout 小于 4ms，则设置 timeout 为 4ms。并且，在不同浏览器中出现这种最小延迟的情况有所不同

具体的源代码实现以及各大浏览器实现的不同，大家可以参考这篇文章：[为什么 setTimeout 有最小延时 4ms ？](https://link.juejin.cn/?target=https%3A%2F%2Fwww.bruceyj.com%2Ffront-end-interview-summary%2Fsystem-design%2Fwhy-is-the-design%2F2-why-setTimeout-4ms.html "https://www.bruceyj.com/front-end-interview-summary/system-design/why-is-the-design/2-why-setTimeout-4ms.html")

这里只看结论，定时器本身的定义步骤是造成其出现误差的原因之一

### 2、setInterval 的最小间隔时间以及回调函数阻塞

在 HTML5 标准中，setInterval 的最小间隔为 10ms，虽然我在规范文档中并未找到其相关说明，但是经过实际测试，也确实存在最小间隔时间，例如以下代码：

```javascript
let startTime = new Date().getTime();
let count = 0;
const interval = setInterval(function () {
  count++;
  console.log(new Date().getTime() - startTime + "ms");
  startTime = new Date().getTime();
  if (count === 10) {
    clearInterval(interval);
  }
}, 0);
```

测试结果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c63773de6a41d491dd52a0c4a12126~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

虽然没有 10ms 那么大的间隔，但是间隔仍然存在，猜测具体的间隔时间是和浏览器实现以及设备性能有关，无论如何，间隔是确实存在的

另外，当使用 setInterval 时间间隔到点后，仅当队列中没有该定时器的任何其他代码实例时，才会将定时器的代码添加到队列中，如果有的话，则不会添加，造成堵塞，这个也与 JS 的事件循环有关

### 3、未被激活的 tabs 的定时最小延迟 >= 1000ms

为了优化后台 tab 的加载损耗（以及降低耗电量），在未被激活的 tab 中定时器的最小延时限制为 1s(1000ms)，具体时间在不同的浏览器实现中也有差别

### 4、JS 的事件循环机制

`setTimeout` 和 `setInterval` 中的时间并不是到点就立即执行，而是到点将其回调函数加入异步事件队列中，按照队列先进先出的性质，该回调函数到点之后是否能执行还得取决于是否属于队列首位，如果前头还有其他事件在等待，则不能按点执行，如果没有，则将其放入同步队列执行。具体事件循环机制，可以参考这篇文章：[动图学习 - EventLoop](https://juejin.cn/post/6969028296893792286 "https://juejin.cn/post/6969028296893792286")

## 四、解决方案

### 1、在浏览器中实现一个 0ms 延时的定时器

可以参考如下代码（来自于国外的一篇博客，也是 MDN 推荐的方法），主要是使用了 postMessage 方法，异步的执行了回调函数，并且速度要比 setTimeout(0) 要快的多。具体比较可以参照原文：[setTimeout with a shorter delay](https://link.juejin.cn/?target=https%3A%2F%2Fdbaron.org%2Flog%2F20100309-faster-timeouts "https://dbaron.org/log/20100309-faster-timeouts")

```javascript
(function () {
  const timeouts = [];
  const messageName = "zero-timeout-message";

  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {
    if (event.source === window && event.data === messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        const fn = timeouts.shift();
        fn();
      }
    }
  }

  window.addEventListener("message", handleMessage, true);
  window.setZeroTimeout = setZeroTimeout;
})();
```

使用如下代码做下测试：

```javascript
let startTime = new Date().getTime();
let count = 0;
setTimeout(doFunc);
function doFunc() {
  count++;
  console.log(new Date().getTime() - startTime + "ms");
  startTime = new Date().getTime();
  if (count < 10) {
    setTimeout(doFunc);
  }
}
```

使用 setTimeout(0) 得到的时间：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25be124d4f3c49c487a418a4d6fdaf57~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

将 setTimeout 改成 setZeroTimeout 后得到的时间，时间几乎都在 0～1，至于为什么不是绝对的 0，猜测可能与性能有关，总的来说，时间确实缩短了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1923f9c7db2949ffba0b96c89e1f55de~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 2、购物网站的秒杀活动

一般情况下，从服务器拿到倒数时间后，前端的执行倒计时程序持续运行，事实上，显示时间相比实际时间会越来越慢的

究其原因，倒计时通常是使用定时器实现，而 JS 的单线程特性使得同步任务执行过程中出现阻塞时，任务队列中的异步任务并不能及时执行，因此浏览器并不能保证在定时器设置的时间结束后代码总是被准时执行，从而造成了倒计时的偏差

一般的解决方法是前端定时向服务器发送请求获取最新的时间差来校准倒计时时间，和用户一直按 F5 刷新没啥区别，比较简单粗暴，下面的方法可以一定程度上解决这个问题，纯前端控制，不依赖于后端。源地址已忘

```javascript
const interval = 1000;
const startTime = new Date().getTime();

let time = 60000;
let count = 0;
let timeCounter;
if (time >= 0) {
  timeCounter = setTimeout(countDown, interval);
}
function countDown() {
  count++;
  const gap = new Date().getTime() - (startTime + count * interval);
  let nextTime = interval - gap;
  if (nextTime < 0) {
    nextTime = 0;
  }
  time -= interval;
  console.log(
    `误差：${gap} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${time} ms`
  );
  if (time <= 0) {
    clearTimeout(timeCounter);
  } else {
    timeCounter = setTimeout(countDown, nextTime);
  }
}
```

## 五、使用 setTimeout 替代 setInterval

定时器指定的时间间隔，表示的是何时将定时器的代码添加到消息队列，而不是何时执行代码。所以真正何时执行代码的时间是不能保证的，它取决于何时被主线程的事件循环获取到，并执行

假设有 `setInterval(function, 100)`，它的执行可能是这样的：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5743630643c24016aed76949a438bbd6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

上图可见，setInterval 每隔 100ms 往队列中添加一个事件；100ms 后，添加 T1 定时器代码至队列中，主线程中还有任务在执行，所以等待，some event 执行结束后执行 T1 定时器代码；又过了 100ms，T2 定时器被添加到队列中，主线程还在执行 T1 代码，所以等待；又过了 100ms，理论上又要往队列里推一个定时器代码，但由于此时 T2 还在队列中，所以 T3 不会被添加，结果就是此时被跳过；然后，T1 定时器执行结束后马上执行了 T2 代码，所以并没有达到定时器间隔的效果

综上所述，serInterval 有两个问题：

- 可能多个定时器会连续执行（会导致后续的间隔误差）
- 某些间隔会被跳过（这么设计也可能是为了尽量避免第一个问题）

因而一般会使用 setTimeout 模拟 setInterval，来规避掉上面的缺点

```javascript
setTimeout(function fn() {
  setTimeout(fn, delay);
}, delay);
```

这样的话，在前一个定时器代码执行完成前，不会向队列中插入新的定时器（不会连续执行），而且保证了定时器间隔

注：有些说法，可能对当队列中存在定时器实例时，是否会跳过添加实例，存在质疑；还有的说法是，在 Node 环境中会跳过，在浏览器环境中会累加；不过我这边实测，不管在 Node 还是在 web 中，当队列中存在定时器实例时，都会跳过添加的；当然也有可能是浏览器版本或内核不同，表现不同，没有细测；感兴趣的小伙伴可以使用一下代码实测下，看是会一次性输出，还是会间隔性输出

```javascript
let count = 0;
let countId = setInterval(function () {
  if (count >= 5) {
    clearInterval(countId);
    return;
  }
  count++;
  console.log(2 + " time: " + Date.now());
}, 1000);
(function () {
  let start = Date.now();
  for (let i = 1; i <= 2000000000; i++) {
    if (i === 2000000000) {
      console.log(i);
    }
  }
  console.log(Date.now() - start + "ms");
})();
```

---

**这边顺便一提，涉及到做动画的场景可能会使用定时器**

- 由于定时器的种种误差问题，以及固定时间间隔不一定与屏幕刷新时间相同，可能会引起丢帧；而且定时器在后台仍会继续执行，也会造成资源的浪费
- 一般情况下，还是推荐使用 requestAnimationFrame，RAF 重绘或回流（重排）的时间间隔是紧紧跟随浏览器的刷新频率的；并且在页面未激活时，该页面的屏幕刷新任务也会被暂停，当页面被激活时，任务会从上次停留的地方继续执行，这也就意味着将耗费更少的资源，提升了性能

### 总结

- setTimeout 和 setInterval 都存在计时误差，不会严格按照既定时间执行
- 一般情况下，这些误差不会造成太大影响，只对于某些特殊场景，对时间要求比较严格的情况下，需要特殊处理
- 对于 setInterval，个人建议能不用尽量不用，使用 setTimeout 的嵌套实现，可以规避掉一些潜在问题的发生

### 参考文章

- [blog.csdn.net/b954960630/…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fb954960630%2Farticle%2Fdetails%2F82286486 "https://blog.csdn.net/b954960630/article/details/82286486")
- [juejin.cn/post/684490…](https://juejin.cn/post/6844903773622501383 "https://juejin.cn/post/6844903773622501383")
- [dbaron.org/log/2010030…](https://link.juejin.cn/?target=https%3A%2F%2Fdbaron.org%2Flog%2F20100309-faster-timeouts "https://dbaron.org/log/20100309-faster-timeouts")
