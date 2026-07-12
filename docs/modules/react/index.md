---
sidebar_label: 总览
---

# React 与现代 UI 架构

本模块关注 React 的渲染模型、Hooks、状态管理、复杂交互和组件架构。目标不是背 API，而是能解释状态变化如何转化成 UI 更新，以及大型 React 项目如何保持可维护。

## 计划文章

- [React 渲染模型：render、commit、Fiber 和并发渲染基础](./rendering-model.md)。
- [Hooks 原理：调用顺序、闭包、依赖数组和副作用边界](./hooks-principles.md)。
- 状态管理：本地状态、Context、Redux/Zustand、Server State。
- 表单设计：受控、非受控、校验、异步提交和错误恢复。
- 列表与虚拟滚动：大数据渲染、动态高度和滚动体验。
- 复杂交互组件：弹窗、下拉、拖拽、快捷键和可访问性。
- 组件设计：组合、插槽、Headless 组件和抽象边界。

## 面试目标

能把 React 原理落到项目场景：为什么重渲染、为什么 effect 依赖出错、为什么 Context 变慢、为什么列表状态错位、如何设计可复用组件。
