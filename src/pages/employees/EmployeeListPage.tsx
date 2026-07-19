import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEye, FiEdit, FiTrash2, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { mockEmployees as initialEmployees } from '../../data/mockEmployees';
import type { Employee } from '../../data/mockEmployees';
import { employeeService } from '../../services/api';
import SearchBox from '../../components/SearchBox';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ITEMS_PER_PAGE = 8;

const statusVariant = (s: string): 'success' | 'warning' | 'danger' | 'gray' =>
  s === 'Active' ? 'success' : s === 'On Leave' ? 'warning' : s === 'Suspended' ? 'danger' : 'gray';

const EmployeeListPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEmployee = user?.role === 'Employee';
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [viewEmp, setViewEmp] = useState<Employee | null>(null);

  useEffect(() => {
    employeeService.getAll()
      .then(res => {
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        }
      })
      .catch(err => {
        console.warn('Could not load employees from backend, using mock data:', err);
      });
  }, []);

  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];
  const statuses = ['All', 'Active', 'On Leave', 'Suspended', 'Resigned'];

  const filtered = employees.filter(e => {
    const matchSearch = `${e.name} ${e.email} ${e.id} ${e.position}`.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || e.department === deptFilter;
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (emp: Employee) => {
    employeeService.delete(emp.id)
      .then(() => {
        setEmployees(prev => prev.filter(e => e.id !== emp.id));
        toast.success(`${emp.name} removed successfully.`);
      })
      .catch(err => {
        console.warn('Backend delete failed, falling back to local state:', err);
        setEmployees(prev => prev.filter(e => e.id !== emp.id));
        toast.success(`${emp.name} removed (Mock).`);
      });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">{employees.length} total employees across {new Set(employees.map(e => e.department)).size} departments</p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline btn-sm" onClick={() => toast('Export started (mock)', { icon: '📥' })}>
            <FiDownload size={14} /> Export
          </button>
          {!isEmployee && (
            <button className="btn btn-primary" onClick={() => navigate('/employees/new')}>
              <FiPlus size={16} /> Add Employee
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <SearchBox value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search employees…" />
        <select className="form-input" style={{ width: 'auto', minWidth: 150 }} value={deptFilter} onChange={e => { setDeptFilter(e.target.value); setPage(1); }}>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="form-input" style={{ width: 'auto', minWidth: 130 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {paginated.length === 0 ? (
          <EmptyState title="No employees found" description="Adjust your search or filter criteria to find employees." />
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Performance</th>
                  <th>Hire Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(emp => (
                  <tr key={emp.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar initials={emp.avatar} size="sm" />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '.85rem', color: 'var(--text-primary)' }}>{emp.name}</p>
                          <p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{emp.id} · {emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '.82rem' }}>{emp.department}</span></td>
                    <td><span style={{ fontSize: '.82rem' }}>{emp.position}</span></td>
                    <td>
                      <Badge variant={statusVariant(emp.status)} dot>{emp.status}</Badge>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className="progress-fill" style={{ width: `${emp.performanceScore}%`, background: emp.performanceScore >= 85 ? '#10b981' : emp.performanceScore >= 70 ? '#4f46e5' : '#ef4444' }} />
                        </div>
                        <span style={{ fontSize: '.8rem', fontWeight: 700, color: emp.performanceScore >= 85 ? '#10b981' : emp.performanceScore >= 70 ? '#4f46e5' : '#ef4444' }}>{emp.performanceScore}%</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{new Date(emp.hireDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-ghost btn-icon" title="View" onClick={() => setViewEmp(emp)}><FiEye size={15} /></button>
                        <button className="btn btn-ghost btn-icon" title="Edit" onClick={() => toast('Edit form (mock)', { icon: '✏️' })}><FiEdit size={15} /></button>
                        <button className="btn btn-ghost btn-icon" title="Delete" style={{ color: '#ef4444' }} onClick={() => handleDelete(emp)}><FiTrash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ padding: '8px 20px' }}>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} itemsPerPage={ITEMS_PER_PAGE} totalItems={filtered.length} />
        </div>
      </div>

      {/* Employee Profile Modal */}
      <Modal isOpen={!!viewEmp} onClose={() => setViewEmp(null)} title="Employee Profile" size="lg">
        {viewEmp && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(148,163,184,.1)' }}>
              <Avatar initials={viewEmp.avatar} size="xl" />
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{viewEmp.name}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '.875rem', marginBottom: 6 }}>{viewEmp.position} · {viewEmp.department}</p>
                <Badge variant={statusVariant(viewEmp.status)} dot>{viewEmp.status}</Badge>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { l: 'Employee ID', v: viewEmp.id },
                { l: 'Email', v: viewEmp.email },
                { l: 'Phone', v: viewEmp.phone },
                { l: 'Location', v: viewEmp.location },
                { l: 'Manager', v: viewEmp.manager },
                { l: 'Hire Date', v: new Date(viewEmp.hireDate).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' }) },
                { l: 'Experience', v: `${viewEmp.experience} years` },
                { l: 'Trainings Completed', v: viewEmp.trainingCompleted },
                { l: 'Salary (₦)', v: `₦${viewEmp.salary.toLocaleString()}` },
                { l: 'Gender', v: viewEmp.gender },
              ].map(({ l, v }) => (
                <div key={l}>
                  <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 3 }}>{l}</p>
                  <p style={{ fontSize: '.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Performance Score</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="progress-bar" style={{ flex: 1, height: 10 }}>
                  <div className="progress-fill" style={{ width: `${viewEmp.performanceScore}%`, background: viewEmp.performanceScore >= 85 ? 'linear-gradient(90deg,#10b981,#059669)' : viewEmp.performanceScore >= 70 ? 'linear-gradient(90deg,#4f46e5,#7c3aed)' : 'linear-gradient(90deg,#ef4444,#dc2626)' }} />
                </div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{viewEmp.performanceScore}%</strong>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default EmployeeListPage;
