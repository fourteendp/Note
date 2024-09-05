---
title: 使用 vite 搭建 vue3 项目
uid: 20240123112807210
aliases: []
categories: []
tags:
  - 计算机/前端/工程化
  - 计算机/前端/JavaScript
  - 计算机/前端/Vue
  - 计算机/前端/Vue3
  - 编程语言/TypeScript
archive: false
draft: false
todo: false
publishUrl:
  - "https://juejin.cn/post/7231016319863521337"
createTime: 2023-05-07 22:01:31
updateTime: 2024-08-02 13:59:50
---

使用 Vite 创建项目，项目并不像 Vue CLI 创建的项目那样，可以选择 Router、Vuex 等，而是直接创建一个空

项目，然后再根据需要安装依赖。

## 安装 pnpm (可选) 创建 vite 项目

> pnpm 是一个快速、高效的包管理器，它可以在一个项目中安装多个版本的相同包。它还可以在一个项目中安装
> 多个不同版本的相同包。

```bash
npm install -g pnpm
pnpm create vite
```

## 选择 Vue 和 TypeScript

```bash
? Project name: Demo
? Select a framework: vue
? Select a variant: vue-ts
```

## 安装依赖启动项目

```bash
cd Demo
pnpm install
pnpm dev
```

## 添加 tsx 支持

```bash
pnpm add -D @vitejs/plugin-vue-jsx
```

- 在 `vite.config.ts` 中 `plugins.plugins` 添加 `vueJsx()`。

## 添加 router

```bash
pnpm add vue-router
```

- 在 `src` 目录下创建 `router` 目录，创建 `index.ts` 文件。

```ts
import { createRouter, createWebHistory } from "vue-router"

const routes = []

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

- 在 `main.ts` 中引入 `router` 并使用。

```ts
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

createApp(App).use(router).mount("#app")
```

- 在 `App.vue` 中使用 `<router-view />`。
- 添加别名 `@` 指向 `src` 目录。

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
```

- tsconfig.json 中添加 `"baseUrl": "."` 和`"paths": { "@/*": ["src/*"] }

## 添加 pinia

```bash
pnpm add pinia
```

- 在 `src` 目录下创建 `store` 目录，创建 `index.ts` 文件。

```ts
import { createPinia } from "pinia"

export const pinia = createPinia()
```

- 在 `main.ts` 中引入 `pinia` 并使用。

```ts
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { pinia } from "./store"

createApp(App).use(router).use(pinia).mount("#app")
```

## 添加 tailwindcss

```bash
  pnpm add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

- 初始化 tailwindcss 配置文件。

```bash
pnpm tailwindcss init -p
```

VSCode 安装插件 `Tailwind CSS IntelliSense`。

- 在 `tailwind.config.js` 中添加 `purge`。

```js
// tailwind.config.js
module.exports = {
  purge: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

- 在 `index.css` 中引入 tailwindcss。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- `Unknown at rule @tailwind` 解決方式

VSCode 安装插件 `PostCSS Language Support`。

- 全局引入 tailwindcss

```ts
// main.ts
import "./index.css"
```

## 参考

- [Vite 中文文档](https://cn.vitejs.dev/guide/)
- [pnpm](https://pnpm.io/)
- [pinia](https://pinia.esm.dev/)
- [vue-router](https://next.router.vuejs.org/zh/)
- [daisui](https://daisyui.com/)
- [tailwindcss](https://tailwindcss.com/)
- [babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx)
