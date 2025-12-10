import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { signUpWithTechnicalBackground, signIn, signOut, getSession, User } from '../lib/auth-client';

export default function Login() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    technicalBackground: 'Software' as 'Software' | 'Hardware' | 'Both'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setSessionLoading(true);
    try {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setSessionLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'signup') {
        if (!formData.name || !formData.email || !formData.password || !formData.technicalBackground) {
          setError('All fields are required');
          setLoading(false);
          return;
        }

        await signUpWithTechnicalBackground(
          formData.name,
          formData.email,
          formData.password,
          formData.technicalBackground
        );

        // Refresh session
        await checkSession();

        // Redirect to docs
        window.location.href = '/docs/intro';
      } else {
        if (!formData.email || !formData.password) {
          setError('Email and password are required');
          setLoading(false);
          return;
        }

        await signIn(formData.email, formData.password);

        // Refresh session
        await checkSession();

        // Redirect to docs
        window.location.href = '/docs/intro';
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (sessionLoading) {
    return (
      <Layout title="Login" description="Sign in to your account">
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.header}>
              <h1 style={styles.title}>
                <span style={styles.titleGlow}>Loading...</span>
              </h1>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If logged in, show user profile card
  if (user) {
    return (
      <Layout title="Profile" description="Your profile">
        <div style={styles.container}>
          <div style={styles.card}>
            {/* Header */}
            <div style={styles.header}>
              <h1 style={styles.title}>
                <span style={styles.titleGlow}>User Profile</span>
              </h1>
              <p style={styles.subtitle}>Your cyber-physical identity</p>
            </div>

            {/* User Profile Card */}
            <div style={styles.profileCard}>
              <div style={styles.welcomeSection}>
                <h2 style={styles.welcomeText}>Welcome back,</h2>
                <h3 style={styles.userName}>{user.name}!</h3>
              </div>

              <div style={styles.profileDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Email:</span>
                  <span style={styles.detailValue}>{user.email}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Technical Background:</span>
                  <span style={styles.detailValue}>
                    {user.technicalBackground || 'Not specified'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                style={styles.logoutButton}
              >
                Logout
              </button>

              <button
                onClick={() => window.location.href = '/docs/intro'}
                style={styles.continueButton}
              >
                Continue Learning
              </button>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
              <div style={styles.footerLine}></div>
              <p style={styles.footerText}>Session Active</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If logged out, show login/signup form
  return (
    <Layout title="Login" description="Sign in to your account">
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.title}>
              <span style={styles.titleGlow}>Authentication</span>
            </h1>
            <p style={styles.subtitle}>Access your cyber-physical workspace</p>
          </div>

          {/* Tabs */}
          <div style={styles.tabContainer}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'signin' ? styles.tabActive : {})
              }}
              onClick={() => {
                setActiveTab('signin');
                setError('');
              }}
            >
              Sign In
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'signup' ? styles.tabActive : {})
              }}
              onClick={() => {
                setActiveTab('signup');
                setError('');
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {activeTab === 'signup' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ ...styles.input, paddingRight: '50px' }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Technical Background</label>
                <select
                  name="technicalBackground"
                  value={formData.technicalBackground}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="Software">Software</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            )}

            {error && (
              <div style={styles.error}>
                <span style={styles.errorIcon}>⚠</span> {error}
              </div>
            )}

            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <span>{activeTab === 'signin' ? 'Sign In' : 'Sign Up'}</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            <div style={styles.footerLine}></div>
            <p style={styles.footerText}>Secured Authentication</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Cyber-Physical Dark Mode Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    background: 'rgba(15, 15, 25, 0.95)',
    border: '2px solid #00ffff',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 0 40px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    color: '#00ffff',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  titleGlow: {
    textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5)'
  },
  subtitle: {
    fontSize: '14px',
    color: '#8892b0',
    margin: '0',
    fontFamily: 'monospace'
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  welcomeSection: {
    textAlign: 'center',
    padding: '20px',
    background: 'rgba(0, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid #00ffff33'
  },
  welcomeText: {
    fontSize: '18px',
    color: '#8892b0',
    margin: '0 0 8px 0',
    fontFamily: 'monospace'
  },
  userName: {
    fontSize: '28px',
    color: '#00ffff',
    margin: '0',
    fontWeight: '700',
    textShadow: '0 0 15px rgba(0, 255, 255, 0.6)'
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    background: 'rgba(10, 10, 20, 0.6)',
    borderRadius: '12px',
    border: '1px solid #00ffff22'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#00ffff',
    fontWeight: '600',
    fontFamily: 'monospace',
    textTransform: 'uppercase'
  },
  detailValue: {
    fontSize: '14px',
    color: '#ffffff',
    fontFamily: 'monospace'
  },
  logoutButton: {
    padding: '16px',
    background: 'linear-gradient(135deg, #ff3232 0%, #cc0000 100%)',
    border: '2px solid #ff3232',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'monospace',
    boxShadow: '0 0 20px rgba(255, 50, 50, 0.4)'
  },
  continueButton: {
    padding: '16px',
    background: 'linear-gradient(135deg, #00ffff 0%, #00cccc 100%)',
    border: '2px solid #00ffff',
    borderRadius: '8px',
    color: '#0a0a0a',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'monospace',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
  },
  tabContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '32px',
    borderBottom: '2px solid #00ffff33'
  },
  tab: {
    flex: 1,
    padding: '12px',
    background: 'transparent',
    border: 'none',
    color: '#8892b0',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    fontFamily: 'monospace'
  },
  tabActive: {
    color: '#00ffff',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.6)',
    borderBottom: '2px solid #00ffff'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#00ffff',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'monospace'
  },
  passwordContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    padding: '14px 16px',
    background: 'rgba(10, 10, 20, 0.8)',
    border: '2px solid #00ffff55',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'monospace',
    width: '100%'
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  select: {
    padding: '14px 16px',
    background: 'rgba(10, 10, 20, 0.8)',
    border: '2px solid #00ffff55',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'monospace'
  },
  error: {
    padding: '12px 16px',
    background: 'rgba(255, 50, 50, 0.1)',
    border: '2px solid #ff3232',
    borderRadius: '8px',
    color: '#ff6b6b',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'monospace'
  },
  errorIcon: {
    fontSize: '18px'
  },
  submitButton: {
    padding: '16px',
    background: 'linear-gradient(135deg, #00ffff 0%, #00cccc 100%)',
    border: '2px solid #00ffff',
    borderRadius: '8px',
    color: '#0a0a0a',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'monospace',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
  },
  footer: {
    marginTop: '32px',
    textAlign: 'center'
  },
  footerLine: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
    marginBottom: '16px'
  },
  footerText: {
    color: '#8892b0',
    fontSize: '12px',
    fontFamily: 'monospace'
  }
};
