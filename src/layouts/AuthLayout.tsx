import React from 'react';
import { Outlet } from 'react-router-dom';
import { FiZap } from 'react-icons/fi';

const AuthLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-base)' }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex"
        style={{
          width: '45%', flexShrink: 0,
          background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 40%, #1e3a5f 100%)',
          flexDirection: 'column', justifyContent: 'space-between',
          padding: '40px', position: 'relative', overflow: 'hidden',
          display: 'flex',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(99,102,241,.15)', top: -100, right: -100 }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(6,182,212,.1)', bottom: -80, left: -80 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{ background: 'linear-gradient(135deg,#818cf8,#06b6d4)', borderRadius: 14, padding: 10, display: 'flex' }}>
              <FiZap size={22} color="#fff" />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>AI-HRMS</p>
              <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '.72rem', letterSpacing: '.1em' }}>NIGERIAN SMEs PLATFORM</p>
            </div>
          </div>
          <h2 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.25, marginBottom: 20 }}>
            AI-Enabled Human Resource Management
          </h2>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 400 }}>
            Predict employee performance, manage attendance, and make data-driven HR decisions — all powered by advanced AI analytics tailored for Nigerian SMEs.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Employees Managed', value: '1,200+' },
            { label: 'Prediction Accuracy', value: '94%' },
            { label: 'SMEs Onboarded', value: '85+' },
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
              <span style={{ color: 'rgba(255,255,255,.6)', fontSize: '.875rem' }}>{stat.label}</span>
              <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '.875rem' }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
