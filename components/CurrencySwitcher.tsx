import React from 'react';

interface CurrencySwitcherProps {
  currency: 'EUR' | 'USD';
  onCurrencyChange: (currency: 'EUR' | 'USD') => void;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ currency, onCurrencyChange }) => {
  const inactiveClass = 'bg-slate-800/60 text-slate-300 hover:bg-slate-700';
  const activeClass = 'bg-indigo-600 text-white shadow-md';

  return (
    <div className="flex items-center p-1 rounded-full bg-slate-900 border border-slate-700">
      <button
        onClick={() => onCurrencyChange('EUR')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${currency === 'EUR' ? activeClass : inactiveClass}`}
        aria-pressed={currency === 'EUR'}
      >
        EUR €
      </button>
      <button
        onClick={() => onCurrencyChange('USD')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${currency === 'USD' ? activeClass : inactiveClass}`}
        aria-pressed={currency === 'USD'}
      >
        USD $
      </button>
    </div>
  );
};