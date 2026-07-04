import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  gradient: string;
  change?: number;
  changeLabel?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, gradient, change, changeLabel }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={`card card-hover p-5 relative overflow-hidden animate-fadeInUp`}>
      {/* Background glow */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 ${gradient}`} />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>
            {title}
          </p>
          <p style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            {value}
          </p>
          {subtitle && (
            <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginTop: 4 }}>{subtitle}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span style={{
                fontSize: '.75rem', fontWeight: 700,
                color: isPositive ? '#10b981' : '#ef4444',
              }}>
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={`${gradient} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
