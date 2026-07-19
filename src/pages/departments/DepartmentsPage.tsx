import React, { useState } from 'react';
import { FiPlus, FiUsers, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { mockDepartments } from '../../data/mockDepartments';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const DepartmentsPage: React.FC = () => {
  const { user } = useAuth();
  const isViewOnly = user?.role !== 'Administrator';
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newHOD, setNewHOD] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) { toast.error('Department name is required'); return; }
    toast.success(`Department "${newName}" created (mock)!`);
    setShowAdd(false);
    setNewName('');
    setNewHOD('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Departments</h1>
          <p className="page-subtitle">{mockDepartments.length} active departments in your organisation</p>
        </div>
        {!isViewOnly && (
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            <FiPlus size={16} /> Add Department
          </button>
        )}
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { icon: FiUsers, label: 'Total Employees', value: mockDepartments.reduce((s, d) => s + d.employeeCount, 0), color: '#4f46e5' },
          { icon: FiTrendingUp, label: 'Avg Productivity', value: `${Math.round(mockDepartments.reduce((s, d) => s + d.productivity, 0) / mockDepartments.length)}%`, color: '#10b981' },
          { icon: FiDollarSign, label: 'Total Budget', value: `₦${(mockDepartments.reduce((s, d) => s + d.budget, 0) / 1000000).toFixed(1)}M`, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="card card-hover" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
              <s.icon size={20} />
            </div>
            <div>
              <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</p>
              <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Department Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {mockDepartments.map((dept, idx) => {
          const usagePercent = Math.round(dept.budgetUsed / dept.budget * 100);
          const color = dept.color;
          return (
            <motion.div
              key={dept.id}
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * .06 }}
              style={{ overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Color Banner */}
              <div style={{ height: 6, background: color }} />
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
                      <FiUsers size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{dept.name}</h3>
                      <p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>Code: {dept.code}</p>
                    </div>
                  </div>
                  <Badge variant="info">{dept.location}</Badge>
                </div>

                <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14, minHeight: 48 }}>{dept.description}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                  {[['Employees', dept.employeeCount], ['Head of Dept', dept.headOfDept], ['Productivity', `${dept.productivity}%`], ['Established', new Date(dept.established).getFullYear()]].map(([l, v]) => (
                    <div key={l as string}>
                      <p style={{ fontSize: '.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>{l}</p>
                      <p style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{v}</p>
                    </div>
                  ))}
                </div>

                {/* Budget Usage */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Budget Used</span>
                    <span style={{ fontWeight: 700, color: usagePercent > 85 ? '#ef4444' : usagePercent > 65 ? '#f59e0b' : '#10b981' }}>{usagePercent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${usagePercent}%`, background: usagePercent > 85 ? '#ef4444' : usagePercent > 65 ? '#f59e0b' : color }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '.7rem', color: 'var(--text-muted)' }}>
                    <span>₦{(dept.budgetUsed / 1000000).toFixed(2)}M used</span>
                    <span>₦{(dept.budget / 1000000).toFixed(1)}M total</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Department Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Department"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAdd}>Create Department</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="form-label">Department Name</label>
            <input type="text" className="form-input" placeholder="e.g. Legal & Compliance" value={newName} onChange={e => setNewName(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Department Code</label>
            <input type="text" className="form-input" placeholder="e.g. LGL" />
          </div>
          <div>
            <label className="form-label">Head of Department</label>
            <input type="text" className="form-input" placeholder="Full name" value={newHOD} onChange={e => setNewHOD(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Location</label>
            <input type="text" className="form-input" placeholder="City" />
          </div>
          <div>
            <label className="form-label">Annual Budget (₦)</label>
            <input type="number" className="form-input" placeholder="2000000" />
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={3} placeholder="Brief description of department responsibilities…" />
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default DepartmentsPage;
