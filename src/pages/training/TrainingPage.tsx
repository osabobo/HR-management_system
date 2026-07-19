import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiAward, FiBook, FiCheckCircle, FiClock, FiDownload } from 'react-icons/fi';
import { mockTrainingPrograms, mockEmployeeTraining, completionByDept, trainingHoursTrend, skillsMatrix } from '../../data/mockTraining';
import type { TrainingProgram } from '../../data/mockTraining';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';

const catVariant = (c: string): 'info' | 'warning' | 'danger' | 'success' | 'gray' =>
  c === 'Technical' ? 'info' : c === 'Leadership' ? 'success' : c === 'Compliance' ? 'danger' : c === 'Safety' ? 'warning' : 'gray';
const statusVariant = (s: string): 'success' | 'warning' | 'info' =>
  s === 'Completed' ? 'success' : s === 'Active' ? 'warning' : 'info';

const TrainingPage: React.FC = () => {
  const [tab, setTab] = useState<'programs' | 'records'>('programs');
  const [viewProgram, setViewProgram] = useState<TrainingProgram | null>(null);

  const completed = mockTrainingPrograms.filter(p => p.status === 'Completed').length;
  const active = mockTrainingPrograms.filter(p => p.status === 'Active').length;
  const totalCerts = mockEmployeeTraining.filter(t => t.certified).length;
  const avgScore = Math.round(mockEmployeeTraining.filter(t => t.quizScore > 0).reduce((s, t) => s + t.quizScore, 0) / mockEmployeeTraining.filter(t => t.quizScore > 0).length);
  const totalHours = mockEmployeeTraining.reduce((s, t) => s + t.hoursCompleted, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Training &amp; Development</h1>
          <p className="page-subtitle">{mockTrainingPrograms.length} programs · {completed} completed · {active} in progress</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => toast('Export started', { icon: '📥' })}><FiDownload size={14} /> Export</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard title="Programs Offered" value={mockTrainingPrograms.length} subtitle={`${active} currently active`} icon={<FiBook />} gradient="stat-indigo" change={2} changeLabel="new this quarter" />
        <StatCard title="Certifications Earned" value={totalCerts} subtitle="By employees this year" icon={<FiAward />} gradient="stat-amber" change={15} changeLabel="vs last year" />
        <StatCard title="Avg Quiz Score" value={`${avgScore}%`} subtitle="Across all assessments" icon={<FiCheckCircle />} gradient="stat-emerald" change={3} changeLabel="improvement" />
        <StatCard title="Training Hours" value={totalHours} subtitle="Completed this year" icon={<FiClock />} gradient="stat-cyan" change={22} changeLabel="vs last year" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Training Hours Trend (2025)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trainingHoursTrend}>
              <defs>
                <linearGradient id="thGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={.25} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="hours" stroke="#8b5cf6" fill="url(#thGrad)" strokeWidth={2.5} name="Hours" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Completion Rate by Department (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={completionByDept} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]} name="Completion %" fill="#10b981"
                label={{ position: 'right', fontSize: 10, fill: 'var(--text-secondary)', formatter: (v: number) => `${v}%` }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Radar */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Organisation-wide Skills Matrix</h3>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={skillsMatrix}>
            <PolarGrid stroke="rgba(148,163,184,.2)" />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
            <Radar name="Skill Level" dataKey="level" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} strokeWidth={2} />
            <Tooltip formatter={(v: number) => `${v}%`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid var(--border-color)', padding: '0 20px', display: 'flex' }}>
          {(['programs', 'records'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '.83rem', color: tab === t ? '#4f46e5' : 'var(--text-secondary)', borderBottom: tab === t ? '2px solid #4f46e5' : '2px solid transparent', transition: 'all .2s' }}>
              {t === 'programs' ? `Training Programs (${mockTrainingPrograms.length})` : `Employee Records (${mockEmployeeTraining.length})`}
            </button>
          ))}
        </div>

        {tab === 'programs' && (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Program</th><th>Category</th><th>Provider</th><th>Duration</th><th>Enrolled</th><th>Completed</th><th>Avg Score</th><th>Certified</th><th>Status</th></tr></thead>
              <tbody>
                {mockTrainingPrograms.map(p => (
                  <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => setViewProgram(p)}>
                    <td><p style={{ fontWeight: 600, fontSize: '.84rem', color: 'var(--text-primary)' }}>{p.title}</p><p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{new Date(p.startDate).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })} – {new Date(p.endDate).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}</p></td>
                    <td><Badge variant={catVariant(p.category)}>{p.category}</Badge></td>
                    <td><span style={{ fontSize: '.8rem' }}>{p.provider}</span></td>
                    <td><span style={{ fontSize: '.82rem' }}>{p.duration}h</span></td>
                    <td><span style={{ fontSize: '.82rem', fontWeight: 700 }}>{p.enrolled}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div className="progress-bar" style={{ width: 40 }}>
                          <div className="progress-fill" style={{ width: p.enrolled > 0 ? `${(p.completed / p.enrolled) * 100}%` : '0%', background: '#10b981' }} />
                        </div>
                        <span style={{ fontSize: '.78rem', fontWeight: 700 }}>{p.enrolled > 0 ? Math.round((p.completed / p.enrolled) * 100) : 0}%</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '.82rem', fontWeight: 700, color: p.avgQuizScore >= 80 ? '#10b981' : '#f59e0b' }}>{p.avgQuizScore > 0 ? `${p.avgQuizScore}%` : '—'}</span></td>
                    <td><span style={{ fontSize: '.82rem' }}>{p.certificationOffered ? '✓' : '—'}</span></td>
                    <td><Badge variant={statusVariant(p.status)}>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'records' && (
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Employee</th><th>Department</th><th>Program</th><th>Category</th><th>Hours</th><th>Quiz Score</th><th>Certified</th><th>Completed</th></tr></thead>
              <tbody>
                {mockEmployeeTraining.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar initials={r.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)} size="sm" />
                        <span style={{ fontWeight: 600, fontSize: '.84rem' }}>{r.employeeName}</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '.82rem' }}>{r.department}</span></td>
                    <td><span style={{ fontSize: '.82rem' }}>{r.program}</span></td>
                    <td><Badge variant={catVariant(r.category)}>{r.category}</Badge></td>
                    <td><span style={{ fontSize: '.82rem' }}>{r.hoursCompleted}h</span></td>
                    <td><span style={{ fontSize: '.82rem', fontWeight: 700, color: r.quizScore >= 80 ? '#10b981' : r.quizScore > 0 ? '#f59e0b' : 'var(--text-muted)' }}>{r.quizScore > 0 ? `${r.quizScore}%` : 'In Progress'}</span></td>
                    <td><span style={{ color: r.certified ? '#10b981' : 'var(--text-muted)', fontSize: '.82rem', fontWeight: 700 }}>{r.certified ? '✓ Yes' : '—'}</span></td>
                    <td><span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{r.completionDate ? new Date(r.completionDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : 'In Progress'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={!!viewProgram} onClose={() => setViewProgram(null)} title={viewProgram?.title ?? ''} size="md">
        {viewProgram && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Category', viewProgram.category], ['Provider', viewProgram.provider], ['Duration', `${viewProgram.duration} hours`], ['Certification', viewProgram.certificationOffered ? 'Yes' : 'No'], ['Start Date', new Date(viewProgram.startDate).toLocaleDateString('en-NG')], ['End Date', new Date(viewProgram.endDate).toLocaleDateString('en-NG')]].map(([l, v]) => (
                <div key={l}><p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>{l}</p><p style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{v}</p></div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 4 }}>
              {[['Enrolled', viewProgram.enrolled], ['Completed', viewProgram.completed], ['Avg Score', viewProgram.avgQuizScore > 0 ? `${viewProgram.avgQuizScore}%` : '—']].map(([l, v]) => (
                <div key={l} className="card" style={{ padding: '10px 8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#4f46e5' }}>{v}</p>
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

export default TrainingPage;
