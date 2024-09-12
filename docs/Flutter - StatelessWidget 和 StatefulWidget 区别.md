---
title: Flutter - StatelessWidget 和 StatefulWidget 区别
uid: 1723015489164
aliases: []
categories: []
tags:
  - 计算机/前端/Flutter
archive: false
draft: false
todo: false
createTime: 2024-08-07 15:24:49
updateTime: 2024-09-12 08:13:24
---

## StatelessWidget

- `StatelessWidget` 是一种无状态的 Widget，意味着它不会根据用户交互或其他因素改变其状态。
- 它通常用于创建那些不需要改变状态的 UI 组件，比如静态文本、图片等。
- 因为 `StatelessWidget` 不包含状态，所以它更加轻量级，并且可以被快速地重建。
- 使用 `StatelessWidget` 时，你不需要关心状态管理，因为它不会存储任何状态信息。

## StatefulWidget

- `StatefulWidget` 是一种有状态的 Widget，它可以根据用户交互或其他因素改变其状态。
- 它适用于创建那些需要响应用户输入或数据变化的 UI 组件，比如按钮、表单、列表等。
- `StatefulWidget` 包含一个与之关联的 `State` 对象，这个 `State` 对象负责管理 Widget 的状态。
- 当 `StatefulWidget` 的状态发生变化时，它的 `State` 对象会通知 Flutter 框架重建 Widget，以反映新的状态。

## 区别

1. **状态管理**：`StatelessWidget` 不管理状态，而 `StatefulWidget` 通过其 `State` 对象管理状态。
2. **性能**：由于 `StatelessWidget` 不需要处理状态变化，通常比 `StatefulWidget` 更快重建。
3. **用途**：`StatelessWidget` 适用于不需要用户交互或数据变化的静态组件；`StatefulWidget` 适用于需要响应用户操作或数据变化的动态组件。
4. **生命周期**：`StatefulWidget` 有更复杂的生命周期，包括创建、更新状态和销毁等过程。
