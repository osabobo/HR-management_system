import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';
import { mockEmployees } from '../../data/mockEmployees';
import { mockPerformance } from '../../data/mockPerformance';
import type { Employee } from '../../data/mockEmployees';
import type { PerformanceReview } from '../../data/mockPerformance';
import { employeeService, performanceService } from '../../services/api';
import Avatar from '../../components/Avatar';
import Badge from '../../components/Badge';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import toast from 'react-hot-toast';

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [emp, setEmp] = useState<Employee | null>(null);
  const [review, setReview] = useState<PerformanceReview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    // Find initial mock data in case backend fails
    const mockEmp = mockEmployees.find(e => e.id === id) || null;
    const mockReview = mockPerformance.find(r => r.employeeId === id) || null;

    Promise.all([
      employeeService.getById(id).then(res => setEmp(res.data)).catch(() => {}),
      performanceService.getByEmployee(id).then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setReview(res.data[0]);
        }
      }).catch(() => {})
    ]).finally(() => {
      // Fallback if state is not set by backend
      setEmp(prev => prev || mockEmp);
      setReview(prev => prev || mockReview);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Loading employee profile…</p>
      </div>
    );
  }

  if (!emp) return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Employee not found</p>
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/employees')}>← Back to Employees</button>
    </div>
  );

  const radarData = review ? [
    { subject: 'Productivity', value: review.productivity },
    { subject: 'Teamwork', value: review.teamwork },
    { subject: 'Leadership', value: review.leadership },
    { subject: 'Communication', value: review.communication },
    { subject: 'Innovation', value: review.innovation },
    { subject: 'Discipline', value: review.discipline },
  ] : [];

  const statusVariant = (s: string): 'success' | 'warning' | 'danger' | 'gray' =>
    s === 'Active' ? 'success' : s === 'On Leave' ? 'warning' : s === 'Suspended' ? 'danger' : 'gray';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="btn btn-ghost" onClick={() => navigate('/employees')}>
          <FiArrowLeft size={16} /> Back
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => toast('Edit form (mock)', { icon: '✏️' })}>
          <FiEdit size={14} /> Edit Employee
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        {/* Profile Card */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
          <Avatar initials={emp.avatar} size="xl" />
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{emp.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '.875rem', marginBottom: 6 }}>{emp.position}</p>
            <Badge variant={statusVariant(emp.status)} dot>{emp.status}</Badge>
          </div>
          <div style={{ width: '100%', borderTop: '1px solid rgba(148,163,184,.1)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
            {[['ID', emp.id], ['Dept', emp.department], ['Location', emp.location], ['Manager', emp.manager], ['Gender', emp.gender], ['Experience', `${emp.experience} yrs`]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{l}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Contact Info */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14, fontSize: '.9rem' }}>Contact Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Email', emp.email], ['Phone', emp.phone], ['Hire Date', new Date(emp.hireDate).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })], ['Salary', `₦${emp.salary.toLocaleString()}`]].map(([l, v]) => (
                <div key={l}>
                  <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 3 }}>{l}</p>
                  <p style={{ fontSize: '.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance KPIs */}
          {review && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '.9rem' }}>KPI Performance — {review.reviewPeriod}</h3>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: review.overallScore >= 85 ? '#10b981' : review.overallScore >= 70 ? '#4f46e5' : '#ef4444' }}>{review.overallScore}%</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[['Productivity', review.productivity], ['Teamwork', review.teamwork], ['Leadership', review.leadership], ['Communication', review.communication], ['Innovation', review.innovation], ['Discipline', review.discipline]].map(([label, score]) => (
                  <div key={label as string}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>{label}</span>
                      <span style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{score}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${score}%`, background: 'linear-gradient(90deg,#4f46e5,#818cf8)' }} />
                    </div>
                  </div>
                ))}
              </div>
              {review.comments && (
                <div style={{ marginTop: 16, padding: 12, background: 'rgba(79,70,229,.06)', borderRadius: 8, borderLeft: '3px solid #4f46e5' }}>
                  <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>"{review.comments}"</p>
                  <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: 6 }}>— {review.reviewedBy}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Radar Chart */}
      {radarData.length > 0 && (
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, fontSize: '.9rem' }}>KPI Radar Chart</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(148,163,184,.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <Radar name={emp.name} dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailPage;
