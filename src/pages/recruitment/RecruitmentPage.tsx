import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiBriefcase, FiUsers, FiClock, FiCheckCircle, FiPlus, FiDownload } from 'react-icons/fi';
import { mockJobOpenings, mockApplicants, applicationsByMonth, hiringFunnelData, sourceBreakdown, timeToHireByDept } from '../../data/mockRecruitment';
import type { JobOpening } from '../../data/mockRecruitment';
import Badge from '../../components/Badge';
import StatCard from '../../components/StatCard';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const statusVariant = (s: string): 'success' | 'warning' | 'danger' | 'gray' =>
  s === 'Open' ? 'success' : s === 'On Hold' ? 'warning' : s === 'Closed' ? 'gray' : 'gray';
const stageVariant = (s: string): 'success' | 'warning' | 'info' | 'danger' | 'gray' =>
  s === 'Accepted' ? 'success' : s === 'Offered' ? 'info' : s === 'Interviewed' ? 'warning' : s === 'Rejected' ? 'danger' : 'gray';

const RecruitmentPage: React.FC = () => {
  const [tab, setTab] = useState<'openings' | 'applicants'>('openings');
  const [viewJob, setViewJob] = useState<JobOpening | null>(null);

  const openJobs = mockJobOpenings.filter(j => j.status === 'Open').length;
  const totalApps = mockJobOpenings.reduce((s, j) => s + j.applications, 0);
  const avgTimeToHire = Math.round(timeToHireByDept.reduce((s, d) => s + d.days, 0) / timeToHireByDept.length);
  const totalAccepted = mockJobOpenings.reduce((s, j) => s + j.accepted, 0);
  const totalOffered = mockJobOpenings.reduce((s, j) => s + j.offered, 0);
  const offerRate = totalOffered > 0 ? Math.round((totalAccepted / totalOffered) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Recruitment</h1>
          <p className="page-subtitle">{openJobs} open positions · {totalApps} total applications this cycle</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => toast('Export started', { icon: '📥' })}><FiDownload size={14} /> Export</button>
          <button className="btn btn-primary" onClick={() => toast('Create job form coming soon', { icon: '💼' })}><FiPlus size={15} /> Post Job</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard title="Open Positions" value={openJobs} subtitle="Active job postings" icon={<FiBriefcase />} gradient="stat-indigo" change={2} changeLabel="vs last month" />
        <StatCard title="Total Applications" value={totalApps} subtitle="Across all roles" icon={<FiUsers />} gradient="stat-cyan" change={18} changeLabel="this month" />
        <StatCard title="Avg Time to Hire" value={`${avgTimeToHire}d`} subtitle="Days from posting to offer" icon={<FiClock />} gradient="stat-amber" change={-3} changeLabel="faster vs last quarter" />
        <StatCard title="Offer Accept Rate" value={`${offerRate}%`} subtitle={`${totalAccepted} of ${totalOffered} offers accepted`} icon={<FiCheckCircle />} gradient="stat-emerald" change={5} changeLabel="vs last quarter" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Applications vs Hires (2025)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={applicationsByMonth}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={.2} /><stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="applications" stroke="#4f46e5" fill="url(#appGrad)" strokeWidth={2.5} name="Applications" />
              <Bar dataKey="hires" fill="#10b981" radius={[4, 4, 0, 0]} name="Hires" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Application Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={sourceBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {sourceBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel + Time to Hire */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Hiring Funnel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hiringFunnelData.map((stage, i) => (
              <div key={stage.stage} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--text-secondary)', width: 80, flexShrink: 0 }}>{stage.stage}</span>
                <div style={{ flex: 1, background: 'var(--bg-tertiary)', borderRadius: 4, height: 20, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(stage.count / hiringFunnelData[0].count) * 100}%`, background: COLORS[i], borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                    <span style={{ fontSize: '.72rem', fontWeight: 700, color: '#fff' }}>{stage.count}</span>
                  </div>
                </div>
                <span style={{ fontSize: '.75rem', color: 'var(--text-muted)', width: 36, textAlign: 'right' }}>
                  {Math.round((stage.count / hiringFunnelData[0].count) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Time to Hire by Department (days)</h3>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={timeToHireByDept} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip />
              <Bar dataKey="days" fill="#06b6d4" radius={[0, 4, 4, 0]} name="Days" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs: Job Openings / Applicants */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid var(--border-color)', padding: '0 20px', display: 'flex', gap: 0 }}>
          {(['openings', 'applicants'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '.83rem', color: tab === t ? '#4f46e5' : 'var(--text-secondary)', borderBottom: tab === t ? '2px solid #4f46e5' : '2px solid transparent', transition: 'all .2s' }}>
              {t === 'openings' ? `Job Openings (${mockJobOpenings.length})` : `Applicants (${mockApplicants.length})`}
            </button>
          ))}
        </div>

        {tab === 'openings' && (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Job Title</th><th>Department</th><th>Type</th><th>Location</th><th>Applications</th><th>Acceptance</th><th>Deadline</th><th>Status</th></tr></thead>
              <tbody>
                {mockJobOpenings.map(job => (
                  <tr key={job.id} style={{ cursor: 'pointer' }} onClick={() => setViewJob(job)}>
                    <td><p style={{ fontWeight: 600, fontSize: '.84rem', color: 'var(--text-primary)' }}>{job.title}</p><p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{job.salaryRange}</p></td>
                    <td><span style={{ fontSize: '.82rem' }}>{job.department}</span></td>
                    <td><Badge variant={job.type === 'Full-time' ? 'info' : job.type === 'Contract' ? 'warning' : 'gray'}>{job.type}</Badge></td>
                    <td><span style={{ fontSize: '.82rem' }}>{job.location}</span></td>
                    <td>
                      <div style={{ fontSize: '.8rem' }}>
                        <span style={{ fontWeight: 700 }}>{job.applications}</span>
                        <span style={{ color: 'var(--text-muted)' }}> · {job.interviewed} interviewed</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '.82rem', fontWeight: 700, color: '#10b981' }}>{job.offered > 0 ? Math.round((job.accepted / job.offered) * 100) : 0}%</span></td>
                    <td><span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{new Date(job.deadline).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span></td>
                    <td><Badge variant={statusVariant(job.status)}>{job.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'applicants' && (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Applicant</th><th>Role</th><th>Department</th><th>Source</th><th>Applied</th><th>Stage</th></tr></thead>
              <tbody>
                {mockApplicants.map(a => (
                  <tr key={a.id}>
                    <td><p style={{ fontWeight: 600, fontSize: '.84rem' }}>{a.name}</p><p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{a.email}</p></td>
                    <td><span style={{ fontSize: '.82rem' }}>{a.jobTitle}</span></td>
                    <td><span style={{ fontSize: '.82rem' }}>{a.department}</span></td>
                    <td><span style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{a.source}</span></td>
                    <td><span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{new Date(a.appliedDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</span></td>
                    <td><Badge variant={stageVariant(a.stage)}>{a.stage}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      <Modal isOpen={!!viewJob} onClose={() => setViewJob(null)} title={viewJob?.title ?? ''} size="md">
        {viewJob && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Department', viewJob.department], ['Type', viewJob.type], ['Location', viewJob.location], ['Salary', viewJob.salaryRange], ['Hiring Manager', viewJob.hiringManager], ['Deadline', new Date(viewJob.deadline).toLocaleDateString('en-NG')]].map(([l, v]) => (
                <div key={l}><p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>{l}</p><p style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{v}</p></div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 8 }}>
              {[['Applied', viewJob.applications], ['Screened', viewJob.screened], ['Interviewed', viewJob.interviewed], ['Offered', viewJob.offered], ['Accepted', viewJob.accepted]].map(([l, v]) => (
                <div key={l} className="card" style={{ padding: '10px 8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4f46e5' }}>{v}</p>
                  <p style={{ fontSize: '.68rem', color: 'var(--text-muted)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default RecruitmentPage;
