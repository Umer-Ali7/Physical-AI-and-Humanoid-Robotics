import React, { useState } from 'react';
import styles from './styles.module.css';

export default function ChatWidget(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <span className={styles.botIcon}>🤖</span>
              <div>
                <h3 className={styles.chatTitle}>Physical AI Assistant</h3>
                <p className={styles.chatStatus}>Online</p>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={toggleChat}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className={styles.chatBody}>
            <div className={styles.welcomeMessage}>
              <div className={styles.messageIcon}>🤖</div>
              <div className={styles.messageContent}>
                <p className={styles.welcomeText}>
                  Ask the Physical AI Assistant...
                </p>
                <p className={styles.welcomeSubtext}>
                  I can help you with robotics, ROS 2, digital twins, and AI integration!
                </p>
              </div>
            </div>

            <div className={styles.quickActions}>
              <button className={styles.quickActionButton}>
                💡 Getting Started
              </button>
              <button className={styles.quickActionButton}>
                📚 Module Overview
              </button>
              <button className={styles.quickActionButton}>
                🔧 Troubleshooting
              </button>
            </div>
          </div>

          <div className={styles.chatFooter}>
            <input
              type="text"
              placeholder="Type your question here..."
              className={styles.chatInput}
            />
            <button className={styles.sendButton} aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        className={`${styles.floatingButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
    </>
  );
}
