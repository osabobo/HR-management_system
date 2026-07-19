import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiUsers, FiTrendingUp, FiMapPin, FiHeart } from 'react-icons/fi';
import { genderByDept, ageGroupData, locationBreakdown, diversityTrend, employmentTypeData, diversitySummary } from '../../data/mockDiversity';
import { mockEmployees } from '../../data/mockEmployees';
import StatCard from '../../components/StatCard';

const COLORS = ['#4f46e5', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

const DiversityPage: React.FC = () => {
  const femaleCount = mockEmployees.filter(e => e.gender === 'Female').length;
  const maleCount = mockEmployees.filter(e => e.gender === 'Male').length;
  const femalePercent = Math.round((femaleCount / mockEmployees.length) * 100);
  const locations = new Set(mockEmployees.map(e => e.location)).size;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 className="page-title">Diversity &amp; Inclusion</h1>
        <p className="page-subtitle">Workforce diversity trends — gender, age, location &amp; employment type</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard title="Female Workforce" value={`${femalePercent}%`} subtitle={`${femaleCount} of ${mockEmployees.length} employees`} icon={<FiHeart />} gradient="stat-rose" change={4} changeLabel="vs last year" />
        <StatCard title="Male Workforce" value={`${100 - femalePercent}%`} subtitle={`${maleCount} employees`} icon={<FiUsers />} gradient="stat-indigo" change={-4} changeLabel="vs last year" />
        <StatCard title="Locations" value={locations} subtitle="Cities represented" icon={<FiMapPin />} gradient="stat-cyan" change={0} changeLabel="stable" />
        <StatCard title="Avg Team Diversity" value="54%" subtitle="Cross-department D&amp;I score" icon={<FiTrendingUp />} gradient="stat-emerald" change={6} changeLabel="this year" />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Gender by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={genderByDept}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="dept" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip /><Legend />
              <Bar dataKey="male" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Male" stackId="a" />
              <Bar dataKey="female" fill="#ec4899" radius={[4, 4, 0, 0]} name="Female" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Age Groups</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={ageGroupData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }: { name: string; percent?: number }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {ageGroupData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20, gridColumn: 'span 2' }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Gender Diversity Trend (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={diversityTrend}>
              <defs>
                <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={.2} /><stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={.2} /><stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 65]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip /><Legend />
              <Area type="monotone" dataKey="female" stroke="#ec4899" fill="url(#fGrad)" strokeWidth={2.5} name="Female %" />
              <Area type="monotone" dataKey="male" stroke="#4f46e5" fill="url(#mGrad)" strokeWidth={2.5} name="Male %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Employment Type</h3>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={employmentTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60}>
                {employmentTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {employmentTypeData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i] }} />
                  <span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{d.name}</span>
                </div>
                <span style={{ fontSize: '.78rem', fontWeight: 700 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Location Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {locationBreakdown.map((loc, i) => (
              <div key={loc.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '.8rem', fontWeight: 600, width: 110, color: 'var(--text-secondary)' }}>{loc.name}</span>
                <div style={{ flex: 1, background: 'var(--bg-tertiary)', borderRadius: 4, height: 16 }}>
                  <div style={{ height: '100%', width: `${(loc.value / locationBreakdown[0].value) * 100}%`, background: COLORS[i % COLORS.length], borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: '.78rem', fontWeight: 700, width: 24, textAlign: 'right' }}>{loc.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)' }}>Diversity by Department</h3>
          </div>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Department</th><th>Total</th><th>Female</th><th>Female %</th><th>Avg Age</th><th>Locations</th></tr></thead>
              <tbody>
                {diversitySummary.map(row => (
                  <tr key={row.dept}>
                    <td><span style={{ fontWeight: 600, fontSize: '.84rem' }}>{row.dept}</span></td>
                    <td><span style={{ fontSize: '.82rem' }}>{row.total}</span></td>
                    <td><span style={{ fontSize: '.82rem' }}>{row.female}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 50 }}>
                          <div className="progress-fill" style={{ width: `${row.femalePercent}%`, background: row.femalePercent >= 50 ? '#ec4899' : '#4f46e5' }} />
                        </div>
                        <span style={{ fontSize: '.8rem', fontWeight: 700 }}>{row.femalePercent}%</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '.82rem' }}>{row.avgAge}</span></td>
                    <td><span style={{ fontSize: '.82rem' }}>{row.locations}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiversityPage;
