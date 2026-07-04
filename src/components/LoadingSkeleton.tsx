import React from 'react';

interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
  type?: 'table' | 'card' | 'list' | 'stat';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows = 5, className = '', type = 'table' }) => {
  if (type === 'stat') {
    return (
      <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="card p-5">
            <div className="skeleton h-3 w-20 mb-3" />
            <div className="skeleton h-8 w-16 mb-2" />
            <div className="skeleton h-2 w-12" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="skeleton rounded-full w-12 h-12" />
              <div className="flex-1">
                <div className="skeleton h-4 w-32 mb-2" />
                <div className="skeleton h-3 w-20" />
              </div>
            </div>
            <div className="skeleton h-3 w-full mb-2" />
            <div className="skeleton h-3 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="skeleton rounded-full w-10 h-10 flex-shrink-0" />
            <div className="flex-1">
              <div className="skeleton h-3 w-40 mb-2" />
              <div className="skeleton h-2 w-60" />
            </div>
            <div className="skeleton h-3 w-16" />
          </div>
        ))}
      </div>
    );
  }

  // Default: table
  return (
    <div className={`${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4 border-b" style={{ borderColor: 'rgba(148,163,184,.08)' }}>
          <div className="skeleton rounded-full w-10 h-10 flex-shrink-0" />
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-4 w-24 ml-auto" />
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
