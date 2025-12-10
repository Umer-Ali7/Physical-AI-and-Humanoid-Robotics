import type {ReactNode} from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useColorMode} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ChatWidget from '@site/src/components/ChatWidget';
import { getSession, User } from '../lib/auth-client';

import styles from './index.module.css';

function HomepageHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={clsx('hero__title', styles.mainTitle)}>
            Physical AI & Humanoid Robotics
          </Heading>
          <p className={clsx('hero__subtitle', styles.subTitle)}>
            Build the Body. Code the Brain. The World's First Spec-Driven Course on Physical AI & Humanoid Robotics.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/module-01-ros2/architecture">
              {isLoggedIn ? 'Continue Reading (Module 1)' : 'Start Reading'}
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              View Syllabus
            </Link>
            {isLoggedIn ? (
              <Link
                className="button button--success button--lg"
                to="/login"
                style={{
                  background: 'linear-gradient(135deg, #a64de6 0%, #8b3cc9 100%)',
                  border: '2px solid #a64de6',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  boxShadow: '0 0 20px rgba(166, 77, 230, 0.4)'
                }}>
                View Profile
              </Link>
            ) : (
              <Link
                className="button button--success button--lg"
                to="/login"
                style={{
                  background: 'linear-gradient(135deg, #00ffff 0%, #00cccc 100%)',
                  border: '2px solid #00ffff',
                  color: '#0a0a0a',
                  fontWeight: 'bold',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
                }}>
                Login / Sign Up
              </Link>
            )}
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


interface Module {
  number: number;
  title: string;
  emoji: string;
  description: string;
  outcomes: string[];
  link: string;
}

const modules: Module[] = [
  {
    number: 1,
    title: 'The Robotic Nervous System',
    emoji: '🧬',
    description: 'Master ROS2 architecture and real-time communication for robotic systems',
    outcomes: [
      'Understand ROS2 nodes, topics, and services architecture',
      'Implement real-time sensor data processing pipelines',
      'Build distributed robotic communication systems',
      'Design scalable robot control architectures'
    ],
    link: '/docs/module-01-ros2/architecture'
  },
  {
    number: 2,
    title: 'The Digital Twin',
    emoji: '🪞',
    description: 'Create photo-realistic simulations for robot testing and validation',
    outcomes: [
      'Build physics-accurate robot simulations in Gazebo',
      'Design URDF/SDF models for robotic systems',
      'Implement sensor simulation (LiDAR, cameras, IMU)',
      'Validate robot behaviors in virtual environments'
    ],
    link: '/docs/module-02-digital-twin/gazebo-setup'
  },
  {
    number: 3,
    title: 'The AI-Robot Brain',
    emoji: '🧠',
    description: 'Integrate AI models with robotic systems for intelligent decision-making',
    outcomes: [
      'Deploy deep learning models on robotic platforms',
      'Implement vision-based object detection and tracking',
      'Build AI-powered navigation and path planning systems',
      'Optimize neural networks for edge devices'
    ],
    link: '/docs/module-03-robot-brain/isaac-sim'
  },
  {
    number: 4,
    title: 'Vision-Language-Action',
    emoji: '👁️',
    description: 'Enable robots to understand language and execute multi-modal tasks',
    outcomes: [
      'Implement vision-language models (VLMs) for robotics',
      'Build voice-controlled robotic interfaces',
      'Create multi-modal perception systems',
      'Deploy large language models for task planning'
    ],
    link: '/docs/module-04-vla/voice-control'
  },
  {
    number: 5,
    title: 'Capstone Project',
    emoji: '🏆',
    description: 'Build and deploy a complete physical AI system from concept to reality',
    outcomes: [
      'Design end-to-end robotic systems',
      'Implement sim-to-real transfer pipelines',
      'Deploy autonomous robots in real-world scenarios',
      'Present and document complete AI-robotics projects'
    ],
    link: '/docs/module-05-capstone/final-project'
  }
];

