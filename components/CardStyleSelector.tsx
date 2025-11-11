import React, { useState } from 'react';
import { cardStyles } from './PrepaidCard';

interface CardStyleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStyle: (styleKey: string) => void;
  currentStyle: string;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


export const CardStyleSelector: React.FC<CardStyleSelectorProps> = ({ 
  isOpen, 
  onClose, 
  onSelectStyle,
  currentStyle
}) => {
  const [selectedStyle, setSelectedStyle] = useState(currentStyle);

  const handleSave = () => {
    onSelectStyle(selectedStyle);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      aria-labelledby="style-selector-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-lg border border-slate-700 transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <h2 id="style-selector-title" className="text-2xl font-bold text-white mb-4">Elige un Diseño</h2>
        <p className="text-slate-400 mb-6">Selecciona el estilo que más te guste para tu tarjeta.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(cardStyles).map(([key, style]) => (
                <button 
                    key={key}
                    onClick={() => setSelectedStyle(key)}
                    className="relative rounded-lg h-24 w-full shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                    style={{ background: style }}
                    aria-pressed={selectedStyle === key}
                >
                    {selectedStyle === key && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                           <CheckIcon className="w-8 h-8 text-white" />
                        </div>
                    )}
                </button>
            ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-slate-600 text-white font-semibold hover:bg-slate-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            Guardar Diseño
          </button>
        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s forwards;
        }
      `}</style>
    </div>
  );
};