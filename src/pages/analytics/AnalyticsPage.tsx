import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { employeeGrowthData, genderDistribution, performanceDistribution, kpiRadarData, departmentComparisonData, salaryByDeptData, monthlyReportData } from '../../data/mockAnalytics';
import { attendanceTrendData } from '../../data/mockAttendance';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f43f5e'];

const AnalyticsPage: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">In-depth visualisations of HR data and trends</p>
      </div>

      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Employee Growth (2025)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={employeeGrowthData}>
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2.5} fill="url(#ag1)" name="Headcount" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2.5} dot={false} name="Present %" />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} dot={false} name="Absent %" />
              <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} dot={false} name="Late %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={performanceDistribution} cx="50%" cy="50%" outerRadius={75} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {performanceDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8 }}>
            {performanceDistribution.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.72rem', color: 'var(--text-secondary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i], flexShrink: 0 }} />
                {d.name} — <strong style={{ color: 'var(--text-primary)' }}>{d.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={genderDistribution} cx="50%" cy="50%" outerRadius={75} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                <Cell fill="#4f46e5" />
                <Cell fill="#ec4899" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>KPI Radar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={kpiRadarData}>
              <PolarGrid stroke="rgba(148,163,184,.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <Radar name="Company" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={.25} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Department Performance vs Attendance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentComparisonData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="dept" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="performance" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Performance %" />
              <Bar dataKey="attendance" fill="#10b981" radius={[4, 4, 0, 0]} name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Average Salary by Department (₦)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salaryByDeptData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip formatter={(v: number) => `₦${v.toLocaleString()}`} />
              <Bar dataKey="avg" fill="#06b6d4" radius={[0, 4, 4, 0]} name="Avg Salary" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 4 – Monthly HR Report */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Monthly HR Activity (Hired / Resigned / Promoted)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyReportData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="hired" fill="#10b981" radius={[4, 4, 0, 0]} name="Hired" />
            <Bar dataKey="resigned" fill="#ef4444" radius={[4, 4, 0, 0]} name="Resigned" />
            <Bar dataKey="promoted" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Promoted" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Heatmap Placeholder */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 12 }}>Attendance Heatmap (Calendar View)</h3>
        <div style={{ background: 'var(--bg-base)', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px dashed rgba(148,163,184,.2)' }}>
          <p style={{ fontSize: '2rem', marginBottom: 8 }}>📅</p>
          <p style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Calendar Heatmap</p>
          <p style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>Interactive calendar heatmap will render here upon backend integration with daily attendance data.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 20, flexWrap: 'wrap' }}>
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: 4, background: `rgba(79,70,229,${Math.random() * .8 + .1})`, transition: 'all .2s' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12, fontSize: '.72rem', color: 'var(--text-muted)' }}>
            <span>Less</span>
            {[.1, .3, .5, .7, .9].map(o => <span key={o} style={{ width: 12, height: 12, borderRadius: 2, background: `rgba(79,70,229,${o})`, display: 'inline-block' }} />)}
            <span>More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
