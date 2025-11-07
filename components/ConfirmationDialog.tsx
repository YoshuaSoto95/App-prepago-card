import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmButtonText: string;
  confirmButtonClassName: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title,
  children,
  confirmButtonText,
  confirmButtonClassName
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      aria-labelledby="confirmation-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md text-center border border-slate-700">
        <h2 id="confirmation-title" className="text-2xl font-bold text-white mb-4">{title}</h2>
        
        {children}

        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-slate-600 text-white font-semibold hover:bg-slate-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 rounded-md text-white font-semibold transition-colors duration-200 ${confirmButtonClassName}`}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