function ModuleCard({ module, isDark }: { module: Module; isDark: boolean }) {
  const styles = getModuleStyles(isDark);

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.moduleNumber}>
          <span style={styles.emoji}>{module.emoji}</span>
          <span style={styles.number}>MODULE {module.number}</span>
        </div>
        <h3 style={styles.title}>{module.title}</h3>
        <p style={styles.description}>{module.description}</p>
      </div>

      <div style={styles.outcomes}>
        <h4 style={styles.outcomesTitle}>Learning Outcomes:</h4>
        <ul style={styles.outcomesList}>
          {module.outcomes.map((outcome, index) => (
            <li key={index} style={styles.outcomeItem}>
              <span style={styles.bullet}>▸</span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={module.link}
        style={styles.link}
      >
        Start Module {module.number} →
      </Link>
    </div>
  );
}

function ModulesOutcomes() {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';
  const styles = getModuleStyles(isDark);

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleGlow}>Curriculum Overview</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            A comprehensive journey from robotic foundations to advanced AI integration
          </p>
        </div>

        <div style={styles.grid}>
          {modules.map((module) => (
            <ModuleCard key={module.number} module={module} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

const getModuleStyles = (isDark: boolean): { [key: string]: React.CSSProperties } => ({
  section: {
    padding: '80px 20px',
    background: isDark
      ? 'linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)'
      : 'linear-gradient(180deg, rgba(245, 245, 250, 0.95) 0%, rgba(230, 235, 245, 0.95) 100%)',
    borderTop: isDark ? '2px solid rgba(0, 255, 255, 0.2)' : '2px solid rgba(0, 150, 255, 0.3)'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  sectionTitle: {
    fontSize: '42px',
    fontWeight: '700',
    color: isDark ? '#00ffff' : '#0066cc',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '3px'
  },
  titleGlow: {
    textShadow: isDark
      ? '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5)'
      : '0 0 10px rgba(0, 102, 204, 0.3)'
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: isDark ? '#8892b0' : '#5a6c7d',
    fontFamily: 'monospace',
    maxWidth: '600px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    background: isDark ? 'rgba(15, 15, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    border: isDark ? '2px solid rgba(0, 255, 255, 0.3)' : '2px solid rgba(0, 150, 255, 0.3)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: isDark
      ? '0 0 30px rgba(0, 255, 255, 0.15), inset 0 0 20px rgba(0, 255, 255, 0.05)'
      : '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 0 10px rgba(0, 150, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  cardHeader: {
    borderBottom: isDark ? '1px solid rgba(0, 255, 255, 0.2)' : '1px solid rgba(0, 150, 255, 0.2)',
    paddingBottom: '20px'
  },
  moduleNumber: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  },
  emoji: {
    fontSize: '32px'
  },
  number: {
    fontSize: '14px',
    color: isDark ? '#00ffff' : '#0066cc',
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: '2px'
  },
  title: {
    fontSize: '24px',
    color: isDark ? '#ffffff' : '#1a1a1a',
    fontWeight: '700',
    margin: '0 0 12px 0',
    textShadow: isDark ? '0 0 10px rgba(0, 255, 255, 0.3)' : 'none'
  },
  description: {
    fontSize: '14px',
    color: isDark ? '#8892b0' : '#5a6c7d',
    margin: '0',
    lineHeight: '1.6',
    fontFamily: 'monospace'
  },
  outcomes: {
    flex: 1
  },
  outcomesTitle: {
    fontSize: '16px',
    color: isDark ? '#00ffff' : '#0066cc',
    fontWeight: '600',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'monospace'
  },
  outcomesList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  outcomeItem: {
    fontSize: '14px',
    color: isDark ? '#a8b2d1' : '#4a5568',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  bullet: {
    color: isDark ? '#00ffff' : '#0066cc',
    fontSize: '16px',
    flexShrink: 0
  },
  link: {
    display: 'block',
    textAlign: 'center',
    padding: '14px',
    background: isDark
      ? 'linear-gradient(135deg, #00ffff 0%, #00cccc 100%)'
      : 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
    border: isDark ? '2px solid #00ffff' : '2px solid #0066cc',
    borderRadius: '8px',
    color: isDark ? '#0a0a0a' : '#ffffff',
    fontSize: '14px',
    fontWeight: '700',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'monospace',
    boxShadow: isDark
      ? '0 0 15px rgba(0, 255, 255, 0.3)'
      : '0 4px 15px rgba(0, 102, 204, 0.3)',
    transition: 'all 0.3s ease'
  }
});


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await getSession();
      setIsLoggedIn(!!session?.user);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setSessionLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <Layout
        title={`${siteConfig.title}`}
        description="Physical AI & Humanoid Robotics Textbook - The World's First Spec-Driven Course on Physical AI & Humanoid Robotics">
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#00ffff', fontSize: '18px', fontFamily: 'monospace' }}>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Textbook - The World's First Spec-Driven Course on Physical AI & Humanoid Robotics">
      <HomepageHeader isLoggedIn={isLoggedIn} />
      <main>
        <ModulesOutcomes />
      </main>
      <ChatWidget />
    </Layout>
  );
}
