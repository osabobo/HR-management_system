import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import { FiCpu, FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiTrendingDown, FiMinus, FiZap } from 'react-icons/fi';
import { mockPredictions, predictionTimeline } from '../../data/mockPredictions';
import type { AIPrediction } from '../../data/mockPredictions';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import toast from 'react-hot-toast';

const predictionColor = (p: string) => p === 'High Performer' ? '#10b981' : p === 'Medium Performer' ? '#f59e0b' : '#ef4444';
const predictionVariant = (p: string): 'success' | 'warning' | 'danger' => p === 'High Performer' ? 'success' : p === 'Medium Performer' ? 'warning' : 'danger';
const predictionIcon = (p: string) => p === 'High Performer' ? <FiTrendingUp /> : p === 'Low Performer' ? <FiTrendingDown /> : <FiMinus />;

const AIPredictionPage: React.FC = () => {
  const [selected, setSelected] = useState<AIPrediction>(mockPredictions[0]);
  const [running, setRunning] = useState(false);
  const [inputs, setInputs] = useState({
    attendance: selected.attendanceScore,
    experience: selected.experienceScore,
    kpi: selected.kpiScore,
    training: selected.trainingScore,
    leave: selected.leaveImpact,
    previousRating: selected.previousRating,
  });

  const runPrediction = async () => {
    setRunning(true);
    await new Promise(r => setTimeout(r, 2200));
    setRunning(false);
    toast.success('AI prediction completed!', { icon: '🤖' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ background: 'linear-gradient(135deg,#4f46e5,#06b6d4)', borderRadius: 10, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiCpu size={18} color="#fff" />
            </span>
            AI Prediction Engine
          </h1>
          <p className="page-subtitle">Machine learning–powered employee performance predictions</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card" style={{ padding: '14px 18px', background: 'rgba(245,158,11,.06)', border: '1px solid rgba(245,158,11,.25)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <FiAlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: '.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Advisory Notice:</strong> AI predictions are generated from historical HR data patterns and are <strong>advisory only</strong>. All recommendations require validation and approval by an authorised HR manager. Predictions should never replace human judgment in employment decisions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
        {/* Employee Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--text-primary)', marginBottom: 12 }}>Select Employee</h3>
            {mockPredictions.map(p => (
              <button key={p.id} onClick={() => { setSelected(p); setInputs({ attendance: p.attendanceScore, experience: p.experienceScore, kpi: p.kpiScore, training: p.trainingScore, leave: p.leaveImpact, previousRating: p.previousRating }); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 6, border: selected.id === p.id ? '2px solid #4f46e5' : '2px solid transparent', background: selected.id === p.id ? 'rgba(79,70,229,.08)' : 'transparent', cursor: 'pointer', transition: 'all .2s' }}>
                <Avatar initials={p.employeeName.split(' ').map(n => n[0]).join('')} size="sm" />
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <p style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.employeeName}</p>
                  <p style={{ fontSize: '.7rem', color: 'var(--text-muted)' }}>{p.department}</p>
                </div>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: predictionColor(p.prediction), flexShrink: 0 }} />
              </button>
            ))}
          </div>

          {/* Inputs Panel */}
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--text-primary)', marginBottom: 14 }}>Input Parameters</h3>
            {[
              { key: 'attendance', label: 'Attendance Score' },
              { key: 'experience', label: 'Experience Score' },
              { key: 'kpi', label: 'KPI Score' },
              { key: 'training', label: 'Training Score' },
              { key: 'leave', label: 'Leave Impact' },
              { key: 'previousRating', label: 'Previous Rating' },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <label style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</label>
                  <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{inputs[key as keyof typeof inputs]}</span>
                </div>
                <input type="range" min={0} max={100} value={inputs[key as keyof typeof inputs]}
                  onChange={e => setInputs(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                  style={{ width: '100%', accentColor: '#4f46e5' }} />
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} onClick={runPrediction} disabled={running}>
              {running ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                  Running AI Model…
                </span>
              ) : <><FiZap size={15} /> Run Prediction</>}
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Prediction Result */}
          <div className="card" style={{ padding: 24, background: `linear-gradient(135deg, ${predictionColor(selected.prediction)}12, ${predictionColor(selected.prediction)}06)`, border: `1px solid ${predictionColor(selected.prediction)}30` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
              <Avatar initials={selected.employeeName.split(' ').map(n => n[0]).join('')} size="lg" />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{selected.employeeName}</h2>
                <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{selected.department}</p>
                <Badge variant={predictionVariant(selected.prediction)}>
                  {predictionIcon(selected.prediction)} {selected.prediction}
                </Badge>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', width: 100, height: 100 }}>
                  <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(148,163,184,.15)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke={predictionColor(selected.prediction)} strokeWidth="3"
                      strokeDasharray={`${selected.confidence} ${100 - selected.confidence}`} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: predictionColor(selected.prediction) }}>{selected.confidence}%</span>
                    <span style={{ fontSize: '.6rem', color: 'var(--text-muted)', fontWeight: 600 }}>CONFIDENCE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Bar */}
            <div style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '.78rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Prediction Confidence</span>
                <span style={{ fontWeight: 700, color: predictionColor(selected.prediction) }}>{selected.confidence}%</span>
              </div>
              <div className="progress-bar" style={{ height: 10 }}>
                <div className="progress-fill" style={{ width: `${selected.confidence}%`, background: `linear-gradient(90deg, ${predictionColor(selected.prediction)}, ${predictionColor(selected.prediction)}aa)` }} />
              </div>
            </div>
          </div>

          {/* Feature Importance */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Feature Importance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={selected.featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="feature" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip />
                <Bar dataKey="impact" radius={[0, 4, 4, 0]} name="Impact %"
                  fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations & Risks */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiCheckCircle size={15} color="#10b981" /> AI Recommendations
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0 }}>
                {selected.recommendations.map((rec, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: '.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0, marginTop: 6 }} />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiAlertTriangle size={15} color="#ef4444" /> Risk Factors
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0 }}>
                {selected.riskFactors.map((risk, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: '.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0, marginTop: 6 }} />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prediction Timeline */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>Prediction Timeline (Organisation-wide)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={predictionTimeline}>
                <defs>
                  <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={.25} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                  <linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={.25} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                  <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={.25} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="high" stroke="#10b981" strokeWidth={2} fill="url(#highGrad)" name="High Performers" />
                <Area type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} fill="url(#medGrad)" name="Medium Performers" />
                <Area type="monotone" dataKey="low" stroke="#ef4444" strokeWidth={2} fill="url(#lowGrad)" name="Low Performers" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIPredictionPage;
