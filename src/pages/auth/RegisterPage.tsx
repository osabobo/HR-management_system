import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../context/AuthContext';
import toast from 'react-hot-toast';

interface RegisterForm { name: string; email: string; password: string; confirm: string; role: UserRole; }

const ROLES: UserRole[] = ['Administrator', 'HR Manager', 'Employee'];

const RegisterPage: React.FC = () => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: { role: 'Employee' },
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await authRegister(data.name, data.email, data.password, data.role);
      toast.success('Account created! Welcome to AI-HRMS');
      navigate('/dashboard');
    } catch { toast.error('Registration failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="animate-fadeInUp">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Create Account</h2>
        <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)' }}>Join AI-HRMS to streamline your HR operations</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label className="form-label">Full Name</label>
          <div style={{ position: 'relative' }}>
            <FiUser size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input type="text" className="form-input" style={{ paddingLeft: 36 }} placeholder="Adaeze Okonkwo"
              {...register('name', { required: 'Full name is required', minLength: { value: 3, message: 'Minimum 3 characters' } })} />
          </div>
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div>
          <label className="form-label">Role</label>
          <select className="form-input" {...register('role', { required: true })}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="form-label">Email Address</label>
          <div style={{ position: 'relative' }}>
            <FiMail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input type="email" className="form-input" style={{ paddingLeft: 36 }} placeholder="you@company.ng"
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} />
          </div>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div>
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <FiLock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input type={showPass ? 'text' : 'password'} className="form-input" style={{ paddingLeft: 36, paddingRight: 40 }} placeholder="Create a strong password"
              {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Minimum 6 characters' } })} />
            <button type="button" onClick={() => setShowPass(p => !p)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </button>
          </div>
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>

        <div>
          <label className="form-label">Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <FiLock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input type={showPass ? 'text' : 'password'} className="form-input" style={{ paddingLeft: 36 }} placeholder="Repeat your password"
              {...register('confirm', { required: 'Please confirm your password', validate: v => v === watch('password') || 'Passwords do not match' })} />
          </div>
          {errors.confirm && <p className="form-error">{errors.confirm.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
              Creating account…
            </span>
          ) : 'Create Account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '.85rem', color: 'var(--text-secondary)', marginTop: 24 }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
