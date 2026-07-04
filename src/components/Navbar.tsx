import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiBell, FiSun, FiMoon, FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { mockNotifications } from '../data/mockNotifications';
import toast from 'react-hot-toast';

const breadcrumbMap: Record<string, string> = {
  dashboard: 'Dashboard', employees: 'Employees', departments: 'Departments',
  attendance: 'Attendance', performance: 'Performance', 'ai-prediction': 'AI Prediction',
  analytics: 'Analytics', reports: 'Reports', notifications: 'Notifications', settings: 'Settings',
};

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUser, setShowUser] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const unread = mockNotifications.filter(n => !n.read).length;
  const segments = location.pathname.split('/').filter(Boolean);
  const currentPage = breadcrumbMap[segments[0]] || 'Dashboard';

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header
      className="glass"
      style={{
        position: 'sticky', top: 0, zIndex: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64,
        borderBottom: '1px solid rgba(148,163,184,.12)',
      }}
    >
      {/* Left – Breadcrumb */}
      <div>
        <p style={{ fontSize: '.7rem', color: 'var(--text-muted)', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600 }}>
          AI-HRMS / {currentPage}
        </p>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {currentPage}
        </h1>
      </div>

      {/* Right – Actions */}
      <div className="flex items-center gap-2" style={{ position: 'relative' }}>
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-icon" title={isDark ? 'Light mode' : 'Dark mode'}>
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setShowNotifs(p => !p); setShowUser(false); }} className="btn btn-ghost btn-icon" style={{ position: 'relative' }}>
            <FiBell size={18} />
            {unread > 0 && (
              <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid var(--bg-card)' }} />
            )}
          </button>
          {showNotifs && (
            <div className="card" style={{ position: 'absolute', right: 0, top: 46, width: 340, zIndex: 999, maxHeight: 400, overflowY: 'auto' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(148,163,184,.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '.875rem' }}>Notifications</strong>
                {unread > 0 && <span className="badge badge-danger">{unread} new</span>}
              </div>
              {mockNotifications.slice(0, 5).map(n => (
                <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(148,163,184,.07)', background: n.read ? 'transparent' : 'rgba(79,70,229,.04)', cursor: 'pointer' }}
                  onClick={() => { navigate('/notifications'); setShowNotifs(false); }}>
                  <p style={{ fontSize: '.8rem', fontWeight: n.read ? 400 : 600, color: 'var(--text-primary)', marginBottom: 3 }}>{n.title}</p>
                  <p style={{ fontSize: '.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.message.substring(0, 70)}…</p>
                </div>
              ))}
              <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                <button onClick={() => { navigate('/notifications'); setShowNotifs(false); }} style={{ fontSize: '.78rem', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setShowUser(p => !p); setShowNotifs(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 10, cursor: 'pointer', background: 'transparent', border: 'none' }}
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#818cf8,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '.72rem' }}>
              {user?.avatar || 'U'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{user?.name?.split(' ')[0] || 'User'}</p>
              <p style={{ fontSize: '.68rem', color: 'var(--text-muted)', lineHeight: 1 }}>{user?.role}</p>
            </div>
            <FiChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
          </button>
          {showUser && (
            <div className="card" style={{ position: 'absolute', right: 0, top: 52, width: 200, zIndex: 999 }}>
              <button onClick={() => { navigate('/settings'); setShowUser(false); }}
                className="flex items-center gap-3 w-full"
                style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '.85rem', textAlign: 'left', borderBottom: '1px solid rgba(148,163,184,.1)', transition: 'all .15s' }}>
                <FiUser size={15} /> Profile
              </button>
              <button onClick={() => { navigate('/settings'); setShowUser(false); }}
                className="flex items-center gap-3 w-full"
                style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '.85rem', textAlign: 'left', borderBottom: '1px solid rgba(148,163,184,.1)', transition: 'all .15s' }}>
                <FiSettings size={15} /> Settings
              </button>
              <button onClick={handleLogout}
                className="flex items-center gap-3 w-full"
                style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '.85rem', textAlign: 'left', transition: 'all .15s' }}>
                <FiLogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
