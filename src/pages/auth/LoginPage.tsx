import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../context/AuthContext';
import toast from 'react-hot-toast';

interface LoginForm { email: string; password: string; role: UserRole; }

const ROLES: UserRole[] = ['Administrator', 'HR Manager', 'Employee'];

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: { email: 'admin@hrms.ng', password: 'password', role: 'Administrator' },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await login(data.email, data.password, data.role);
      toast.success(`Welcome back! Logged in as ${data.role}`);
      navigate('/dashboard');
    } catch {
      toast.error('Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="animate-fadeInUp">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Welcome back 👋</h2>
        <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)' }}>Sign in to your AI-HRMS account</p>
      </div>

      {/* Quick login hints */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: 24, background: 'rgba(79,70,229,.06)', border: '1px solid rgba(79,70,229,.2)' }}>
        <p style={{ fontSize: '.75rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 6 }}>🔑 Demo Credentials</p>
        <p style={{ fontSize: '.73rem', color: 'var(--text-secondary)' }}>admin@hrms.ng / hr@hrms.ng / emp@hrms.ng — any password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Role Selector */}
        <div>
          <label className="form-label">Role</label>
          <select className="form-input" {...register('role', { required: true })}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="form-label">Email Address</label>
          <div style={{ position: 'relative' }}>
            <FiMail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              type="email"
              className="form-input"
              style={{ paddingLeft: 36 }}
              placeholder="you@company.ng"
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
            />
          </div>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <FiLock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              type={showPass ? 'text' : 'password'}
              className="form-input"
              style={{ paddingLeft: 36, paddingRight: 40 }}
              placeholder="Enter password"
              {...register('password', { required: 'Password is required', minLength: { value: 4, message: 'Minimum 4 characters' } })}
            />
            <button type="button" onClick={() => setShowPass(p => !p)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </button>
          </div>
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-end">
          <Link to="/forgot-password" style={{ fontSize: '.8rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ marginTop: 4 }}>
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
              Signing in…
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiZap size={16} /> Sign In</span>
          )}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '.85rem', color: 'var(--text-secondary)', marginTop: 24 }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Create account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
