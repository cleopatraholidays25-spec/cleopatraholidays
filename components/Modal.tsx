import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import XIcon from './icons/XIcon';
import { useI18n } from '../hooks/useI18n';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { t } = useI18n();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
    >
      <div
        className="relative bg-white dark:bg-navy rounded-lg shadow-xl w-full max-w-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                <h2 id="modal-title" className="text-xl font-bold text-gold">{title}</h2>
                <button 
                    onClick={onClose} 
                    className="text-gray-500 hover:text-gold dark:hover:text-gold transition-colors"
                    aria-label={t('modal.close')}
                >
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <div>{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;