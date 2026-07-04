import React from 'react';
import { FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <FiInbox size={48} />,
  title = 'No results found',
  description = 'Try adjusting your search or filters to find what you are looking for.',
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ padding: '64px 24px' }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 16, opacity: .5 }}>{icon}</div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: '.875rem', color: 'var(--text-secondary)', maxWidth: 360, lineHeight: 1.6 }}>{description}</p>
      {action && <div style={{ marginTop: 24 }}>{action}</div>}
    </div>
  );
};

export default EmptyState;
