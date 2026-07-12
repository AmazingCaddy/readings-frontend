// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  learningSidebar: [
    'intro',
    'roadmap',
    {
      type: 'category',
      label: '内容规范',
      items: ['standards/article-template']
    },
    {
      type: 'category',
      label: '浏览器与 Web 基础',
      link: { type: 'doc', id: 'modules/browser/index' },
      items: [
        'modules/browser/rendering-pipeline',
        'modules/browser/event-loop',
        'modules/browser/http-cache',
        'modules/browser/web-security'
      ]
    },
    {
      type: 'category',
      label: 'HTML & CSS 基础能力',
      link: { type: 'doc', id: 'modules/html-css/index' },
      items: [
        'modules/html-css/layout-bfc',
        'modules/html-css/semantic-accessibility',
        'modules/html-css/cascade-specificity',
        'modules/html-css/responsive-container-query'
      ]
    },
    {
      type: 'category',
      label: 'JavaScript 与 TypeScript 深入',
      link: { type: 'doc', id: 'modules/javascript-typescript/index' },
      items: [
        'modules/javascript-typescript/prototype-closure',
        'modules/javascript-typescript/async-error-concurrency',
        'modules/javascript-typescript/typescript-type-system',
        'modules/javascript-typescript/modules-tree-shaking',
        'modules/javascript-typescript/memory-gc'
      ]
    },
    {
      type: 'category',
      label: 'React 与现代 UI 架构',
      link: { type: 'doc', id: 'modules/react/index' },
      items: [
        'modules/react/rendering-model',
        'modules/react/hooks-principles',
        'modules/react/state-management',
        'modules/react/performance-optimization',
        'modules/react/forms',
        'modules/react/component-design'
      ]
    },
    {
      type: 'category',
      label: '前端工程化',
      link: { type: 'doc', id: 'modules/engineering/index' },
      items: [
        'modules/engineering/bundlers',
        'modules/engineering/compiler-boundaries',
        'modules/engineering/css-engineering',
        'modules/engineering/source-map-release',
        'modules/engineering/monorepo-package-management',
        'modules/engineering/testing-ci'
      ]
    },
    {
      type: 'category',
      label: '性能优化',
      link: { type: 'doc', id: 'modules/performance/index' },
      items: [
        'modules/performance/core-web-vitals',
        'modules/performance/first-screen',
        'modules/performance/assets-third-party',
        'modules/performance/long-tasks-worker-virtual-list',
        'modules/performance/monitoring-analytics'
      ]
    },
    {
      type: 'category',
      label: '前端可靠性与数据流',
      link: { type: 'doc', id: 'modules/reliability/index' },
      items: [
        'modules/reliability/request-state-race',
        'modules/reliability/optimistic-idempotency',
        'modules/reliability/frontend-backend-cache',
        'modules/reliability/realtime-communication',
        'modules/reliability/offline-weak-network-error-boundary'
      ]
    },
    {
      type: 'category',
      label: '前端架构与系统设计',
      link: { type: 'doc', id: 'modules/architecture/index' },
      items: [
        'modules/architecture/permission-routing',
        'modules/architecture/micro-frontend-bff',
        'modules/architecture/low-code-large-table'
      ]
    },
    {
      type: 'category',
      label: '面试与项目实践',
      link: { type: 'doc', id: 'modules/interview/index' },
      items: [
        'modules/interview/day-plan',
        'modules/interview/project-retrospective',
        'modules/interview/system-design-template'
      ]
    }
  ]
};

module.exports = sidebars;
