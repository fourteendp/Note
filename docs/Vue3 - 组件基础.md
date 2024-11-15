---
title: Vue3 - 组件基础
uid: 20240123112806884
aliases: []
categories:
  - 前端/Vue3
tags: []
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-05 08:51:46
---

## 注意

- defineProps 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入,在 `<script setup>`
  中，`props` 选项会被自动转换为 `defineProps` 调用
- defineEmits 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入,在 `<script setup>`
  中，`emits` 选项会被自动转换为 `defineEmits` 调用
- 上面的两个编译宏命令，都是在编译阶段被转换为普通的对象，所以在运行时，它们不会被包含在最终的组件定
  义中
- 在 JSX 中不可用，只有在 `<script setup>` 中可用

## Props

什么是 props：props 是父组件用来传递数据给子组件的一种自定义属性。子组件内部无法控制这些值的变化，只

能接受父组件传递过来的值。

### Emit

什么是 emit：emit 是子组件向父组件传递数据的一种方式。子组件可以通过 emit 向父组件传递数据，父组件可

以通过监听子组件的事件来获取子组件传递过来的数据。

### Slots

什么是 slots：slots 是父组件向子组件传递内容的一种方式。父组件可以通过 slots 向子组件传递内容，子组

件可以通过 slots 获取父组件传递过来的内容。

### CODE

```tsx
import { defineComponent, h, PropType, resolveComponent } from "vue"

const A = defineComponent({
  name: "A",
  setup() {
    return () => <div>A</div>
  },
})

const B = defineComponent({
  name: "B",
  setup() {
    return () => <div>B</div>
  },
})

export default defineComponent({
  name: "ComponentBasics",
  meta: {
    title: "组件基础",
  },
  components: {
    A: A,
    B: B,
  },
  setup() {
    let count = $ref(0)
    let childCount = $ref(0)
    const tabs = $ref([
      { label: "动态组件A", name: "A", component: A },
      { label: "动态组件B", name: "B", component: B },
    ])
    let currentTabIdx = $ref(0)
    return () => (
      <div class="flex">
        <div class="mockup-phone">
          <div class="camera"></div>
          <div class="display">
            <div class="artboard artboard-demo phone-1">
              我是父组件
              <h2>我是子组件的数值:{childCount}</h2>
              <div class="text-center">
                <button class="btn btn-primary" onClick={() => count++}>
                  点击我
                </button>
                <div class="mt-2">
                  <span>点击次数：</span>
                  <span>{count}</span>
                </div>
              </div>
              <div class="tabs">
                {tabs.map((tab, index) => {
                  return (
                    <a
                      class={[
                        "tab",
                        {
                          "tab-active": index === currentTabIdx,
                        },
                      ]}
                      onClick={() => {
                        currentTabIdx = index
                      }}
                    >
                      {tab.label}
                    </a>
                  )
                })}
              </div>
              <div class="tab-content">
                {/* 动态组件JSX */}
                {h(resolveComponent(tabs[currentTabIdx].name))}
              </div>
            </div>
          </div>
        </div>
        <ChildComponent
          msg={count}
          onUpdate={(val) => {
            childCount = val
          }}
        />
        <ChildComponentSlot
          v-slots={{
            default: () => <div>我是插槽内容Default</div>,
            header: () => <div>我是插槽内容Header</div>,
            footer: () => <div>我是插槽内容Footer</div>,
          }}
        ></ChildComponentSlot>
      </div>
    )
  },
})
const ChildComponent = defineComponent({
  name: "ChildComponent",
  props: {
    msg: {
      type: [String, Number] as PropType<string | number>,
      default: "",
    },
  },
  emits: ["update"],
  setup(props, { emit }) {
    let count = $ref(0)

    const updateMsg = (val: string | number) => {
      emit("update", val)
    }
    return () => (
      <div>
        <div class="mockup-phone">
          <div class="camera"></div>
          <div class="display">
            <div class="artboard artboard-demo phone-1">
              我是子组件
              <h2>我是父组件的数值:{props.msg}</h2>
              <div class="text-center">
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    count++
                    updateMsg(count)
                  }}
                >
                  点击我
                </button>
                <div class="mt-2">
                  <span>点击次数：</span>
                  <span>{count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

const ChildComponentSlot = defineComponent({
  name: "ChildComponentSlot",
  emits: ["update"],
  setup(_, { slots }) {
    return () => (
      <div>
        <div class="mockup-phone">
          <div class="camera"></div>
          <div class="display">
            <div class="artboard artboard-demo phone-1">
              我是插槽子组件
              <div>
                {slots.header && slots.header()}
                {slots.default && slots.default()}
                {slots.footer && slots.footer()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
```

## 参考

- [defineProps](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineprops)
- [defineEmits](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineemits)
- [组件基础](https://v3.cn.vuejs.org/guide/component-basics.html#%E7)
