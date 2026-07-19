import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiUsers, FiTrendingUp, FiMapPin, FiDownload } from 'react-icons/fi';
import { mockWorkforce, headcountByDept, salaryBandData, tenureDistribution, turnoverTrend } from '../../data/mockWorkforce';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import SearchBox from '../../components/SearchBox';
import toast from 'react-hot-toast';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
const typeVariant = (t: string): 'success' | 'warning' | 'gray' =>
  t === 'Permanent' ? 'success' : t === 'Contract' ? 'warning' : 'gray';

const WorkforcePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const avgSalary = Math.round(mockWorkforce.reduce((s, e) => s + e.salary, 0) / mockWorkforce.length);
  const avgTenure = (mockWorkforce.reduce((s, e) => s + (new Date().getFullYear() - new Date(e.hireDate).getFullYear()), 0) / mockWorkforce.length).toFixed(1);
  const newHires = mockWorkforce.filter(e => new Date(e.hireDate) >= new Date('2025-01-01')).length;
  const departments = ['All', ...Array.from(new Set(mockWorkforce.map(e => e.department)))];

  const filtered = mockWorkforce.filter(e => {
    const q = search.toLowerCase();
    return (deptFilter === 'All' || e.department === deptFilter) &&
      (`${e.name} ${e.position} ${e.location}`.toLowerCase().includes(q));
  });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Workforce</h1>
          <p className="page-subtitle">{mockWorkforce.length} employees · Demographics, pay rates &amp; tenure insights</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => toast('Export started', { icon: '📥' })}><FiDownload size={14} /> Export</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard title="Total Headcount" value={mockWorkforce.length} subtitle="All employment types" icon={<FiUsers />} gradient="stat-indigo" change={4} changeLabel="vs last month" />
        <StatCard title="Avg Monthly Salary" value={`₦${(avgSalary / 1000).toFixed(0)}k`} subtitle="Across all departments" icon={<FiTrendingUp />} gradient="stat-emerald" change={3} changeLabel="annual increase" />
        <StatCard title="Avg Tenure" value={`${avgTenure} yrs`} subtitle="Average years of service" icon={<FiUsers />} gradient="stat-cyan" change={0} changeLabel="stable" />
        <StatCard title="New Hires (2025)" value={newHires} subtitle="Joined this year" icon={<FiMapPin />} gradient="stat-violet" change={33} changeLabel="vs 2024" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Headcount by Department</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={headcountByDept}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="dept" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Salary Band Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salaryBandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="band" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Tenure Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={tenureDistribution} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {tenureDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Hires vs Exits (2025)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={turnoverTrend}>
              <defs>
                <linearGradient id="hGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={.2} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={.2} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip /><Legend />
              <Area type="monotone" dataKey="hired" stroke="#10b981" fill="url(#hGrad)" strokeWidth={2.5} name="Hired" />
              <Area type="monotone" dataKey="exited" stroke="#ef4444" fill="url(#eGrad)" strokeWidth={2} name="Exited" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workforce Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <SearchBox value={search} onChange={setSearch} placeholder="Search by name, position or location…" />
          <select className="form-input" style={{ width: 'auto', minWidth: 150 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
          <span style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{filtered.length} employees</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Employee</th><th>Department</th><th>Position</th><th>Location</th><th>Salary/mo</th><th>Tenure</th><th>Type</th><th>Last Promotion</th></tr></thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar initials={emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)} size="sm" />
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '.84rem', color: 'var(--text-primary)' }}>{emp.name}</p>
                        <p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{emp.gender} · Age {emp.age}</p>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontSize: '.82rem' }}>{emp.department}</span></td>
                  <td><span style={{ fontSize: '.82rem' }}>{emp.position}</span></td>
                  <td><span style={{ fontSize: '.82rem' }}>{emp.location}</span></td>
                  <td><span style={{ fontSize: '.82rem', fontWeight: 700 }}>₦{(emp.salary / 1000).toFixed(0)}k</span></td>
                  <td><span style={{ fontSize: '.82rem' }}>{new Date().getFullYear() - new Date(emp.hireDate).getFullYear()} yrs</span></td>
                  <td><Badge variant={typeVariant(emp.employmentType)}>{emp.employmentType}</Badge></td>
                  <td><span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{new Date(emp.lastPromotion).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkforcePage;
