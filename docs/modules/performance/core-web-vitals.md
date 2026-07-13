---
sidebar_label: Core Web Vitals
---

# Core Web Vitals：LCP、INP、CLS 与 TTFB

## 场景

你负责一个营销落地页和一个后台系统。业务反馈两类问题：

- 落地页打开慢，广告投放转化率下降。
- 后台页面输入和筛选卡顿，用户觉得系统“不跟手”。

开发团队已经做了压缩、懒加载和接口优化，但效果不好，因为没有统一指标。有人说首屏慢，有人说接口慢，有人说 React 慢，最后变成凭感觉优化。

Core Web Vitals 的价值是把用户体验拆成可观测指标：加载是否快、交互是否及时、布局是否稳定。

## 是什么

Core Web Vitals 是 Google 用来衡量 Web 用户体验的一组核心指标。当前核心指标是 LCP、INP 和 CLS，TTFB 通常作为定位加载问题的重要诊断指标一起观察：

- LCP：Largest Contentful Paint，最大内容绘制，衡量主要内容加载速度。
- INP：Interaction to Next Paint，交互到下一次绘制，衡量交互响应速度。
- CLS：Cumulative Layout Shift，累积布局偏移，衡量页面视觉稳定性。
- TTFB：Time to First Byte，首字节时间，衡量服务器和网络响应起点，是 LCP 的重要诊断指标。

```mermaid
flowchart LR
  A[用户访问页面] --> B[TTFB: 收到首字节]
  B --> C[LCP: 主要内容绘制]
  C --> D[用户点击/输入]
  D --> E[INP: 下一次绘制完成]
  A --> F[CLS: 页面生命周期内布局偏移]
```

这些指标不是孤立的。TTFB 差会拖累 LCP；大 JavaScript 长任务会影响 INP；图片和广告位无尺寸会影响 CLS。

## 为什么需要

没有指标，性能优化容易走偏。

例如你压缩了一个非首屏图片，但 LCP 元素其实是 hero 文案；你优化了接口耗时，但真正卡顿来自主线程长任务；你减少了 React 渲染次数，但 CLS 来自图片无尺寸。

Core Web Vitals 强迫优化过程回到用户感知：用户什么时候看到主要内容、什么时候能顺畅交互、页面是否稳定。

## 推荐做法

### 1. 先区分实验室数据和真实用户数据

Lighthouse 是实验室数据，适合本地定位和回归。真实用户监控 RUM 才能看到不同设备、网络、地区和用户行为下的表现。

```ts
import { onCLS, onINP, onLCP, onTTFB } from 'web-vitals';

function sendMetric(metric: { name: string; value: number; id: string }) {
  navigator.sendBeacon('/analytics/web-vitals', JSON.stringify(metric));
}

onLCP(sendMetric);
onINP(sendMetric);
onCLS(sendMetric);
onTTFB(sendMetric);
```

真实项目中还需要带上页面路径、设备类型、网络信息、版本号和用户分组，便于定位。

### 2. LCP 优化主要内容路径

LCP 常见元素是 hero 图片、首屏大标题、视频封面或主要内容块。

优化方向：

- 降低 TTFB：缓存 HTML、优化服务端渲染、减少重定向。
- 优先加载 LCP 资源：preload hero 图片或关键字体。
- 减少阻塞资源：控制关键 CSS 和首屏 JS。
- 压缩和适配图片：使用合适尺寸、格式和 CDN。

```html
<link rel="preload" as="image" href="/hero.webp" />
<img src="/hero.webp" width="1200" height="630" alt="Product dashboard" />
```

### 3. INP 优化主线程响应

INP 关注用户交互到下一次绘制完成的耗时。常见原因是长任务、同步计算、过大的渲染范围和第三方脚本阻塞。

```ts
async function handleBulkSelect(items: Item[]) {
  setPending(true);

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      window.setTimeout(resolve, 0);
    });
  });

  await processInChunks(items, selectItem, 300);
  setPending(false);
}
```

优化方向：拆分长任务、缩小 React 状态影响范围、虚拟列表、Web Worker、延迟非关键脚本。

### 4. CLS 保持布局稳定

CLS 常见来源是无尺寸图片、广告位动态插入、异步内容撑开布局、字体替换。

```css
.adSlot {
  min-height: 250px;
}

.coverImage {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}
```

