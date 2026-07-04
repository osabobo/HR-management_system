import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  FiUsers, FiBriefcase, FiUserCheck, FiUserPlus, FiStar, FiTrendingUp,
  FiCalendar, FiCpu, FiArrowRight, FiBell, FiCheckCircle, FiAlertTriangle,
} from 'react-icons/fi';
import StatCard from '../../components/StatCard';
import { mockEmployees } from '../../data/mockEmployees';
import { mockDepartments } from '../../data/mockDepartments';
import { mockNotifications } from '../../data/mockNotifications';
import { mockPerformance } from '../../data/mockPerformance';
import {
  employeeGrowthData, genderDistribution, performanceDistribution,
  kpiRadarData, departmentComparisonData,
} from '../../data/mockAnalytics';
import { attendanceTrendData as attTrend } from '../../data/mockAttendance';
import Avatar from '../../components/Avatar';
import Badge from '../../components/Badge';
import { useAuth } from '../../context/AuthContext';

const GENDER_COLORS = ['#4f46e5', '#ec4899'];
const PERF_COLORS = ['#10b981', '#4f46e5', '#f59e0b', '#ef4444'];

const container = { hidden: {}, show: { transition: { staggerChildren: .08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .4 } } };

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  const activeEmployees = mockEmployees.filter(e => e.status === 'Active').length;
  const highPerformers = mockEmployees.filter(e => e.performanceScore >= 85).length;
  const avgPerformance = Math.round(mockEmployees.reduce((s, e) => s + e.performanceScore, 0) / mockEmployees.length);
  const unreadNotifs = mockNotifications.filter(n => !n.read).length;

  const stats = [
    { title: 'Total Employees', value: mockEmployees.length, subtitle: 'Across all departments', icon: <FiUsers />, gradient: 'stat-indigo', change: 12, changeLabel: 'this month' },
    { title: 'Departments', value: mockDepartments.length, subtitle: 'Active business units', icon: <FiBriefcase />, gradient: 'stat-emerald', change: 0, changeLabel: 'no change' },
    { title: 'Active Employees', value: activeEmployees, subtitle: `${Math.round(activeEmployees / mockEmployees.length * 100)}% of workforce`, icon: <FiUserCheck />, gradient: 'stat-cyan', change: 2, changeLabel: 'vs last month' },
    { title: 'New This Month', value: 4, subtitle: 'Onboarded in July', icon: <FiUserPlus />, gradient: 'stat-violet', change: 33, changeLabel: 'vs June' },
    { title: 'High Performers', value: highPerformers, subtitle: 'Score 85+', icon: <FiStar />, gradient: 'stat-amber', change: 5, changeLabel: 'vs last quarter' },
    { title: 'Avg Performance', value: `${avgPerformance}%`, subtitle: 'Company-wide KPI score', icon: <FiTrendingUp />, gradient: 'stat-teal', change: 3, changeLabel: 'improvement' },
    { title: 'Attendance Rate', value: '89%', subtitle: 'This month average', icon: <FiCalendar />, gradient: 'stat-orange', change: -2, changeLabel: 'vs last month' },
    { title: 'AI Predictions', value: 5, subtitle: 'Completed this cycle', icon: <FiCpu />, gradient: 'stat-rose', change: 25, changeLabel: 'accuracy gain' },
  ];

  const recentActivity = [
    { icon: <FiUserPlus />, text: 'Grace Adeola completed onboarding', time: '2h ago', color: '#10b981' },
    { icon: <FiCpu />, text: 'AI prediction ready for Adaeze Okonkwo', time: '4h ago', color: '#4f46e5' },
    { icon: <FiAlertTriangle />, text: 'Attendance alert: Tunde Bakare absent 4 days', time: '5h ago', color: '#ef4444' },
    { icon: <FiCheckCircle />, text: 'Performance review completed: Bola Fashola', time: '1d ago', color: '#10b981' },
    { icon: <FiStar />, text: 'Promotion recommended: Adaeze Okonkwo', time: '1d ago', color: '#f59e0b' },
    { icon: <FiBell />, text: 'System updated to v2.1.0', time: '2d ago', color: '#6366f1' },
  ];

  const upcomingReviews = mockPerformance.filter(p => p.status === 'Pending').slice(0, 3);

  const quickActions = [
    { label: 'Add Employee', icon: FiUserPlus, path: '/employees/new', color: '#4f46e5' },
    { label: 'Run AI Prediction', icon: FiCpu, path: '/ai-prediction', color: '#06b6d4' },
    { label: 'View Attendance', icon: FiCalendar, path: '/attendance', color: '#10b981' },
    { label: 'Generate Report', icon: FiTrendingUp, path: '/reports', color: '#f59e0b' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'grid', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton card" style={{ height: 110 }} />)}
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Welcome Banner */}
      <motion.div variants={item} className="card" style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)',
        padding: '24px 28px', color: '#fff', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(99,102,241,.2)' }} />
        <div style={{ position: 'absolute', right: 60, bottom: -60, width: 150, height: 150, borderRadius: '50%', background: 'rgba(6,182,212,.15)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.6)', marginBottom: 4 }}>Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>{user?.name?.split(' ')[0]} 👋</h2>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.875rem' }}>Here's your AI-HRMS overview for today · {new Date().toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {quickActions.map(a => (
              <button key={a.label} onClick={() => navigate(a.path)}
                style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 12, padding: '10px 16px', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: '.72rem', fontWeight: 600, transition: 'all .2s', backdropFilter: 'blur(8px)', minWidth: 80 }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
              >
                <a.icon size={18} />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={item} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {stats.map((s, i) => (
          <StatCard key={i} title={s.title} value={s.value} subtitle={s.subtitle} icon={s.icon} gradient={s.gradient} change={s.change} changeLabel={s.changeLabel} />
        ))}
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div variants={item} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Employee Growth */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Employee Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={employeeGrowthData}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2.5} fill="url(#growthGrad)" name="Employees" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Attendance Trend (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={attTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2.5} dot={false} name="Present %" />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} dot={false} name="Absent %" />
              <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} dot={false} name="Late %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Charts Row 2 */}
      <motion.div variants={item} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {/* Performance Distribution */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={performanceDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {performanceDistribution.map((_, i) => <Cell key={i} fill={PERF_COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 12 }}>
            {performanceDistribution.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.72rem', color: 'var(--text-secondary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: PERF_COLORS[i], display: 'inline-block', flexShrink: 0 }} />
                {d.name} — <strong style={{ color: 'var(--text-primary)' }}>{d.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={genderDistribution} cx="50%" cy="50%" outerRadius={75} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {genderDistribution.map((_, i) => <Cell key={i} fill={GENDER_COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 8 }}>
            {genderDistribution.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '.78rem', color: 'var(--text-secondary)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: GENDER_COLORS[i], display: 'inline-block' }} />
                {d.name}: <strong style={{ color: 'var(--text-primary)', marginLeft: 3 }}>{d.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* KPI Radar */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Average KPI Radar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={kpiRadarData}>
              <PolarGrid stroke="rgba(148,163,184,.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <Radar name="Company" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={.25} />
              <Radar name="Target" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={.15} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Department Comparison */}
      <motion.div variants={item} className="card" style={{ padding: 20 }}>
        <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Department Performance vs Attendance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={departmentComparisonData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
            <XAxis dataKey="dept" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="performance" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Performance %" />
            <Bar dataKey="attendance" fill="#10b981" radius={[4, 4, 0, 0]} name="Attendance %" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom Row: Recent Activity + Upcoming Reviews + Notifications */}
      <motion.div variants={item} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Activity */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${a.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color, flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '.82rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reviews + Notifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Upcoming Reviews</h3>
              <button onClick={() => navigate('/performance')} style={{ fontSize: '.75rem', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View all <FiArrowRight size={12} />
              </button>
            </div>
            {upcomingReviews.length > 0 ? upcomingReviews.map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Avatar initials={r.employeeName.split(' ').map(n => n[0]).join('')} size="sm" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{r.employeeName}</p>
                  <p style={{ fontSize: '.72rem', color: 'var(--text-secondary)' }}>{r.reviewPeriod} · {r.department}</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
            )) : (
              <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>No pending reviews 🎉</p>
            )}
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Notifications</h3>
              <span className="badge badge-danger">{unreadNotifs} new</span>
            </div>
            {mockNotifications.slice(0, 3).map(n => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, opacity: n.read ? .65 : 1 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'var(--text-muted)' : '#ef4444', flexShrink: 0, marginTop: 5 }} />
                <div>
                  <p style={{ fontSize: '.8rem', fontWeight: n.read ? 400 : 600, color: 'var(--text-primary)' }}>{n.title}</p>
                  <p style={{ fontSize: '.72rem', color: 'var(--text-secondary)' }}>{n.message.substring(0, 55)}…</p>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/notifications')} style={{ width: '100%', fontSize: '.78rem', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', paddingTop: 8, textAlign: 'center' }}>
              View all notifications →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
