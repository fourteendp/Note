---
title: Vue2 - 基于单例模式下实现的Vue全局组件
uid: 1722908561858
aliases: []
categories: 
tags: []
archive: false
draft: false
todo: false
createTime: 2024-08-06 09:42:41
updateTime: 2024-09-12 08:13:21
---

## 基于 Vue.extend() 构造出 vue 子类

[Vue.extend(options)](https://link.juejin.cn?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23Vue-extend "https://cn.vuejs.org/v2/api/#Vue-extend") 用法：使用基础 Vue 构造器，创建一个 " 子类 "。参数是一个包含组件选项的对象。

> 注意：`data` 选项是特例，在 `Vue.extend()` 中它必须是函数

```js
import Vue from "vue";
import Message from "./Message.vue";

const Component = Vue.extend(Message);

let instance = null;

function MessageBox(options) {
    // 单例模式，先判断实例是否存在，保证页面上只存在一个实例组件
    if (!instance) {
        instance = new Component({
            el: document.createElement("div"),
            data() {
                return options;
            }
        });
        document.body.appendChild(instance.$el);
        // 上一步刚挂载dom，因此使用nextick确保dom已更新
        Vue.nextTick(() => {
            instance.visible = true;
        });
    } else {
        // 存在实例，则合并options，更新视图
        instance.visible = true;
        Object.assign(instance, options);
    }
}

// 提供close方法，方便直接调用
MessageBox.close = () => {
    if (instance) {
        instance.visible = false;
    }
};

export default {
    // 提供install方法，便于Vue.use()注册。将方法挂载在Vue原型上，方便全局使用。
    install() {
        Vue.prototype.$message = MessageBox;
    }
};
```
