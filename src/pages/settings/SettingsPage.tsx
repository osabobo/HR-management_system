import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiBell, FiLock, FiUser, FiToggleLeft, FiToggleRight, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface SettingsState {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsAlerts: boolean;
  weeklyReports: boolean;
  darkMode: boolean;
  compactView: boolean;
  language: string;
  timezone: string;
}

const SettingsPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SettingsState>({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyReports: true,
    darkMode: isDark,
    compactView: false,
    language: 'en',
    timezone: 'UTC',
  });

  const [saveStatus, setSaveStatus] = useState('');

  const handleToggle = (key: keyof SettingsState) => {
    const currentValue = settings[key];
    if (typeof currentValue === 'boolean') {
      const newSettings = { ...settings, [key]: !currentValue };
      setSettings(newSettings);
      if (key === 'darkMode') {
        toggleTheme();
      }
    }
  };

  const handleSelectChange = (key: keyof SettingsState, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    toast.success('Settings saved successfully!');
    setSaveStatus('✓ Saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const sections = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'privacy', label: 'Privacy & Security', icon: FiLock },
    { id: 'account', label: 'Account', icon: FiUser },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your preferences and account settings</p>
      </div>

      {/* Settings Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 20, maxWidth: '1200px' }}>
        {/* Sidebar */}
        <div className="card" style={{ padding: 0, height: 'fit-content', position: 'sticky', top: 100 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  style={{
                    padding: '16px 16px',
                    border: 'none',
                    background: activeTab === section.id ? 'var(--bg-secondary)' : 'transparent',
                    color: activeTab === section.id ? '#4f46e5' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    borderLeft: activeTab === section.id ? '3px solid #4f46e5' : 'none',
                    fontSize: '.9rem',
                    fontWeight: activeTab === section.id ? 600 : 500,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = activeTab === section.id ? 'var(--bg-secondary)' : 'transparent'}
                >
                  <Icon size={16} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div>
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>Appearance</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>Dark Mode</p>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Enable dark theme</p>
                  </div>
                  <button
                    onClick={() => handleToggle('darkMode')}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                  >
                    {settings.darkMode ? (
                      <FiToggleRight size={28} style={{ color: '#4f46e5' }} />
                    ) : (
                      <FiToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16 }}>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>Compact View</p>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Use compact layout</p>
                  </div>
                  <button
                    onClick={() => handleToggle('compactView')}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                  >
                    {settings.compactView ? (
                      <FiToggleRight size={28} style={{ color: '#4f46e5' }} />
                    ) : (
                      <FiToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </button>
                </div>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>Regional Settings</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 8 }}>Language</label>
                    <select className="form-input" value={settings.language} onChange={e => handleSelectChange('language', e.target.value)}>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 8 }}>Timezone</label>
                    <select className="form-input" value={settings.timezone} onChange={e => handleSelectChange('timezone', e.target.value)}>
                      <option value="UTC">UTC</option>
                      <option value="GMT+1">GMT+1 (West Africa)</option>
                      <option value="GMT+2">GMT+2 (East Africa)</option>
                      <option value="EST">EST (Eastern Standard)</option>
                      <option value="PST">PST (Pacific Standard)</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>Notification Preferences</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>Email Notifications</p>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleToggle('emailNotifications')}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                  >
                    {settings.emailNotifications ? (
                      <FiToggleRight size={28} style={{ color: '#10b981' }} />
                    ) : (
                      <FiToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>Push Notifications</p>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Browser notifications</p>
                  </div>
                  <button
                    onClick={() => handleToggle('pushNotifications')}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                  >
                    {settings.pushNotifications ? (
                      <FiToggleRight size={28} style={{ color: '#10b981' }} />
                    ) : (
                      <FiToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>SMS Alerts</p>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Critical alerts via SMS</p>
                  </div>
                  <button
                    onClick={() => handleToggle('smsAlerts')}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                  >
                    {settings.smsAlerts ? (
                      <FiToggleRight size={28} style={{ color: '#10b981' }} />
                    ) : (
                      <FiToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16 }}>
                  <div>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>Weekly Reports</p>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Receive weekly summaries</p>
                  </div>
                  <button
                    onClick={() => handleToggle('weeklyReports')}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                  >
                    {settings.weeklyReports ? (
                      <FiToggleRight size={28} style={{ color: '#10b981' }} />
                    ) : (
                      <FiToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Privacy & Security */}
          {activeTab === 'privacy' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>Security</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                    Change Password
                  </button>
                  <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                    Two-Factor Authentication
                  </button>
                  <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                    Active Sessions
                  </button>
                </div>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>Data & Privacy</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                    Download My Data
                  </button>
                  <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                    Privacy Policy
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Account Settings */}
          {activeTab === 'account' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>Account Information</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: 0 }}>Name</p>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>{user?.name}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: 0 }}>Email</p>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>{user?.email}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: 0 }}>Role</p>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>{user?.role}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: 0 }}>Department</p>
                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>{user?.department}</p>
                  </div>
                </div>

                <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                  Edit Profile
                </button>
              </div>

              <div className="card" style={{ padding: 24, background: '#fee2e2', borderLeft: '4px solid #ef4444' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 16, color: '#dc2626' }}>Logout</h3>
                <p style={{ fontSize: '.9rem', color: '#991b1b', marginBottom: 16 }}>
                  Sign out of your account. You'll need to log in again to access the system.
                </p>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
            <div style={{ fontSize: '.85rem', color: saveStatus ? '#10b981' : 'transparent', fontWeight: 500 }}>
              {saveStatus}
            </div>
            <button className="btn btn-primary" onClick={saveSettings}>
              <FiCheck size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
