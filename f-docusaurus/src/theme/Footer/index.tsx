import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import './styles.module.css';

export default function Footer(): JSX.Element {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  const footerStyles = getFooterStyles(isDark);

  const currentYear = new Date().getFullYear();

  const modules = [
    { label: 'Module 1: ROS2', to: '/docs/module-01-ros2/architecture' },
    { label: 'Module 2: Digital Twin', to: '/docs/module-02-digital-twin/gazebo-setup' },
    { label: 'Module 3: AI-Robot Brain', to: '/docs/module-03-robot-brain/isaac-sim' },
    { label: 'Module 4: VLA', to: '/docs/module-04-vla/voice-control' },
    { label: 'Module 5: Capstone', to: '/docs/module-05-capstone/final-project' },
  ];

  const resources = [
    { label: 'GitHub', href: 'https://github.com/Umer-Ali7/Physical-AI-and-Humanoid-Robotics' },
    { label: 'Panaversity', href: 'https://panaversity.org' },
    { label: 'Documentation', to: '/docs/intro' },
  ];

  const community = [
    { label: 'Discord', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer style={footerStyles.footer}>
      {/* Decorative Top Border */}
      <div style={footerStyles.topBorder}></div>

      <div style={footerStyles.container}>
        {/* Main Footer Content */}
        <div style={footerStyles.grid}>
          {/* Brand Section */}
          <div style={footerStyles.brandSection}>
            <h3 style={footerStyles.brandTitle}>
              <span style={footerStyles.brandGlow}>Physical AI</span>
            </h3>
            <p style={footerStyles.brandTagline}>
              Building the future of embodied intelligence through spec-driven robotics education.
            </p>
            <div style={footerStyles.stats}>
              <div style={footerStyles.statItem}>
                <div style={footerStyles.statNumber}>5</div>
                <div style={footerStyles.statLabel}>Modules</div>
              </div>
              <div style={footerStyles.statItem}>
                <div style={footerStyles.statNumber}>50+</div>
                <div style={footerStyles.statLabel}>Lessons</div>
              </div>
              <div style={footerStyles.statItem}>
                <div style={footerStyles.statNumber}>100%</div>
                <div style={footerStyles.statLabel}>Hands-on</div>
              </div>
            </div>
          </div>

          {/* Curriculum Links */}
          <div style={footerStyles.linkSection}>
            <h4 style={footerStyles.linkTitle}>Curriculum</h4>
            <ul style={footerStyles.linkList}>
              {modules.map((module, index) => (
                <li key={index} style={footerStyles.linkItem}>
                  <Link to={module.to} style={footerStyles.link}>
                    <span style={footerStyles.linkBullet}>▸</span>
                    {module.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div style={footerStyles.linkSection}>
            <h4 style={footerStyles.linkTitle}>Resources</h4>
            <ul style={footerStyles.linkList}>
              {resources.map((resource, index) => (
                <li key={index} style={footerStyles.linkItem}>
                  {resource.href ? (
                    <a href={resource.href} style={footerStyles.link} target="_blank" rel="noopener noreferrer">
                      <span style={footerStyles.linkBullet}>▸</span>
                      {resource.label}
                    </a>
                  ) : (
                    <Link to={resource.to} style={footerStyles.link}>
                      <span style={footerStyles.linkBullet}>▸</span>
                      {resource.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div style={footerStyles.linkSection}>
            <h4 style={footerStyles.linkTitle}>Community</h4>
            <ul style={footerStyles.linkList}>
              {community.map((item, index) => (
                <li key={index} style={footerStyles.linkItem}>
                  <a href={item.href} style={footerStyles.link}>
                    <span style={footerStyles.linkBullet}>▸</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={footerStyles.bottom}>
          <div style={footerStyles.divider}></div>
          <div style={footerStyles.bottomContent}>
            <p style={footerStyles.copyright}>
              © {currentYear} Physical AI & Humanoid Robotics Textbook. Built with{' '}
              <span style={footerStyles.heart}>♥</span> for the future of robotics.
            </p>
            <div style={footerStyles.badges}>
              <span style={footerStyles.badge}>
                <span style={footerStyles.badgeIcon}>🤖</span> Embodied AI
              </span>
              <span style={footerStyles.badge}>
                <span style={footerStyles.badgeIcon}>⚡</span> Powered by ROS2
              </span>
              <span style={footerStyles.badge}>
                <span style={footerStyles.badgeIcon}>🧠</span> AI-First
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const getFooterStyles = (isDark: boolean): { [key: string]: React.CSSProperties } => ({
  footer: {
    background: isDark
      ? 'linear-gradient(180deg, rgba(10, 10, 20, 0.98) 0%, rgba(5, 5, 15, 1) 100%)'
      : 'linear-gradient(180deg, rgba(240, 242, 248, 0.98) 0%, rgba(230, 235, 245, 1) 100%)',
    borderTop: isDark
      ? '2px solid rgba(0, 255, 255, 0.3)'
      : '2px solid rgba(0, 150, 255, 0.3)',
    paddingTop: '0',
    marginTop: '80px',
    position: 'relative'
  },
  topBorder: {
    height: '4px',
    background: isDark
      ? 'linear-gradient(90deg, transparent, #00ffff, transparent)'
      : 'linear-gradient(90deg, transparent, #0066cc, transparent)',
    boxShadow: isDark
      ? '0 0 20px rgba(0, 255, 255, 0.5)'
      : '0 0 10px rgba(0, 102, 204, 0.3)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px 40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '50px'
  },
  brandSection: {
    gridColumn: 'span 1'
  },
  brandTitle: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 16px 0',
    color: isDark ? '#00ffff' : '#0066cc'
  },
  brandGlow: {
    textShadow: isDark
      ? '0 0 20px rgba(0, 255, 255, 0.6)'
      : '0 0 10px rgba(0, 102, 204, 0.3)'
  },
  brandTagline: {
    fontSize: '14px',
    color: isDark ? '#8892b0' : '#5a6c7d',
    lineHeight: '1.6',
    marginBottom: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  stats: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: isDark ? '#00ffff' : '#0066cc',
    fontFamily: 'monospace',
    textShadow: isDark
      ? '0 0 10px rgba(0, 255, 255, 0.5)'
      : 'none'
  },
  statLabel: {
    fontSize: '11px',
    color: isDark ? '#8892b0' : '#5a6c7d',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'monospace'
  },
  linkSection: {
  },
  linkTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: isDark ? '#00ffff' : '#0066cc',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'monospace'
  },
  linkList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  linkItem: {
    margin: '0'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: isDark ? '#a8b2d1' : '#4a5568',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  linkBullet: {
    color: isDark ? '#00ffff' : '#0066cc',
    fontSize: '14px',
    transition: 'transform 0.2s ease'
  },
  bottom: {
    marginTop: '40px'
  },
  divider: {
    height: '1px',
    background: isDark
      ? 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(0, 150, 255, 0.3), transparent)',
    marginBottom: '30px'
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    textAlign: 'center'
  },
  copyright: {
    fontSize: '13px',
    color: isDark ? '#8892b0' : '#5a6c7d',
    margin: '0',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  heart: {
    color: isDark ? '#ff6b9d' : '#e63946',
    animation: 'heartbeat 1.5s ease-in-out infinite'
  },
  badges: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: isDark
      ? 'rgba(0, 255, 255, 0.1)'
      : 'rgba(0, 102, 204, 0.1)',
    border: isDark
      ? '1px solid rgba(0, 255, 255, 0.3)'
      : '1px solid rgba(0, 102, 204, 0.3)',
    borderRadius: '20px',
    fontSize: '12px',
    color: isDark ? '#00ffff' : '#0066cc',
    fontWeight: '600',
    fontFamily: 'monospace'
  },
  badgeIcon: {
    fontSize: '14px'
  }
});
