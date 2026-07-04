import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gray';
  dot?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'gray', dot = false, className = '' }) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />}
      {children}
    </span>
  );
};

export default Badge;
