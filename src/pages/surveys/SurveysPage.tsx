import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiMessageSquare, FiTrendingUp, FiUsers, FiStar, FiPlus, FiDownload } from 'react-icons/fi';
import { mockSurveys, surveyResponsesByDept, engagementTrend, exitReasonsData } from '../../data/mockSurveys';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import toast from 'react-hot-toast';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const typeVariant = (t: string): 'info' | 'success' | 'warning' | 'danger' | 'gray' =>
  t === 'Engagement' ? 'info' : t === 'Satisfaction' ? 'success' : t === 'Exit' ? 'danger' : t === 'Pulse' ? 'warning' : 'gray';
const statusVariant = (s: string): 'success' | 'warning' | 'gray' =>
  s === 'Active' ? 'warning' : s === 'Closed' ? 'success' : 'gray';

const SurveysPage: React.FC = () => {
  const closed = mockSurveys.filter(s => s.status === 'Closed');
  const avgEngagement = Math.round(surveyResponsesByDept.reduce((s, d) => s + d.engagementScore, 0) / surveyResponsesByDept.length);
  const avgSatisfaction = Math.round(surveyResponsesByDept.reduce((s, d) => s + d.satisfactionScore, 0) / surveyResponsesByDept.length);
  const avgResponseRate = Math.round(surveyResponsesByDept.reduce((s, d) => s + d.responseRate, 0) / surveyResponsesByDept.length);
  const avgNPS = Math.round(surveyResponsesByDept.reduce((s, d) => s + d.npsScore, 0) / surveyResponsesByDept.length);
  const activeSurvey = mockSurveys.find(s => s.status === 'Active');

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Employee Surveys</h1>
          <p className="page-subtitle">{mockSurveys.length} surveys · Engagement, satisfaction &amp; pulse results</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => toast('Export started', { icon: '📥' })}><FiDownload size={14} /> Export</button>
          <button className="btn btn-primary" onClick={() => toast('Survey builder coming soon', { icon: '📋' })}><FiPlus size={15} /> New Survey</button>
        </div>
      </div>

      {/* Active Survey Banner */}
      {activeSurvey && (
        <motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ background: 'linear-gradient(135deg, #312e81, #1e3a5f)', padding: '18px 24px', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.6)', marginBottom: 4 }}>🟢 ACTIVE SURVEY</p>
              <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{activeSurvey.title}</h3>
              <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.7)', marginTop: 4 }}>{activeSurvey.responses} of {activeSurvey.sent} responses received · Closes {new Date(activeSurvey.closedDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long' })}</p>
            </div>
            <button className="btn" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.25)' }} onClick={() => toast('Survey link copied!', { icon: '🔗' })}>
              Send Reminder
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard title="Engagement Score" value={`${avgEngagement}%`} subtitle="Company-wide average" icon={<FiStar />} gradient="stat-indigo" change={2} changeLabel="vs last quarter" />
        <StatCard title="Satisfaction Rate" value={`${avgSatisfaction}%`} subtitle="Overall job satisfaction" icon={<FiTrendingUp />} gradient="stat-emerald" change={1} changeLabel="vs last quarter" />
        <StatCard title="Response Rate" value={`${avgResponseRate}%`} subtitle="Avg across all surveys" icon={<FiUsers />} gradient="stat-cyan" change={5} changeLabel="vs last survey" />
        <StatCard title="eNPS Score" value={avgNPS} subtitle="Employee Net Promoter Score" icon={<FiMessageSquare />} gradient="stat-amber" change={4} changeLabel="improvement" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Engagement &amp; Satisfaction Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={engagementTrend}>
              <defs>
                <linearGradient id="enGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={.2} /><stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="satGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={.2} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip /><Legend />
              <Area type="monotone" dataKey="engagement" stroke="#4f46e5" fill="url(#enGrad)" strokeWidth={2.5} name="Engagement %" />
              <Area type="monotone" dataKey="satisfaction" stroke="#10b981" fill="url(#satGrad)" strokeWidth={2} name="Satisfaction %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Exit Survey: Leaving Reasons</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={exitReasonsData} dataKey="value" nameKey="reason" cx="50%" cy="50%" outerRadius={75} label={({ reason, percent }) => percent > 0.1 ? `${(percent * 100).toFixed(0)}%` : ''}>
                {exitReasonsData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
            {exitReasonsData.map((d, i) => (
              <div key={d.reason} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                  <span style={{ fontSize: '.72rem', color: 'var(--text-secondary)' }}>{d.reason}</span>
                </div>
                <span style={{ fontSize: '.72rem', fontWeight: 700 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dept Breakdown Chart */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Survey Results by Department</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={surveyResponsesByDept}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
            <XAxis dataKey="department" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip /><Legend />
            <Bar dataKey="engagementScore" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Engagement" />
            <Bar dataKey="satisfactionScore" fill="#10b981" radius={[4, 4, 0, 0]} name="Satisfaction" />
            <Bar dataKey="responseRate" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Response Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Survey List */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)' }}>All Surveys</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Survey</th><th>Type</th><th>Audience</th><th>Period</th><th>Sent</th><th>Responses</th><th>Response Rate</th><th>Avg Score</th><th>Status</th></tr></thead>
            <tbody>
              {mockSurveys.map(s => (
                <tr key={s.id}>
                  <td><p style={{ fontWeight: 600, fontSize: '.84rem', color: 'var(--text-primary)' }}>{s.title}</p></td>
                  <td><Badge variant={typeVariant(s.type)}>{s.type}</Badge></td>
                  <td><span style={{ fontSize: '.82rem' }}>{s.targetAudience}</span></td>
                  <td><span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{new Date(s.launchedDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })} – {new Date(s.closedDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span></td>
                  <td><span style={{ fontSize: '.82rem', fontWeight: 700 }}>{s.sent}</span></td>
                  <td><span style={{ fontSize: '.82rem', fontWeight: 700 }}>{s.responses}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="progress-bar" style={{ width: 50 }}>
                        <div className="progress-fill" style={{ width: `${Math.round((s.responses / s.sent) * 100)}%`, background: '#4f46e5' }} />
                      </div>
                      <span style={{ fontSize: '.78rem', fontWeight: 700 }}>{Math.round((s.responses / s.sent) * 100)}%</span>
                    </div>
                  </td>
                  <td><span style={{ fontSize: '.82rem', fontWeight: 700, color: s.avgScore >= 75 ? '#10b981' : s.avgScore > 0 ? '#f59e0b' : 'var(--text-muted)' }}>{s.avgScore > 0 ? `${s.avgScore}%` : '—'}</span></td>
                  <td><Badge variant={statusVariant(s.status)}>{s.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default SurveysPage;
