import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ForgotForm { email: string; }

const ForgotPasswordPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>();

  const onSubmit = async (_data: ForgotForm) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success('Password reset link sent!');
  };

  if (sent) {
    return (
      <div className="animate-fadeInUp text-center">
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#16a34a' }}>
          <FiCheckCircle size={36} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Check your email</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: 32 }}>
          We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
        </p>
        <Link to="/login" className="btn btn-primary btn-lg" style={{ display: 'inline-flex' }}>
          <FiArrowLeft size={15} /> Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeInUp">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Reset Password</h2>
        <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)' }}>Enter your email to receive a reset link</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label className="form-label">Email Address</label>
          <div style={{ position: 'relative' }}>
            <FiMail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input type="email" className="form-input" style={{ paddingLeft: 36 }} placeholder="you@company.ng"
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} />
          </div>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
              Sending…
            </span>
          ) : 'Send Reset Link'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '.85rem', color: 'var(--text-secondary)', marginTop: 24 }}>
        <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <FiArrowLeft size={13} /> Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
