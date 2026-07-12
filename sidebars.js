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
      items: []
    },
    {
      type: 'category',
      label: 'JavaScript 与 TypeScript 深入',
      link: { type: 'doc', id: 'modules/javascript-typescript/index' },
      items: []
    },
    {
      type: 'category',
      label: 'React 与现代 UI 架构',
      link: { type: 'doc', id: 'modules/react/index' },
      items: ['modules/react/rendering-model']
    },
    {
      type: 'category',
      label: '前端工程化',
      link: { type: 'doc', id: 'modules/engineering/index' },
      items: []
    },
    {
      type: 'category',
      label: '性能优化',
      link: { type: 'doc', id: 'modules/performance/index' },
      items: []
    },
    {
      type: 'category',
      label: '前端可靠性与数据流',
      link: { type: 'doc', id: 'modules/reliability/index' },
      items: []
    },
    {
      type: 'category',
      label: '前端架构与系统设计',
      link: { type: 'doc', id: 'modules/architecture/index' },
      items: []
    },
    {
      type: 'category',
      label: '面试与项目实践',
      link: { type: 'doc', id: 'modules/interview/index' },
      items: []
    }
  ]
};

module.exports = sidebars;
