import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import { FiCpu, FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiTrendingDown, FiMinus, FiZap } from 'react-icons/fi';
import { mockPredictions, predictionTimeline } from '../../data/mockPredictions';
import type { AIPrediction } from '../../data/mockPredictions';
import { mockEmployees } from '../../data/mockEmployees';
import type { Employee } from '../../data/mockEmployees';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import toast from 'react-hot-toast';
import { checkHealth } from '../../services/predictions';
import { predictionService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const predictionColor = (p: string) => p === 'High Performer' ? '#10b981' : p === 'Medium Performer' ? '#f59e0b' : '#ef4444';
const predictionVariant = (p: string): 'success' | 'warning' | 'danger' => p === 'High Performer' ? 'success' : p === 'Medium Performer' ? 'warning' : 'danger';
const predictionIcon = (p: string) => p === 'High Performer' ? <FiTrendingUp /> : p === 'Low Performer' ? <FiTrendingDown /> : <FiMinus />;

// Builds a placeholder prediction card for an employee who hasn't had an AI prediction run yet
const buildDefaultPrediction = (emp: Employee): AIPrediction => {
  const score = emp.performanceScore;
  const prediction: AIPrediction['prediction'] = score >= 85 ? 'High Performer' : score >= 70 ? 'Medium Performer' : 'Low Performer';
  return {
    id: `TEMP-${emp.id}`,
    employeeId: emp.id,
    employeeName: emp.name,
    department: emp.department,
    predictionDate: new Date().toISOString().slice(0, 10),
    prediction,
    confidence: score,
    attendanceScore: score,
    experienceScore: Math.min(100, emp.experience * 10),
    kpiScore: score,
    trainingScore: Math.min(100, emp.trainingCompleted * 8),
    leaveImpact: 10,
    previousRating: score,
    featureImportance: [
      { feature: 'KPI Score', impact: 30, direction: 'positive' },
      { feature: 'Attendance', impact: 25, direction: 'positive' },
      { feature: 'Experience', impact: 20, direction: 'positive' },
      { feature: 'Training Completed', impact: 15, direction: 'positive' },
      { feature: 'Leave Days', impact: 10, direction: 'negative' },
    ],
    recommendations: ['No AI prediction has been generated yet for this employee. Click "Run Prediction" to analyse their current data.'],
    riskFactors: ['Prediction pending — click "Run Prediction" to generate a full risk analysis.'],
  };
};

const AIPredictionPage: React.FC = () => {
  const { user } = useAuth();
  const isEmployee = user?.role === 'Employee';
  const [predictions, setPredictions] = useState<AIPrediction[]>(mockPredictions);
  const [selected, setSelected] = useState<AIPrediction>(mockPredictions[0]);
  const [running, setRunning] = useState(false);
  const [mlAvailable, setMlAvailable] = useState(false);
  const [inputs, setInputs] = useState({
    attendance: selected.attendanceScore,
    experience: selected.experienceScore,
    kpi: selected.kpiScore,
    training: selected.trainingScore,
    leave: selected.leaveImpact,
    previousRating: selected.previousRating,
  });

  useEffect(() => {
    // Check if ML backend is available
    checkHealth()
      .then(() => setMlAvailable(true))
      .catch(() => {
        setMlAvailable(false);
      });

    predictionService.getAll()
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          // De-duplicate by employeeId, keeping the most recent record for each employee
          const dedupedMap = new Map<string, AIPrediction>();
          res.data.forEach((p: AIPrediction) => dedupedMap.set(p.employeeId, p));
          const deduped = Array.from(dedupedMap.values());
          setPredictions(deduped);
        }
      })
      .catch(err => {
        console.warn('Could not load predictions from backend, using mock:', err);
      });
  }, []);

  const runPrediction = async () => {
    setRunning(true);
    try {
      if (mlAvailable) {
        // Call real ML API and save it
        const res = await predictionService.predict(selected.employeeId, {
          attendance: inputs.attendance,
          experience: inputs.experience,
          kpi: inputs.kpi,
          training: inputs.training,
          leave: inputs.leave,
          previousRating: inputs.previousRating,
        });

        const result = res.data;
        // Update selected and predictions list
        setPredictions(prev => prev.map(p => p.employeeId === selected.employeeId ? result : p));
        setSelected(result);

        toast.success('AI prediction completed!', { icon: '🤖' });
      } else {
        // Fallback to mock behavior
        await new Promise(r => setTimeout(r, 2200));

        const avgScore = Math.round((inputs.attendance + inputs.kpi + inputs.training + (100 - inputs.leave)) / 4);
        const mockPrediction: AIPrediction['prediction'] = avgScore >= 85 ? 'High Performer' : avgScore >= 65 ? 'Medium Performer' : 'Low Performer';
        const mockResult: AIPrediction = {
          ...selected,
          id: selected.id.startsWith('TEMP-') ? `AI-${selected.employeeId}` : selected.id,
          confidence: Math.min(99, avgScore),
          prediction: mockPrediction,
          attendanceScore: inputs.attendance,
          experienceScore: inputs.experience,
          kpiScore: inputs.kpi,
          trainingScore: inputs.training,
          leaveImpact: inputs.leave,
          previousRating: inputs.previousRating,
        };

        setPredictions(prev => {
          const exists = prev.some(p => p.employeeId === mockResult.employeeId);
          return exists
            ? prev.map(p => p.employeeId === mockResult.employeeId ? mockResult : p)
            : [...prev, mockResult];
        });
        setSelected(mockResult);

        toast.success('AI prediction completed', { icon: '🤖' });
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Prediction failed. Please try again.', { icon: '❌' });
    } finally {
      setRunning(false);
    }
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

            <h3
              style={{
                fontWeight: 700,
                fontSize: '.85rem',
                color: 'var(--text-primary)',
                marginBottom: 12
              }}
            >
              Select Employee
            </h3>

            <select
              value={selected.employeeId}
              onChange={(e) => {

                const employeeId = e.target.value;
                const employee = mockEmployees.find(emp => emp.id === employeeId);

                if (!employee) return;

                const existingPrediction = predictions.find(p => p.employeeId === employeeId);
                const next = existingPrediction ?? buildDefaultPrediction(employee);

                setSelected(next);

                setInputs({
                  attendance: next.attendanceScore,
                  experience: next.experienceScore,
                  kpi: next.kpiScore,
                  training: next.trainingScore,
                  leave: next.leaveImpact,
                  previousRating: next.previousRating,
                });

              }}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                background: '#fff',
                color: '#111827',
                fontSize: '.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                outline: 'none'
              }}
            >

              {mockEmployees.map((employee) => (

                <option
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.name} ({employee.department})
                </option>

              ))}

            </select>

            {/* Selected Employee Information */}

            <div
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                borderRadius: 10,
                background: 'rgba(79,70,229,.05)'
              }}
            >

              <Avatar
                initials={selected.employeeName
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
                size="md"
              />

              <div style={{ flex: 1 }}>

                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: '.9rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {selected.employeeName}
                </p>

                <p
                  style={{
                    margin: '4px 0',
                    fontSize: '.8rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  {selected.department}
                </p>

              </div>

              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: predictionColor(selected.prediction)
                }}
              />

            </div>

          </div>

          {/* Keep your Input Parameters card here */}

        </div>

        {/* Result Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} onClick={runPrediction} disabled={running || isEmployee}>
          {running ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
              Running AI Model…
            </span>
          ) : isEmployee ? (
            <><FiZap size={15} /> Access Restricted</>
          ) : (
            <><FiZap size={15} /> Run Prediction</>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default AIPredictionPage;
