import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiUsers, FiBriefcase, FiCalendar, FiAward,
  FiCpu, FiBarChart2, FiFileText, FiBell, FiSettings,
  FiLogOut, FiChevronLeft, FiChevronRight, FiZap,
  FiUserPlus, FiGlobe, FiHeart, FiBook, FiMessageSquare, FiNavigation,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const navItems = [
  { path: '/dashboard',    label: 'Dashboard',         icon: FiGrid },
  { path: '/recruitment',  label: 'Recruitment',       icon: FiUserPlus,     adminOnly: true },
  { path: '/workforce',    label: 'Workforce',         icon: FiGlobe,        adminOnly: true },
  { path: '/employees',    label: 'Employees',         icon: FiUsers,        adminOnly: true },
  { path: '/departments',  label: 'Departments',       icon: FiBriefcase,    adminOnly: true },
  { path: '/diversity',    label: 'Diversity',         icon: FiHeart,        adminOnly: true },
  { path: '/attendance',   label: 'Attendance',        icon: FiCalendar },
  { path: '/performance',  label: 'Performance',       icon: FiAward,        adminOnly: true },
  { path: '/training',     label: 'Training & Dev',    icon: FiBook },
  { path: '/surveys',      label: 'Surveys',           icon: FiMessageSquare },
  { path: '/travels',      label: 'Staff Travels',     icon: FiNavigation },
  { path: '/ai-prediction',label: 'AI Prediction',     icon: FiCpu,          adminOnly: true },
  { path: '/analytics',    label: 'Analytics',         icon: FiBarChart2 },
  { path: '/reports',      label: 'HR Reports',        icon: FiFileText,     adminOnly: true },
  { path: '/notifications',label: 'Notifications',     icon: FiBell },
  { path: '/settings',     label: 'Settings',          icon: FiSettings },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: .25, ease: [.4, 0, .2, 1] }}
      style={{
        background: isDark ? '#0d0b2e' : '#1e1b4b',
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{ padding: collapsed ? '24px 16px' : '24px 20px', borderBottom: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div key="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <div style={{ background: 'linear-gradient(135deg,#818cf8,#06b6d4)', borderRadius: 10, padding: 7, display: 'flex' }}>
                <FiZap size={16} color="#fff" />
              </div>
              <div>
                <p style={{ color: '#fff', fontWeight: 800, fontSize: '.95rem', lineHeight: 1.2 }}>AI-HRMS</p>
                <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '.65rem', letterSpacing: '.08em' }}>NIGERIAN SMEs</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div style={{ background: 'linear-gradient(135deg,#818cf8,#06b6d4)', borderRadius: 10, padding: 7, display: 'flex' }}>
            <FiZap size={16} color="#fff" />
          </div>
        )}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} style={{ background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: 6, padding: 4, cursor: 'pointer', color: 'rgba(255,255,255,.6)', display: 'flex' }}>
            <FiChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <button onClick={() => setCollapsed(false)} style={{ background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: 6, padding: 4, cursor: 'pointer', color: 'rgba(255,255,255,.6)', display: 'flex' }}>
            <FiChevronRight size={15} />
          </button>
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {navItems.filter(item => !(item.adminOnly && user?.role === 'Employee')).map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            style={{ justifyContent: collapsed ? 'center' : undefined, padding: collapsed ? '10px' : undefined }}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span key="label" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: collapsed ? '16px 10px' : '16px 14px' }}>
        {!collapsed && user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#818cf8,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '.78rem', flexShrink: 0 }}>
              {user.avatar}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
              <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '.7rem', whiteSpace: 'nowrap' }}>{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="sidebar-item"
          style={{ width: '100%', justifyContent: collapsed ? 'center' : undefined, color: '#fca5a5', padding: collapsed ? '10px' : undefined }}
        >
          <FiLogOut size={17} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
