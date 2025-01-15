---
title: 前端 Iframe 及 Worker 通信解决思路_js iframe 取消 message 监听
uid: 1736480226908
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
createTime: 2025-01-10 11:37:06
updateTime: 2025-01-10 13:51:38
---

**前言**
------

**在前端开发中，经常会使用 iframe 和 worker 来实现一些特殊的需求，比如将第三方的页面嵌入到自己的页面中，或者在同一页面中显示多个不同的内容，后台运行 JS 代码等。然而，由于 iframe 和 Worker 具有独立的文档结构和执行环境，所以在多个页面及线程之间进行数据交互和通信变得困难。此时文件之间的通信就非常重要，为了让子页面与父级或其他页面共享数据和状态或使页面间达到联动的目的，我用 JS 实现了一个插件包，这里做个分享**

**Iframe 通信**
-------------

**首先我们需要熟悉 iframe 的通信方式**

**window 对象提供了 postMessage 函数，使用 postMessage 给子页面，父页面或者自己发送消息，通过在 window 对象上监听 message 事件获取收到的消息**

```JavaScript
window.postMessage("父页面发送的消息"); // 发给了当前页面
 
window.addEventListener(
  "message",
  console.log.bind(this, "父页面收到信息") // 父页面收到信息 MessageEvent
);
```

**在 postMessage(message, targetOrigin, transfer) 函数中可以传递 3 个参数，分别是**

- **message：需要发送的消息**
- **targetOrigin：目标源，如："http://127.0.0.1:5500/"，"*" 表示全部通配符**
- **transfer：取消深拷贝的数据，通过 message 发送对象是深拷贝的数据，会在目标页面和当前页面产生两个对象，如果直接发送消息会十分损耗性能，使用 transfer 可以达到保存数据的功能**

**下面是个简单的父子通信的例子**

```JavaScript
     // parent
      sonIframe.onload = () => {
        sonIframe.contentWindow.postMessage(data, "*");
      };
      window.addEventListener("message", (e) => {
        console.log("父页面收到信息", e.data);
      });
    // son
      window.addEventListener("message", (e) => {
        console.log("子页面收到信息", e.data);
        window.parent.postMessage(e.data, "*");
      });
```

**Worker 通信**
-------------

**worker 是 js 中的多线程，其通信方式与 iframe 类似，通过使用 worker 实例化对象进行传递消息，但是需要注意的是，iframe 可以通过 parent 访问父页面，worker 只能通过 self 对象将消息传递给父页面中的实例 worker，因此功能实现需要对其做兼容。下面是一段使用 worker 的代码**

```JavaScript
// 父页面
const worker = new Worker("./worker.js", { type: "module" });
worker.onmessage = (e) => {
  console.log("parent收到了消息：", e.data);
};
worker.postMessage({ type: "msg", msg: "你也好" });
 
// 子页面
self.onmessage = (e) => {
  console.log("worker收到了消息：", e.data);
};
self.postMessage({ type: "msg", msg: "你好" });
```

 **![[assets/30bfa102c48b7353de360f597bab5976_MD5.png]]**

**实现思路**
--------

**有了上面的例子我们就可以使用 api 实现页面之间的通信，下面是思维导图**

**![[assets/54c80ca48eb2e0b2e84fe8f536349cd6_MD5.png]]**

