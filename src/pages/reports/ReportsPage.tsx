import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiDownload, FiFilter, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { mockEmployees } from '../../data/mockEmployees';
import { mockDepartments } from '../../data/mockDepartments';
import { employeeGrowthData, departmentComparisonData, salaryByDeptData } from '../../data/mockAnalytics';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f43f5e'];

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('month');

  const handleExport = (format: string) => {
    toast.success(`Report exported as ${format.toUpperCase()}`);
  };

  const departmentStats = mockDepartments.map(dept => {
    const count = mockEmployees.filter(e => e.department === dept.name).length;
    return { name: dept.name, employees: count };
  });

  const turnoverData = [
    { month: 'Jan', hired: 5, left: 2, net: 3 },
    { month: 'Feb', hired: 3, left: 1, net: 2 },
    { month: 'Mar', hired: 7, left: 3, net: 4 },
    { month: 'Apr', hired: 4, left: 2, net: 2 },
    { month: 'May', hired: 6, left: 1, net: 5 },
    { month: 'Jun', hired: 5, left: 2, net: 3 },
    { month: 'Jul', hired: 4, left: 1, net: 3 },
  ];

  const performanceDistribution = [
    { name: 'Excellent', value: mockEmployees.filter(e => e.performanceScore >= 90).length },
    { name: 'Good', value: mockEmployees.filter(e => e.performanceScore >= 75 && e.performanceScore < 90).length },
    { name: 'Satisfactory', value: mockEmployees.filter(e => e.performanceScore >= 60 && e.performanceScore < 75).length },
    { name: 'Needs Improvement', value: mockEmployees.filter(e => e.performanceScore < 60).length },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Generate and analyze HR reports and insights</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => handleExport('pdf')}>
            <FiDownload size={14} /> PDF
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => handleExport('csv')}>
            <FiDownload size={14} /> CSV
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => handleExport('excel')}>
            <FiDownload size={14} /> Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <FiFilter size={16} style={{ color: 'var(--text-muted)' }} />
        <select className="form-input" style={{ width: 'auto', minWidth: 150 }} value={reportType} onChange={e => setReportType(e.target.value)}>
          <option value="overview">Report Type: Overview</option>
          <option value="turnover">Turnover Analysis</option>
          <option value="performance">Performance Report</option>
          <option value="department">Department Report</option>
        </select>
        <select className="form-input" style={{ width: 'auto', minWidth: 120 }} value={dateRange} onChange={e => setDateRange(e.target.value)}>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Overview Reports */}
      {reportType === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Employee Growth (2025)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={employeeGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4 }} name="Headcount" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Employees by Department</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={departmentStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="employees" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Turnover Reports */}
      {reportType === 'turnover' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Monthly Turnover Analysis</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="hired" fill="#10b981" radius={[6, 6, 0, 0]} name="Hired" />
                <Bar dataKey="left" fill="#ef4444" radius={[6, 6, 0, 0]} name="Left" />
                <Bar dataKey="net" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Net Growth" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Performance Reports */}
      {reportType === 'performance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Performance Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={performanceDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {performanceDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Performance Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {performanceDistribution.map((item, idx) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS[idx % COLORS.length] }} />
                  <span style={{ flex: 1, fontSize: '.9rem', color: 'var(--text-primary)' }}>{item.name}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.value} ({Math.round(item.value / mockEmployees.length * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Department Reports */}
      {reportType === 'department' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Salary by Department</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salaryByDeptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
                <XAxis dataKey="department" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="totalSalary" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Department Comparison</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={departmentComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Current" />
                <Bar dataKey="previous" fill="#d1d5db" radius={[6, 6, 0, 0]} name="Previous" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Additional Info Card */}
      <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <FiCalendar size={20} style={{ color: '#4f46e5' }} />
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '.95rem' }}>Report Period</h4>
            <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>
              {dateRange === 'week' && 'Last 7 days'}
              {dateRange === 'month' && 'Last 30 days'}
              {dateRange === 'quarter' && 'Last 90 days'}
              {dateRange === 'year' && 'Last 365 days'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsPage;
