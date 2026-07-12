---
sidebar_label: 构建工具流程
---

# Vite、Webpack 和 Rspack：构建流程与工程边界

## 场景

项目从几十个文件增长到几千个模块后，前端不再是浏览器直接加载源码。你需要处理 TypeScript、JSX、CSS Modules、图片、环境变量、代码分割、兼容性、Source Map 和产物缓存。

常见问题包括：

- 本地启动慢，改一行代码要等很久。
- 生产包过大，首屏加载慢。
- Tree shaking 没生效，未使用代码还在产物里。
- 环境变量在本地和线上不一致。
- Source Map 泄露源码，或者线上报错无法定位。

构建工具解决的是“源码如何变成可发布产物”的问题。

## 是什么

构建工具会从入口文件出发，解析模块依赖图，对不同资源执行转换、打包、优化和输出。

```mermaid
flowchart LR
  A[入口文件] --> B[解析依赖图]
  B --> C[加载与转换: TS/JSX/CSS/图片]
  C --> D[优化: tree shaking/压缩/分包]
  D --> E[输出产物]
  E --> F[部署到 CDN 或服务器]
```

Webpack 是成熟的通用打包器，生态完整，配置能力强。Vite 开发环境基于浏览器原生 ESM 和快速转译，生产构建默认使用 Rollup。Rspack 兼容 Webpack 生态，使用 Rust 实现，目标是提升大型项目构建性能。

## 为什么需要

现代前端源码并不能直接高质量运行在线上。浏览器不理解部分高级语法或项目约定，也无法自动帮你做模块合并、压缩、分包、hash 命名和兼容性处理。

构建工具带来几个关键能力：

- 开发体验：本地 dev server、HMR、错误定位。
- 语言转换：TypeScript、JSX、新语法降级。
- 资源处理：CSS、图片、字体、SVG、Worker。
- 产物优化：Tree shaking、压缩、代码分割、缓存 hash。
- 发布支撑：环境变量、Source Map、构建分析。

## 推荐做法

### 1. 区分开发构建和生产构建

开发环境关注启动速度和热更新；生产构建关注体积、兼容性、缓存和稳定性。

Vite 快的核心原因是开发阶段不预先打包全部业务源码，而是让浏览器按需请求 ESM 模块。依赖预构建主要处理 CommonJS、依赖数量和请求性能问题。

### 2. 用产物 hash 配合缓存策略

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
});
```

带 hash 的产物可以长缓存，HTML 负责引用新版本资源。

### 3. 让 Tree shaking 有生效条件

Tree shaking 依赖 ESM 静态结构，并要求模块没有不可分析副作用。

```json
{
  "sideEffects": ["*.css"]
}
```

库项目要谨慎声明 `sideEffects: false`。如果模块确实有全局副作用，错误声明会导致代码被删掉。

### 4. 生产 Source Map 分级管理

Source Map 能帮助线上定位，但公开源码有风险。常见做法是构建生成 Source Map，上传到监控平台后不公开访问。

```ts
export default defineConfig({
  build: {
    sourcemap: true
  }
});
```

部署时可以只上传 JS/CSS 到 CDN，把 `.map` 文件上传到 Sentry 等平台。

## 代码示例

下面是一个简化 Vite 配置，覆盖 React、路径别名、环境变量和构建分析入口。

```ts
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    },
    build: {
      sourcemap: env.VITE_UPLOAD_SOURCEMAP === 'true',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom']
          }
        }
      }
    }
  };
});
```

这不是通用最佳配置，而是说明配置应该服务于明确目标：开发效率、路径约定、版本注入、Source Map 管理和缓存分包。

## 反例与后果

### 反例 1：所有依赖打成一个包

后果：首屏 JS 过大，任何业务小改动都可能导致大 bundle hash 变化，缓存收益降低。

### 反例 2：环境变量无前缀随意注入

后果：可能把服务端密钥、内部配置打进前端产物。前端环境变量本质上是公开的。

### 反例 3：线上公开 Source Map

后果：用户可以直接还原源码，增加安全和版权风险。

### 反例 4：盲目迁移构建工具

后果：构建速度可能变快，但插件兼容、产物差异、部署脚本和监控链路都可能出问题。迁移要有指标和回滚方案。

## 常见坑

- Vite 开发快不等于生产构建一定更快，生产仍要看 Rollup 插件和项目规模。
- TypeScript 类型检查通常不等于转译。很多工具只转译，不做完整 type check。
- Tree shaking 对 CommonJS 支持有限，优先使用 ESM 版本依赖。
- 环境变量会被打进产物，不能放秘密。
- Source Map、压缩、polyfill、目标浏览器会显著影响构建时间和产物大小。

## 排查与验证

### 启动慢

检查依赖预构建、插件耗时、monorepo 链接包、TypeScript 项目引用和本地文件监听范围。

### 产物大

用 bundle analyzer 查看大模块来源。确认是否重复依赖、全量引入组件库、moment locale、图标库或编辑器 SDK。

### Tree shaking 不生效

检查依赖是否 ESM、是否有副作用声明、是否使用动态访问导致静态分析失败。

### 线上报错无法定位

检查构建是否生成 Source Map、部署版本是否和监控版本匹配、上传流程是否在发布前完成。

## 面试怎么讲

30 秒版本：

> 构建工具会从入口解析依赖图，对 TS、JSX、CSS 和资源做转换，再做 Tree shaking、压缩、分包和 hash 输出。Webpack 生态成熟配置强，Vite 开发环境利用原生 ESM 和快速转译提升启动和 HMR，生产默认用 Rollup。

1 分钟版本：

> 我会把构建分成开发体验和生产产物两部分。开发看启动速度、HMR 和错误定位；生产看包体积、缓存、兼容性、Source Map 和部署稳定性。排查产物大时用分析工具找具体模块，排查 Tree shaking 时看 ESM 和副作用声明，Source Map 则要上传到监控平台但不要公开。

追问版本：

> 如果问 Vite 为什么快，我会说它开发阶段不把全部源码预打包，而是利用浏览器 ESM 按需加载源码，依赖用 esbuild 预构建，HMR 只更新受影响模块。相比之下 Webpack dev 往往要维护更完整的打包图。选型时我不会只看速度，还会看插件生态、历史配置、SSR、monorepo 和团队迁移成本。

## 延伸阅读

- [Vite Guide](https://vite.dev/guide/)
- [Webpack Concepts](https://webpack.js.org/concepts/)
- [Rollup Tutorial](https://rollupjs.org/tutorial/)
- [Rspack Guide](https://rspack.dev/guide/)
- [MDN: Source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map)
