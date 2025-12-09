import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ChatWidget from '@site/src/components/ChatWidget';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={clsx('hero__title', styles.mainTitle)}>
            Physical AI
          </Heading>
          <p className={clsx('hero__subtitle', styles.subTitle)}>
            Build the Body. Code the Brain. The World's First Spec-Driven Course on Physical AI & Humanoid Robotics.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg glow-element"
              to="/docs/module-01-ros2/architecture">
              Start Learning (Module 1)
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              View Syllabus
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({ title, emoji }: { title: string; emoji: string }) {
  return (
    <div className="col col--4">
      <div className={clsx('card', styles.featureCard)}>
        <div className="card__body text--center">
          <div className={styles.emoji}>{emoji}</div>
          <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
        </div>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <FeatureCard
            title="🤖 Embodied Intelligence"
            emoji="🤖"
          />
          <FeatureCard
            title="🧠 Spec-Driven Development"
            emoji="🧠"
          />
          <FeatureCard
            title="⚡ Sim-to-Real Transfer"
            emoji="⚡"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Textbook - The World's First Spec-Driven Course on Physical AI & Humanoid Robotics">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <ChatWidget />
    </Layout>
  );
}
