import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiMapPin, FiDollarSign, FiCheckCircle, FiClock, FiPlus, FiDownload, FiEye } from 'react-icons/fi';
import { mockTravelRequests, travelSpendByDept, monthlyTravelSpend } from '../../data/mockTravels';
import type { TravelRequest } from '../../data/mockTravels';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';

const statusVariant = (s: string): 'success' | 'warning' | 'danger' | 'info' | 'gray' =>
  s === 'Approved' ? 'success' : s === 'Pending' ? 'warning' : s === 'Rejected' ? 'danger' : s === 'Completed' ? 'info' : 'gray';
const modeIcon = (m: string) => m === 'Air' ? '✈️' : m === 'Rail' ? '🚂' : '🚗';

const TravelsPage: React.FC = () => {
  const [viewRequest, setViewRequest] = useState<TravelRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const pending = mockTravelRequests.filter(t => t.status === 'Pending').length;
  const approved = mockTravelRequests.filter(t => t.status === 'Approved').length;
  const totalAdvances = mockTravelRequests.filter(t => t.advancePaid > 0).reduce((s, t) => s + t.advancePaid, 0);
  const totalSpend = mockTravelRequests.filter(t => t.status === 'Completed').reduce((s, t) => s + t.estimatedCost, 0);

  const statuses = ['All', 'Pending', 'Approved', 'Completed', 'Rejected'];
  const filtered = mockTravelRequests.filter(t => statusFilter === 'All' || t.status === statusFilter);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Staff Travels</h1>
          <p className="page-subtitle">{mockTravelRequests.length} requests · Travel authorizations, advances &amp; expense tracking</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => toast('Export started', { icon: '📥' })}><FiDownload size={14} /> Export</button>
          <button className="btn btn-primary" onClick={() => toast('Travel request form coming soon', { icon: '✈️' })}><FiPlus size={15} /> New Request</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard title="Pending Approvals" value={pending} subtitle="Awaiting authorisation" icon={<FiClock />} gradient="stat-amber" change={0} changeLabel="this week" />
        <StatCard title="Approved Trips" value={approved} subtitle="Currently authorised" icon={<FiCheckCircle />} gradient="stat-emerald" change={2} changeLabel="vs last month" />
        <StatCard title="Total Advances Paid" value={`₦${(totalAdvances / 1000).toFixed(0)}k`} subtitle="Outstanding advances" icon={<FiDollarSign />} gradient="stat-violet" change={0} changeLabel="this month" />
        <StatCard title="Completed Trip Spend" value={`₦${(totalSpend / 1000).toFixed(0)}k`} subtitle="Actual spend this month" icon={<FiMapPin />} gradient="stat-indigo" change={12} changeLabel="vs last month" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Monthly Travel Spend &amp; Trips</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyTravelSpend}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={.2} /><stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: unknown, n: unknown) => n === 'Spend (₦)' ? `₦${Number(v).toLocaleString()}` : v as string} />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="spend" stroke="#4f46e5" fill="url(#spendGrad)" strokeWidth={2.5} name="Spend (₦)" />
              <Bar yAxisId="right" dataKey="trips" fill="#10b981" radius={[4, 4, 0, 0]} name="Trips" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Spend by Department (₦)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={travelSpendByDept} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
              <XAxis type="number" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={75} />
              <Tooltip formatter={(v: unknown) => `₦${Number(v).toLocaleString()}`} />
              <Bar dataKey="spend" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Spend" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Requests Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginRight: 'auto' }}>Travel Requests</h3>
          <select className="form-input" style={{ width: 'auto', minWidth: 140 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Employee</th><th>Purpose</th><th>Destination</th><th>Dates</th><th>Mode</th><th>Est. Cost</th><th>Advance Paid</th><th>Category</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map(req => (
                <tr key={req.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar initials={req.avatar} size="sm" />
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '.84rem' }}>{req.employeeName}</p>
                        <p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{req.department}</p>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontSize: '.82rem' }}>{req.purpose}</span></td>
                  <td><span style={{ fontSize: '.82rem', fontWeight: 600 }}>{req.destination}</span></td>
                  <td><span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{new Date(req.departureDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })} – {new Date(req.returnDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span></td>
                  <td><span style={{ fontSize: '.84rem' }}>{modeIcon(req.travelMode)} {req.travelMode}</span></td>
                  <td><span style={{ fontSize: '.82rem', fontWeight: 700 }}>₦{req.estimatedCost.toLocaleString()}</span></td>
                  <td>
                    <span style={{ fontSize: '.82rem', fontWeight: 700, color: req.advancePaid > 0 ? '#10b981' : req.status === 'Rejected' ? '#ef4444' : 'var(--text-muted)' }}>
                      {req.advancePaid > 0 ? `₦${req.advancePaid.toLocaleString()}` : req.status === 'Pending' ? 'Pending' : '—'}
                    </span>
                  </td>
                  <td><span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{req.category}</span></td>
                  <td><Badge variant={statusVariant(req.status)}>{req.status}</Badge></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-ghost btn-icon" title="View" onClick={() => setViewRequest(req)}><FiEye size={15} /></button>
                      {req.status === 'Pending' && (
                        <>
                          <button className="btn btn-ghost btn-icon" style={{ color: '#10b981' }} title="Approve" onClick={() => toast.success(`${req.employeeName}'s travel approved`)}><FiCheckCircle size={15} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!viewRequest} onClose={() => setViewRequest(null)} title="Travel Request Details" size="md">
        {viewRequest && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 10 }}>
              <Avatar initials={viewRequest.avatar} size="md" />
              <div>
                <p style={{ fontWeight: 700, fontSize: '.95rem', color: 'var(--text-primary)' }}>{viewRequest.employeeName}</p>
                <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{viewRequest.department} · {viewRequest.employeeId}</p>
              </div>
              <div style={{ marginLeft: 'auto' }}><Badge variant={statusVariant(viewRequest.status)}>{viewRequest.status}</Badge></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Purpose', viewRequest.purpose],
                ['Category', viewRequest.category],
                ['Destination', viewRequest.destination],
                ['Travel Mode', `${modeIcon(viewRequest.travelMode)} ${viewRequest.travelMode}`],
                ['Departure', new Date(viewRequest.departureDate).toLocaleDateString('en-NG')],
                ['Return', new Date(viewRequest.returnDate).toLocaleDateString('en-NG')],
                ['Estimated Cost', `₦${viewRequest.estimatedCost.toLocaleString()}`],
                ['Advance Requested', `₦${viewRequest.advanceRequested.toLocaleString()}`],
                ['Advance Paid', viewRequest.advancePaid > 0 ? `₦${viewRequest.advancePaid.toLocaleString()}` : 'Not yet paid'],
                ['Approved By', viewRequest.approvedBy || 'Pending'],
              ].map(([l, v]) => (
                <div key={l}>
                  <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>{l}</p>
                  <p style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{v}</p>
                </div>
              ))}
            </div>
            {viewRequest.status === 'Pending' && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { toast.success('Travel request approved'); setViewRequest(null); }}>✓ Approve</button>
                <button className="btn btn-outline" style={{ flex: 1, color: '#ef4444', borderColor: '#ef4444' }} onClick={() => { toast.error('Travel request rejected'); setViewRequest(null); }}>✗ Reject</button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default TravelsPage;