**上述设计中有 Server，PeerToPeer，Client 三个工具类，它们之间通过观察者进行通信，然后通过 [MessageCenter](https://hunter1024.blog.csdn.net/article/details/124452792 "MessageCenter") 传递异步任务**

**其中 Server 部署在父页面中，实现监听及发送消息的作用；Client 部署在子页面中，作用与 Server 类似，担任消息发送与接收的职务；PeerToPeer 的作用有两个：一是担任广播群发消息的任务，二是收集广播的消息。此外，Server 与 Client 之间也可以直接通过 message 通信，子页面之间通信通过 PeerToPeer 进行绑定**

**实现过程**
--------

**了解了上面的基本概念与思路后，我们来将这个功能实现一下**

## **MessageCenter 类**

**作为消息收发的核心，许多地方用到了消息中心，具体实现方式可以参照之前的 [这篇文章](https://hunter1024.blog.csdn.net/article/details/124452792 "这篇文章")**

**相对应 Promise，其优点是可以触发多段异步操作，既规避了回调函数的耦合，又解决了异步操作，是通信过程不可或缺的一个部分，我们的核心函数可以继承该类并将其具象化，基于其中部分功能实现具体操作，那么整个程序设计可以使用多个链式调用的方式执行函数，如：**

```JavaScript
  server
    .mount()
    .on("msg", console.log)
    .on("msg1", console.log)
    .on("msg2", console.log)
    .load()
    .catch(console.log);
```

## **IPC 类**

**整个工具的核心是 IPC（进程通信），其集合了前面说到的 send 发送消息，handleMessage 接收消息，此外基于这两点，我在类中增加了一些可能用的到的函数，来提升类灵活性与高可用性，如：mount 函数用于手动挂载当前页面监听消息；unmount 与前者相反，取消消息监听卸载页面；reset 重置页面信息，reset 后需要重新实例化类；load 用来监听当前页面是否加载完成；watchHandler 和 invokeHandler 分别是 " 监听函数类型消息并执行对应函数 " 与 " 发送函数类型消息触发函数 "**

```JavaScript
import type { MessageCenter as TypeMessageCenter } from "utils-lib-js"
import { PeerToPeer } from "./p2p"
const { defer, MessageCenter, getType } = UtilsLib
export namespace IPCSpace {
    export type IObject<T = any> = {
        [key: string | number | symbol]: T
    }
    export type IHandler<T = any> = {
        (...args: any[]): Promise<T> | void
    }
 
    export type IOptions<Target = ITarget> = {
        target: Target // 目标页面，一般指Iframe或者window.parent
        origin: string // 发送消息给哪个域名
        source: Window | Worker // 当前window对象或Worker
        handlers: IObject<IHandler> // 钩子函数，等对方触发
        id: string // 标识，用来区分调用者
        handlersFixStr: string // 动态修改函数type关键字
        transfer: any // 需要传递的较大的数据，避免message的深复制导致两边的性能损耗较大
    }
    export type ISendParams = {
        type: string // 消息类型
        data?: unknown // 传递数据
        id?: number | string // 消息标识
    }
    export type ITarget = Window | HTMLIFrameElement | Worker
}
export class IPC extends (MessageCenter as typeof TypeMessageCenter) {
    constructor(protected opts: Partial<IPCSpace.IOptions> = {}) {
        super()
        const {
            origin = "*",
            source = window,
            target = null,
            transfer,
            handlers = {},
            id = "",
            handlersFixStr = "@invoke:ipc:handlers:"
        } = opts
        this.opts = {
            origin,
            source,
            target,
            transfer,
            handlers,
            id,
            handlersFixStr
        }
    }
    get sendMethods() {
        console.error('重写此函数');
        return (() => { }) as Function
    }
    /**
     * 目标对象，父页面中的iframe，子页面中的window.parent，子类重写该对象，进行校验
     */
    get target() {
        const { target } = this.opts
        if (!!!target) throw new Error("target 不能为空")
        return target
    }
    set id(id) {
        this.opts.id = id
    }
    get id() {
        return this.opts.id
    }
    get source() {
        return this.opts.source
    }
    /**
     * 当前页面加载完成
     * @returns promise
     */
    load() {
        const { promise, resolve } = defer()
        this.target.addEventListener("load", resolve)
        return promise
    }
    /**
     * 挂载当前页面，监听对方消息
     * @returns IPC
     */
    mount(handler?: (e: MessageEvent) => void) {
        const { source } = this
        this.unMount(handler)
        source?.addEventListener('message', handler ?? this.handleMessage);
        return this
    }
    /**
     * 卸载当前页面，取消监听对方消息
     * @returns IPC
     */
    unMount(handler?: (e: MessageEvent) => void) {
        const { source } = this
        source?.removeEventListener('message', handler ?? this.handleMessage);
        return this
    }
    /**
     * 重置当前IPC
     */
    reset() {
        this.unMount()
        this.clear()
        this.opts.handlers = {}
    }
    /**
     * 触发target的钩子函数
     * @param params 
     */
    invokeHandler(params: IPCSpace.ISendParams) {
        const { handlersFixStr } = this.opts
        const { type, ...oths } = params
        this.send({ type: `${handlersFixStr}${type}`, ...oths })
    }
    /**
     * 钩子函数处理
     * @param params 
     * @returns 函数运行结果
     */
    watchHandler(params) {
        const { handlerType, data = [] } = params
        const { handlers } = this.opts
        const fn = handlers[handlerType]
        return fn?.(...data)
    }
    /**
     * 当前页面接收消息
     * @param e  message 事件对象
     * @returns void
     */
    handleMessage = (e: MessageEvent) => {
        const { id, type, data } = e.data
        const { handlersFixStr } = this.opts
        if (!!!this.checkID(id)) return
        const handlerType = this.isHandler(type, handlersFixStr)
        if (handlerType) {
            return this.watchHandler({ handlerType, data })
        }
        this.emit(type, data)
    }
    /**
     * 发送消息
     * @param params 
     * @returns IPC
     */
    send(params: IPCSpace.ISendParams) {
        const { origin, transfer } = this.opts
        const { type, data = {}, id = this.id } = params
        const { target, sendMethods } = this
        let fnParams = [{ type, data, id }, origin, transfer]
        if (type) {
            isWorker(target) && (fnParams = [{ type, data, id }, transfer]); sendMethods?.(...fnParams);
        }
 
        return this
    }
    /**
     * 校验id
     * @param id 
     * @returns {boolean}
     */
    private checkID(id: string) {
        return id === this.id
    }
    isWindow = isWindow
    formatToIframe = formatToIframe
    isHandler = isHandler
    isWorker = isWorker
}
/**
 * 格式化Iframe，取selector还是element对象
 * @param target 
 * @returns 
 */
export const formatToIframe = (target: IPCSpace.ITarget | string) => {
    return getType(target) === "string" ? document.querySelector(`${target}`) : target
}
/**
 * 当前环境是不是父窗口
 * @param source 需要判断的对象
 * @returns 
 */
export const isWindow = (source: any) => {
    return source && source === source.window
}
/**
 * 当前环境是不是子线程或线程对象
 * @param worker 需要判断的对象
 * @returns 
 */
export const isWorker = (worker: any) => {
    return worker instanceof Worker || typeof DedicatedWorkerGlobalScope !== "undefined"
}
/**
 * 当前的type是否能被截取，用来截取函数调用消息
 * @param type 消息类型
 * @param __fixStr 截取的字符
 * @returns 
 */
export const isHandler = (type, __fixStr = '') => {
    return type.split(__fixStr)?.[1]
}
```

## **Server 类**

**Server 类继承自上面的 IPC，此外 Server 还实现了 target 存取器，以及 sendMethods 存取器，由于 Client 与 Server 的部分功能不相同，所以在二者中分别实现，target 的作用是开放一个入口给 P2P 使其可以对子页面批量操作，sendMethods 是对 postMessage 做兼容**

```JavaScript
import { IPC, IPCSpace } from "./ipc"
 
export class Server extends IPC {
    constructor(opts: Partial<IPCSpace.IOptions<HTMLIFrameElement | Worker>>) {
        super(opts)
    }
    get sendMethods() {
        return this.target instanceof Worker ? this.target?.postMessage.bind(this.target) : this.target?.contentWindow?.postMessage// Server发送消息的方式取子页面的contentWindow，如果是worker则直接使用postMessage
    }
    /**
     * 允许重新设置目标对象
     */
    set target(_target) {
        this.opts.target = _target
    }
 
    /**
     * 校验目标对象，若没传则说明当前server与client是一对多关系
     */
    get target() {
        const { target } = this.opts
        if (!!!target) return null
        const _target = this.formatToIframe(target)
        if (!!!(_target instanceof HTMLIFrameElement || _target instanceof Worker)) throw new Error("target必须是IFrame、Worker或标签选择器")
        return _target
    }
}
```

## **Client 类**

**Client 可以理解是 Server 的青春版，里面只有对 target 的单独处理与 sendMethods 的实现**

```JavaScript
import { IPC, IPCSpace } from "./ipc"
export class Client extends IPC {
    constructor(opts: Partial<IPCSpace.IOptions<Window>>) {
        super(opts)
    }
    get sendMethods() {
        return this.target.postMessage // Client发送消息的方式取父页面,一般是parent
    }
    /**
     * 校验父页面
     */
    get target() {
        const { target } = this.opts
        if (!!!(this.isWindow(target) || target === self)) throw new Error("target必须是Window或Worker的self对象")
        return target as Window
    }
}
```

## **PeerToPeer**

**是对原有功能的升级，实际上使用上述代码即可达到各类通信的要求，但是有些操作需要系统性的调度与分发，此时一个简单的分发器就比较重要了**

**PeerToPeer 的主要实现有两大模块：一是多个子页面互发消息，二是父页面与多个子页面互发消息达到多对多的消息传递或函数调用**

**PeerToPeer 类的核心代码是 batchOperation 和 servers 属性，此时的 server 可以当成是一个工具类，可以使用该函数对子页面进行批量操作**

```JavaScript
import { formatToIframe, IPCSpace } from "./ipc"
import { Server } from './server'
export type IClients = Iframe | string[]
export type Iframe = HTMLIFrameElement[]
export class PeerToPeer {
    /*关联的iframe列表，可以传element或选择器，
    如'#iframe'，'.iframe'等等*/
    clients: Iframe
    /**我们把每个client当成是一个观察者，新建一个server进行批量操作 */
    server: Server
    isWorker: boolean // 是否用于线程中
    constructor(clients: IClients, protected opts: Partial<IPCSpace.IOptions> = {}) {
        this.clients = this.formatClients(clients)
        this.isWorker = this.clients.every(it => it instanceof Worker)
        this.create(this.opts)
    }
    /**
     * 将iframe选择器转换成element对象
     * @param _clients 
     * @returns 
     */
    formatClients(_clients: IClients) {
        return _clients.map((it) => formatToIframe(it)) as Iframe
    }
    /**
     * 批量操作，核心操作
     * @param fn Server的函数
     * @param arr clients列表，默认全选
     * @param hook 数组操作函数
     * @returns 
     */
    protected batchOperation(fn, arr = this.clients, hook = "forEach") {
        const __clients = arr[hook]((it) => {
            this.server.target = it
            return fn(this.server)
        })
        this.server.target = null // 操作过后清空操作对象，函数内部产生闭包，可以正常运行
        return __clients
    }
    /**
     * 创建server，将批量操作功能放进了batchOperation中，与上一版相比节省资源，只需创建一个server即可
     */
    private create(opts) {
        this.server = new Server(opts)
    }
    /**
     * 子页面加载完毕
     * @returns 
     */
    load() {
        return Promise.all(this.batchOperation(it => it.load(), undefined, "map"))
    }
    /**
     * 挂载页面
     * @returns 
     */
    connect() {
        this.disconnect()
        if (this.isWorker) {
            // Worker的target是self而不是window，所以需要单独处理
            this.batchOperation(it => it.target.addEventListener('message', this.message))
        } else {
            this.server.mount()
            this.server.mount(this.message)
        }
        return this
    }
    /**
     * 卸载页面
     * @returns 
     */
    disconnect() {
        if (this.isWorker) {
            this.batchOperation(it => it.target.removeEventListener('message', this.message))
        } else {
            this.server.unMount()
            this.server.unMount(this.message)
        }
        return this
    }
    /**
     * 重置页面
     * @returns P2P
     */
    reset() {
        this.disconnect()
        this.server.reset()
        return this
    }
    /**
     * 消息接收钩子
     * @param e 
     */
    protected message = (e) => {
        const { data, source, target } = e
        // 线程与窗口取值不同
        let __target = source?.frameElement
        if (this.isWorker) {
            __target = target
            this.server.handleMessage(e)
        }
        this.broadcast(data, this.filterSelf(__target))
    }
    /**
     * 过滤当前页面，不发给自己
     * @param self 当前页面，即发送消息的子页面
     * @returns 
     */
    protected filterSelf(self) {
        return this.clients.filter(it => it !== self)
    }
    /**
     * 广播
     * @param param0 
     * @param clients // 发送给哪些列表
     */
    broadcast({ type, id, data }, clients?: Iframe) {
        this.batchOperation(it => it.send({ type, data, id }), clients)
    }
    /**
     * 批量执行函数
     * @param param0 
     * @param clients 
     */
    invoke({ type, id, data }, clients?: Iframe) {
        this.batchOperation(it => it.invokeHandler({ type, data, id }), clients)
    }
}
```

**功能演示**
--------

## **基础功能**

### **父子通信**

**父子双向通信，通过 Server 类与 Client 类通过关联直接发送消息**

```JavaScript
// 父页面 index.html
const server = new Server({
  target: "#son",
});
// 监听 "msg" 事件
server.on("msg", console.log.bind(null, "parent收到消息"));
// 挂载并加载服务
await server.mount().load();
// 发送 "msg" 消息
server.send({ type: "msg", data: { name: "parent" } });
 
// 子页面 son.html
const client = new Client({
  target: window.parent,
});
// 建立连接
client.mount();
// 监听 "msg" 事件
client.on("msg", console.log.bind(null, "son收到消息"));
// 发送 "msg" 消息
client.send({ type: "msg", data: { name: "son" } });
```

### **兄弟通信**

**同一个父页面下的两个子页面称为兄弟页面，我们可以使用 PeerToPeer 类建立新的连接**

```JavaScript
// 父页面 index.html
// 建立多点连接
const peer = new PeerToPeer(["#son2", "#son"]);
// 开启连接
peer.connect();
// 等待子页面加载
await peer.load();
// 加载完成，群发消息
peer.broadcast({ type: "load:finish" });
 
// 子页面1 son1.html
const client = new Client({
  target: window.parent,
});
client.mount();
client.on("msg", console.log.bind(null, "son收到消息"));
// 等待所有页面加载完成
client.on("load:finish", () => {
  client.send({ type: "msg", data: { name: "son" } });
});
 
// 子页面2 son2.html
const client = new Client({
  target: window.parent,
});
client.mount();
client.on("msg", console.log.bind(null, "son2收到消息"));
client.on("load:finish", () => {
  client.send({ type: "msg", data: { name: "son2" } });
});
```

### **父子兄弟通信**

**父子兄弟的通信是进阶的用法，在上面的兄弟通信页面基础上添加消息接收即可监听消息，发送消息可以使用 peer.broadcast 实现**

```JavaScript
// 父页面收发消息
peer.server.on("msg", console.log.bind(null, "parent收到消息"));
peer.broadcast({ type: "msg", data: { name: "parent" } });
```

 **![[assets/7688fc97536d5f82b357c595e024f1f7_MD5.png]]**

### **线程通信**

**除此之外 js-ipc 还支持 js 的线程 worker 通信，下面是个例子，与 iframe 不同的是 Client 中传入的目标和当前源都是 self，在主线程中 peer 传入的列表也是 Worker 对象**

```JavaScript
// index.js
const worker1 = new Worker("./worker1.js", { type: "module" });
const worker2 = new Worker("./worker2.js", { type: "module" });
const peer = new PeerToPeer([worker1, worker2]);
peer.connect();
peer.server.on("msg", console.log.bind(null, "parent收到消息"));
 
// worker1.js
const client = new Client({
  target: self,
  source: self,
});
// 建立连接
client.mount();
// 监听 "msg" 事件
client.on("msg", console.log.bind(null, "worker1收到消息"));
 
// worker2.js 同worker1
```

## **其他功能**

### **函数调用**

**函数调用实际是一个发送消息的拓展，通过 invokeHandler 方法调用对方的函数**

```JavaScript
// 父页面
const server = new Server({
  target: "#son",
  handlers: {
    // 父页面的处理函数
    log: console.log,
  },
});
 
 
// 子页面
client.invokeHandler({ type: "log", data: ["log"] });
```

### **索引标识**

**当页面较多时可以通过 id 进行信息标识，避免消息发送错乱**

```JavaScript
// 父页面
const server = new Server({
  target: "#son",
  id: 12,// 通过id标识发送的消息
});
 
 
// 子页面
const client = new Client({
  target: window.parent,
  id: 12,// 子页面不加id就收不到消息
});
```

### **卸载页面**

**使用 unMount 取消当前页面的监听，取消挂载**

```JavaScript
client.unMount();

```

### **重置页面**

**使用 reset 函数对页面初始化，重置所有信息**

```JavaScript
client.reset()

```

### **批量执行**

**批量执行函数 invoke 是在 peer.broadcast 的基础上实现的，比如我们调用所有包含 son4Info 的子页面中的此函数**

```JavaScript
peer.invoke({ type: "son4info", data: ["parent"] });

```

**父页面通过 P2P 注册函数**

```JavaScript
const peer = new PeerToPeer(["#son4", "#son5"], {
  handlers: {
    parentLog: console.log,
  },
});
```

### **批量操作**

**批量对子页面重置，卸载，挂载，监听加载**

```JavaScript
const peer = new PeerToPeer(["#son4", "#son5"]);
await peer.reset().disconnect().connect().load();
peer.broadcast({ type: "load:finish" });
```

**总结**
------

**以上就是文章全部内容了，本文介绍了 iframe 和 worker 通过 postMessage 与 onmessage 进行通信，并基于此特性实现了进程通信的功能：IPC，在 IPC 类的基础上我们做了拓展，衍生出 Server 和 Client 分别对应着服务端和客户端的操作，此外我们还实现了端对端的批量操作 P2P 功能并对以上功能进行了演示。**

**感谢你看到最后，希望文章对你有帮助，如果觉得文章还不错的话，还请三连支持一下，感谢！**

**源码：[js-ipc: JavaScript 通信工具包，支持 Iframe 和 Worker 通信](https://gitee.com/DieHunter/js-ipc "js-ipc: JavaScript通信工具包，支持Iframe和Worker通信")**

**或：[myCode: 基于 js 的一些小案例或者项目](https://gitee.com/DieHunter/myCode "myCode: 基于js的一些小案例或者项目") 的 js-ipc 子模块**

**NPM：[js-ipc - npm](https://www.npmjs.com/package/js-ipc "js-ipc - npm")**
