import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const modules = [
  {
    title: '浏览器与 Web 基础',
    description: '从渲染、事件循环、缓存、跨域和安全策略理解 Web 平台。',
    link: '/docs/modules/browser/'
  },
  {
    title: 'React 与现代 UI 架构',
    description: '深挖渲染模型、Hooks、状态管理、性能优化和组件设计。',
    link: '/docs/modules/react/'
  },
  {
    title: '前端工程化',
    description: '整理构建、依赖、质量、测试、CI 和发布链路。',
    link: '/docs/modules/engineering/'
  },
  {
    title: '面试与项目实践',
    description: '把原理、实战方案和项目复盘转化成可追问的面试表达。',
    link: '/docs/modules/interview/'
  }
];

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className="container">
        <p className={styles.eyebrow}>Frontend Advanced Readings</p>
        <Heading as="h1" className={styles.heroTitle}>
          前端开发进阶学习资料
        </Heading>
        <p className={styles.heroSubtitle}>
          面向有开发经验的前端学习者，系统整理核心概念、工程实践、真实问题和中高级面试表达。
        </p>
        <div className={styles.actions}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            开始阅读
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/roadmap">
            查看路线图
          </Link>
        </div>
      </div>
    </header>
  );
}

function ModuleCards() {
  return (
    <section className={styles.modules}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">学习模块</Heading>
          <p>先建立完整知识地图，再按主题沉淀标准文章和面试答案。</p>
        </div>
        <div className={styles.grid}>
          {modules.map((module) => (
            <Link className={styles.card} to={module.link} key={module.title}>
              <Heading as="h3">{module.title}</Heading>
              <p>{module.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="前端开发进阶学习资料"
      description="系统补齐前端深度，准备中高级前端面试"
    >
      <HomepageHeader />
      <main>
        <ModuleCards />
      </main>
    </Layout>
  );
}
