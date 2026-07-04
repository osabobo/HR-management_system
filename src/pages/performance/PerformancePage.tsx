import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiPlus, FiEye, FiEdit } from 'react-icons/fi';
import { mockPerformance, performanceTrend, departmentPerformance } from '../../data/mockPerformance';
import type { PerformanceReview } from '../../data/mockPerformance';
import toast from 'react-hot-toast';

const statusVariant = (s: string): 'success' | 'warning' | 'danger' => s === 'Completed' ? 'success' : s === 'Pending' ? 'warning' : 'danger';
const recVariant = (r: string): 'success' | 'info' | 'warning' | 'danger' =>
  r === 'Promote' ? 'success' : r === 'Retain' ? 'info' : r === 'Warn' ? 'warning' : 'danger';

const PerformancePage: React.FC = () => {
  const [viewReview, setViewReview] = useState<PerformanceReview | null>(null);
  const [showForm, setShowForm] = useState(false);

  const avgScore = Math.round(mockPerformance.filter(p => p.status === 'Completed').reduce((s, p) => s + p.overallScore, 0) / mockPerformance.filter(p => p.status === 'Completed').length);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Performance Management</h1>
          <p className="page-subtitle">{mockPerformance.length} reviews · Average score: {avgScore}%</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <FiPlus size={16} /> New Review
        </button>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20, gridColumn: 'span 2' }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Performance Trend (2025)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 95]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="avg" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} name="Avg Score %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Dept Performance</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={departmentPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis type="number" domain={[60, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip />
              <Bar dataKey="score" fill="#4f46e5" radius={[0, 4, 4, 0]} name="Score %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(148,163,184,.08)' }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)' }}>Performance Reviews</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Period</th>
                <th>Overall Score</th>
                <th>Status</th>
                <th>Recommendation</th>
                <th>Reviewed By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPerformance.map(review => (
                <tr key={review.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar initials={review.employeeName.split(' ').map(n => n[0]).join('')} size="sm" />
                      <span style={{ fontWeight: 600, fontSize: '.83rem' }}>{review.employeeName}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '.82rem', color: 'var(--text-secondary)' }}>{review.department}</td>
                  <td style={{ fontSize: '.82rem' }}>{review.reviewPeriod}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${review.overallScore}%`, background: review.overallScore >= 85 ? '#10b981' : review.overallScore >= 70 ? '#4f46e5' : '#ef4444' }} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '.82rem', color: review.overallScore >= 85 ? '#10b981' : review.overallScore >= 70 ? '#4f46e5' : '#ef4444' }}>{review.overallScore}%</span>
                    </div>
                  </td>
                  <td><Badge variant={statusVariant(review.status)}>{review.status}</Badge></td>
                  <td><Badge variant={recVariant(review.recommendation)}>{review.recommendation}</Badge></td>
                  <td style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{review.reviewedBy}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-ghost btn-icon" onClick={() => setViewReview(review)}><FiEye size={15} /></button>
                      <button className="btn btn-ghost btn-icon" onClick={() => toast('Edit review (mock)', { icon: '✏️' })}><FiEdit size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Review Modal */}
      <Modal isOpen={!!viewReview} onClose={() => setViewReview(null)} title="Performance Review Details" size="lg">
        {viewReview && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, borderBottom: '1px solid rgba(148,163,184,.1)' }}>
              <Avatar initials={viewReview.employeeName.split(' ').map(n => n[0]).join('')} size="md" />
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{viewReview.employeeName}</h3>
                <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{viewReview.department} · {viewReview.reviewPeriod}</p>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: viewReview.overallScore >= 85 ? '#10b981' : viewReview.overallScore >= 70 ? '#4f46e5' : '#ef4444' }}>{viewReview.overallScore}%</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Productivity', viewReview.productivity], ['Teamwork', viewReview.teamwork], ['Leadership', viewReview.leadership], ['Communication', viewReview.communication], ['Innovation', viewReview.innovation], ['Discipline', viewReview.discipline]].map(([l, v]) => (
                <div key={l as string}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{l}</span>
                    <span style={{ fontSize: '.78rem', fontWeight: 700 }}>{v}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${v}%`, background: 'linear-gradient(90deg,#4f46e5,#818cf8)' }} />
                  </div>
                </div>
              ))}
            </div>
            <RadarChart width={320} height={200} data={[
              { subject: 'Productivity', value: viewReview.productivity },
              { subject: 'Teamwork', value: viewReview.teamwork },
              { subject: 'Leadership', value: viewReview.leadership },
              { subject: 'Communication', value: viewReview.communication },
              { subject: 'Innovation', value: viewReview.innovation },
              { subject: 'Discipline', value: viewReview.discipline },
            ]} style={{ margin: '0 auto' }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
            </RadarChart>
            <div style={{ padding: 14, background: 'rgba(79,70,229,.05)', borderRadius: 8, borderLeft: '3px solid #4f46e5' }}>
              <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>"{viewReview.comments}"</p>
              <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: 6 }}>— {viewReview.reviewedBy} · {new Date(viewReview.reviewDate).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge variant={recVariant(viewReview.recommendation)}>Recommendation: {viewReview.recommendation}</Badge>
              <Badge variant={statusVariant(viewReview.status)}>{viewReview.status}</Badge>
            </div>
          </div>
        )}
      </Modal>

      {/* New Review Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="New Performance Review" size="lg"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => { toast.success('Review submitted (mock)!'); setShowForm(false); }}>Submit Review</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="form-label">Employee</label>
              <select className="form-input">
                {mockPerformance.map(r => <option key={r.employeeId}>{r.employeeName}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Review Period</label>
              <input type="text" className="form-input" placeholder="e.g. Q3 2025" />
            </div>
          </div>
          {['Productivity', 'Teamwork', 'Leadership', 'Communication', 'Innovation', 'Discipline'].map(kpi => (
            <div key={kpi}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label" style={{ marginBottom: 0 }}>{kpi}</label>
                <span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>0–100</span>
              </div>
              <input type="range" min={0} max={100} defaultValue={75} className="w-full" style={{ accentColor: '#4f46e5' }} />
            </div>
          ))}
          <div>
            <label className="form-label">Recommendation</label>
            <select className="form-input">
              <option>Promote</option><option>Retain</option><option>Warn</option><option>Dismiss</option>
            </select>
          </div>
          <div>
            <label className="form-label">Comments</label>
            <textarea className="form-input" rows={3} placeholder="Enter review comments and observations…" />
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default PerformancePage;
