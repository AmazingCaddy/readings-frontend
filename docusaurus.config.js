// @ts-check

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Frontend Advanced Readings',
  tagline: '系统补齐前端深度，准备中高级前端面试',
  url: 'https://wenbin.github.io',
  baseUrl: '/readings-frontend/',

  organizationName: 'wenbin',
  projectName: 'readings-frontend',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN']
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs'
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Frontend Readings',
        items: [
          { type: 'docSidebar', sidebarId: 'learningSidebar', position: 'left', label: '学习资料' },
          { to: '/docs/roadmap', label: '路线图', position: 'left' },
          { href: 'https://github.com/wenbin/readings-frontend', label: 'GitHub', position: 'right' }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '学习模块',
            items: [
              { label: '浏览器与 Web 基础', to: '/docs/modules/browser/' },
              { label: 'React 与现代 UI 架构', to: '/docs/modules/react/' },
              { label: '面试与项目实践', to: '/docs/modules/interview/' }
            ]
          },
          {
            title: '项目',
            items: [
              { label: 'GitHub', href: 'https://github.com/wenbin/readings-frontend' }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Frontend Advanced Readings.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'typescript', 'tsx']
      }
    })
};

module.exports = config;