为异步内容预留空间，给图片和 iframe 设置尺寸，避免在已有内容上方插入新内容。

## 代码示例

下面是一个性能埋点上报示例，带版本、路径和基础环境信息。

```ts
import { onCLS, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

function reportWebVital(metric: Metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    path: window.location.pathname,
    buildVersion: import.meta.env.VITE_BUILD_VERSION,
    connection: navigator.connection?.effectiveType,
    userAgent: navigator.userAgent
  });

  if (!navigator.sendBeacon('/api/metrics/web-vitals', body)) {
    fetch('/api/metrics/web-vitals', {
      method: 'POST',
      body,
      keepalive: true,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

onLCP(reportWebVital);
onINP(reportWebVital);
onCLS(reportWebVital);
onTTFB(reportWebVital);
```

上报后不要只看平均值。性能指标通常要看 p75，因为少量高端设备会掩盖大量普通用户的问题。

## 反例与后果

### 反例 1：只看本地 Lighthouse 分数

后果：本地网络和设备太理想，无法反映真实用户。上线后低端机、弱网和远距离地区可能表现很差。

### 反例 2：优化非 LCP 图片

后果：图片体积变小了，但 LCP 不变，因为真正的 LCP 元素是首屏大标题或另一个 hero 图。

### 反例 3：在输入事件里做同步大计算

```ts
input.addEventListener('input', () => {
  render(expensiveFilter(hugeList));
});
```

后果：输入响应被长任务阻塞，INP 变差。用户感觉页面卡顿，即使接口很快。

### 反例 4：广告位加载后插入到顶部

后果：页面内容被整体推下，CLS 变差，用户可能误点。

## 常见坑

- FCP 快不代表 LCP 快，用户可能先看到背景色，但主要内容还没出来。
- TTFB 差会拖累 LCP，但 LCP 差不一定都是服务端问题。
- INP 关注整个页面生命周期中交互延迟，不是只看首次交互。
- CLS 只统计非用户预期的布局偏移，用户点击后展开内容通常不算同类问题。
- 平均值容易误导，Web Vitals 通常关注 p75。
- 第三方脚本可能显著影响 INP 和 LCP，不能只看自己代码。

## 排查与验证

### LCP 排查

用 Lighthouse 或 Performance 找到 LCP 元素。看它是文本、图片还是视频封面，再检查 TTFB、资源下载、渲染阻塞和图片尺寸。

### INP 排查

在 Performance 面板录制交互，找 Input 事件后的长任务。重点看脚本执行、React commit、布局计算和第三方脚本。

### CLS 排查

打开 DevTools 的 Layout Shift Regions。观察偏移来源，检查图片尺寸、广告位、异步插入内容和字体加载。

### 线上验证

按页面、设备、网络、地区、版本号切分 p75 指标。优化后比较同类流量，不要拿实验室分数直接证明线上改善。

## 面试怎么讲

30 秒版本：

> Core Web Vitals 主要衡量加载、交互和视觉稳定性。LCP 看主要内容什么时候出现，INP 看交互后多久能反馈，CLS 看页面是否发生意外布局偏移，TTFB 看服务器和网络响应起点。

1 分钟版本：

> 我做性能优化会先采集指标，区分实验室数据和真实用户数据。LCP 差要找 LCP 元素和关键资源路径，INP 差要查主线程长任务和渲染范围，CLS 差要查图片、广告、字体和异步内容是否造成布局偏移。优化后看线上 p75，而不是只看本地 Lighthouse 分数。

追问版本：

> 如果 LCP 慢，我会拆成 TTFB、资源加载、渲染阻塞和元素绘制几个阶段排查；如果 INP 慢，我会录制交互找长任务，考虑任务切片、状态下沉、虚拟列表或 Worker；如果 CLS 高，我会为媒体和广告预留尺寸，避免在已有内容上方插入元素。指标只是入口，最终要能定位到具体链路。

## 延伸阅读

- [web.dev: Core Web Vitals](https://web.dev/articles/vitals)
- [web.dev: Largest Contentful Paint](https://web.dev/articles/lcp)
- [web.dev: Interaction to Next Paint](https://web.dev/articles/inp)
- [web.dev: Cumulative Layout Shift](https://web.dev/articles/cls)
- [web-vitals npm package](https://github.com/GoogleChrome/web-vitals)
