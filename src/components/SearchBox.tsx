import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ minWidth: 220 }}>
      <FiSearch
        size={15}
        style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
      />
      <input
        type="text"
        className="form-input"
        style={{ paddingLeft: 36, paddingRight: value ? 36 : 14 }}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
        >
          <FiX size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
