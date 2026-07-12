---
sidebar_label: 总览
---

# JavaScript 与 TypeScript 深入

本模块关注语言运行机制和类型系统。目标是能解释代码为什么这样执行，以及如何用类型系统约束大型项目复杂度。

## 计划文章

- [原型链、闭包、继承与对象模型](./prototype-closure.md)。
- 执行上下文、作用域和调用栈。
- `this` 绑定规则和常见丢失场景。
- [Promise、async/await、异常传播和并发控制](./async-error-concurrency.md)。
- [ESM、CommonJS、Tree Shaking 和循环依赖](./modules-tree-shaking.md)。
- [TypeScript 泛型、类型收窄、条件类型和工程实践](./typescript-type-system.md)。
- 内存泄漏、垃圾回收和性能陷阱。

## 面试目标

能从“语言特性”讲到“工程后果”：异步竞态、闭包旧值、模块副作用、类型边界和内存泄漏。
