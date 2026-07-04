import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiCalendar, FiUserCheck, FiUserX, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { mockAttendance, attendanceTrendData } from '../../data/mockAttendance';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import SearchBox from '../../components/SearchBox';

const statusVariant = (s: string): 'success' | 'warning' | 'danger' | 'info' | 'gray' =>
  s === 'Present' ? 'success' : s === 'Late' ? 'warning' : s === 'Absent' ? 'danger' : s === 'Leave' ? 'info' : 'gray';

const AttendancePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecords = mockAttendance.filter(a => a.date === todayStr || a.date >= todayStr.substring(0, 8));

  const present = todayRecords.filter(a => a.status === 'Present').length;
  const absent = todayRecords.filter(a => a.status === 'Absent').length;
  const onLeave = todayRecords.filter(a => a.status === 'Leave').length;
  const late = todayRecords.filter(a => a.status === 'Late').length;

  const filtered = mockAttendance.filter(a => {
    const matchSearch = a.employeeName.toLowerCase().includes(search.toLowerCase()) || a.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: 'Present', value: present, icon: FiUserCheck, color: '#10b981', bg: '#dcfce7' },
    { label: 'Absent', value: absent, icon: FiUserX, color: '#ef4444', bg: '#fee2e2' },
    { label: 'On Leave', value: onLeave, icon: FiCalendar, color: '#4f46e5', bg: '#ede9fe' },
    { label: 'Late', value: late, icon: FiClock, color: '#f59e0b', bg: '#fef3c7' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h1 className="page-title">Attendance Tracker</h1>
        <p className="page-subtitle">Today · {new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {stats.map(s => (
          <div key={s.label} className="card card-hover" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
              <s.icon size={20} />
            </div>
            <div>
              <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</p>
              <p style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Monthly Attendance Trend (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Present %" />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Absent %" />
              <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Late %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Attendance by Status (Monthly)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absent" />
              <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(148,163,184,.08)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginRight: 'auto' }}>Attendance Log</h3>
          <SearchBox value={search} onChange={setSearch} placeholder="Search employees…" />
          <select className="form-input" style={{ width: 'auto', minWidth: 130 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {['All', 'Present', 'Absent', 'Late', 'Leave'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(rec => (
                <tr key={rec.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar initials={rec.employeeName.split(' ').map(n => n[0]).join('')} size="sm" />
                      <span style={{ fontSize: '.83rem', fontWeight: 600 }}>{rec.employeeName}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '.82rem', color: 'var(--text-secondary)' }}>{rec.department}</td>
                  <td style={{ fontSize: '.82rem' }}>{new Date(rec.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}</td>
                  <td style={{ fontSize: '.82rem', color: rec.checkIn ? 'var(--text-primary)' : 'var(--text-muted)' }}>{rec.checkIn || '—'}</td>
                  <td style={{ fontSize: '.82rem', color: rec.checkOut ? 'var(--text-primary)' : 'var(--text-muted)' }}>{rec.checkOut || '—'}</td>
                  <td style={{ fontSize: '.82rem', fontWeight: 600 }}>{rec.hoursWorked > 0 ? `${rec.hoursWorked}h` : '—'}</td>
                  <td><Badge variant={statusVariant(rec.status)} dot>{rec.status}</Badge></td>
                  <td style={{ fontSize: '.78rem', color: 'var(--text-muted)', maxWidth: 160 }}>{rec.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendancePage;
