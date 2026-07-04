import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const end = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  return (
    <div className="flex items-center justify-between flex-wrap gap-3" style={{ padding: '12px 0' }}>
      {totalItems && start && end ? (
        <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>
          Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{totalItems}</strong> results
        </p>
      ) : <div />}

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-ghost btn-sm"
          style={{ minWidth: 32, padding: '6px 10px' }}
        >
          ←
        </button>
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className="btn btn-sm"
            style={{
              minWidth: 34, padding: '6px 10px',
              background: p === currentPage ? 'var(--color-primary)' : 'transparent',
              color: p === currentPage ? '#fff' : 'var(--text-secondary)',
              border: p === currentPage ? 'none' : '1px solid rgba(148,163,184,.25)',
            }}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-ghost btn-sm"
          style={{ minWidth: 32, padding: '6px 10px' }}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
