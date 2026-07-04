import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
}

const sizeMap = { sm: 380, md: 560, lg: 720, xl: 900 };

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md', footer }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div
            ref={ref}
            className="modal-box"
            style={{ maxWidth: sizeMap[size] }}
            initial={{ opacity: 0, scale: .95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .95, y: 20 }}
            transition={{ duration: .2, ease: [.4, 0, .2, 1] }}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between" style={{ padding: '20px 24px', borderBottom: '1px solid rgba(148,163,184,.12)' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
                <button onClick={onClose} className="btn btn-ghost btn-icon" style={{ padding: 6 }}>
                  <FiX size={18} />
                </button>
              </div>
            )}
            {/* Body */}
            <div style={{ padding: '24px' }}>
              {children}
            </div>
            {/* Footer */}
            {footer && (
              <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(148,163,184,.12)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
