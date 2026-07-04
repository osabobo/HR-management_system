import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiCheck, FiTrash2, FiFilter, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { mockNotifications } from '../../data/mockNotifications';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';

const getNotificationColor = (type: string): 'success' | 'warning' | 'danger' | 'info' | 'gray' => {
  switch (type) {
    case 'alert': return 'danger';
    case 'reminder': return 'info';
    case 'achievement': return 'success';
    default: return 'gray';
  }
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'alert': return '⚠️';
    case 'reminder': return '📋';
    case 'achievement': return '🏆';
    case 'update': return '📢';
    default: return '📬';
  }
};

const NotificationsPage: React.FC = () => {
  const [notifs, setNotifs] = useState(mockNotifications);
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');

  const filtered = notifs.filter(n => {
    const typeMatch = filterType === 'all' || n.type === filterType;
    const readMatch = filterRead === 'all' || (filterRead === 'unread' ? !n.read : n.read);
    return typeMatch && readMatch;
  });

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
    toast.success('Marked as read');
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifs(notifs.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const deleteAll = () => {
    setNotifs([]);
    toast.success('All notifications deleted');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {unreadCount > 0 && (
            <button className="btn btn-outline btn-sm" onClick={markAllAsRead}>
              <FiCheck size={14} /> Mark all as read
            </button>
          )}
          {notifs.length > 0 && (
            <button className="btn btn-outline btn-sm" onClick={deleteAll}>
              <FiTrash2 size={14} /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div className="card card-hover" style={{ padding: 20 }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ef4444', marginBottom: 4 }}>{unreadCount}</div>
          <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>UNREAD</p>
        </div>
        <div className="card card-hover" style={{ padding: 20 }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4f46e5', marginBottom: 4 }}>{notifs.filter(n => n.read).length}</div>
          <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>READ</p>
        </div>
        <div className="card card-hover" style={{ padding: 20 }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginBottom: 4 }}>{notifs.length}</div>
          <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <FiFilter size={16} style={{ color: 'var(--text-muted)' }} />
        <select className="form-input" style={{ width: 'auto', minWidth: 150 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="alert">Alerts</option>
          <option value="reminder">Reminders</option>
          <option value="achievement">Achievements</option>
          <option value="update">Updates</option>
        </select>
        <select className="form-input" style={{ width: 'auto', minWidth: 150 }} value={filterRead} onChange={e => setFilterRead(e.target.value)}>
          <option value="all">All Status</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
        </select>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: 'center' }}>
            <FiBell size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 12px', opacity: 0.4 }} />
            <h3 style={{ color: 'var(--text-muted)', fontSize: '.9rem', fontWeight: 500 }}>
              {notifs.length === 0 ? 'No notifications' : 'No notifications match your filters'}
            </h3>
          </div>
        ) : (
          filtered.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card card-hover"
              style={{
                padding: 16,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                background: !notif.read ? 'var(--bg-secondary)' : 'var(--bg-base)',
                borderLeft: `4px solid ${!notif.read ? '#4f46e5' : 'transparent'}`,
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: '1.5rem', marginTop: 2 }}>{getNotificationIcon(notif.type)}</div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '.95rem', margin: 0 }}>
                    {notif.title}
                  </h4>
                  <Badge variant={getNotificationColor(notif.type)}>
                    {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
                  </Badge>
                  {!notif.read && <Badge variant="danger">New</Badge>}
                </div>
                <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: '0 0 8px 0' }}>
                  {notif.message}
                </p>
                <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', margin: 0 }}>
                  {new Date(notif.timestamp).toLocaleDateString()} at {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="btn btn-ghost btn-sm"
                    title="Mark as read"
                    style={{ padding: '6px 10px' }}
                  >
                    <FiCheck size={14} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="btn btn-ghost btn-sm"
                  title="Delete"
                  style={{ padding: '6px 10px', color: '#ef4444' }}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Preferences Card */}
      <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(30, 41, 59, 0.5) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FiSettings size={20} style={{ color: '#4f46e5' }} />
            <div>
              <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '.95rem', margin: 0 }}>Notification Preferences</h4>
              <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', margin: 0 }}>Manage your notification settings</p>
            </div>
          </div>
          <button className="btn btn-outline btn-sm">Configure</button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
