import React from 'react';
import { DepositIcon, WithdrawalIcon } from './Icons';

interface DepositFormProps {
  amount: string;
  onAmountChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const DepositForm: React.FC<DepositFormProps> = ({ amount, onAmountChange, onSubmit }) => {
  const numAmount = parseFloat(amount);
  const isDisabled = !amount || isNaN(numAmount) || numAmount <= 0;

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
      <form onSubmit={onSubmit}>
        <label htmlFor="deposit" className="block text-sm font-medium text-slate-300 mb-2">Depositar Fondos</label>
        <div className="flex items-center space-x-2">
          <input
            id="deposit"
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            step="0.01"
            min="0.01"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="flex-shrink-0 bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500"
          >
            <DepositIcon className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};


interface WithdrawalFormProps {
  amount: string;
  onAmountChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  balance: number;
}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({ amount, onAmountChange, onSubmit, balance }) => {
  const numAmount = parseFloat(amount);
  const isDisabled = !amount || isNaN(numAmount) || numAmount <= 0 || numAmount > balance;

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
      <form onSubmit={onSubmit}>
        <label htmlFor="withdraw" className="block text-sm font-medium text-slate-300 mb-2">Retirar Fondos</label>
        <div className="flex items-center space-x-2">
          <input
            id="withdraw"
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            step="0.01"
            min="0.01"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="flex-shrink-0 bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500"
          >
             <WithdrawalIcon className="w-6 h-6" />
          </button>
        </div>
        {numAmount > balance && <p className="text-red-400 text-xs mt-2">Fondos insuficientes.</p>}
      </form>
    </div>
  );
};