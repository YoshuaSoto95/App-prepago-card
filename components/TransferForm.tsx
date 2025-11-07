import React, { useState, useEffect } from 'react';
import { Contact } from '../types';

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

interface TransferFormProps {
  onSubmit: (recipientCardNumber: string, amount: string) => void;
  balance: number;
  contacts: Contact[];
}

export const TransferForm: React.FC<TransferFormProps> = ({ 
    onSubmit, 
    balance,
    contacts
}) => {
  const [recipientCardNumber, setRecipientCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleContactSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const cardNumber = e.target.value;
      setRecipientCardNumber(cardNumber);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(recipientCardNumber, amount);
    setRecipientCardNumber('');
    setAmount('');
  };

  const numAmount = parseFloat(amount);
  const isAmountInvalid = !amount || isNaN(numAmount) || numAmount <= 0 || numAmount > balance;
  const isCardNumberInvalid = !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(recipientCardNumber);
  const isDisabled = isAmountInvalid || isCardNumberInvalid;

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="transfer" className="block text-sm font-medium text-slate-300 mb-2">Transferir Fondos</label>
        <div className="space-y-3">
            <select
              onChange={handleContactSelect}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">O seleccionar un contacto...</option>
              {contacts.map(contact => (
                <option key={contact.cardNumber} value={contact.cardNumber}>
                  {contact.name}
                </option>
              ))}
            </select>
            <input
                id="recipient"
                type="text"
                value={recipientCardNumber}
                onChange={(e) => setRecipientCardNumber(e.target.value)}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
             {recipientCardNumber && isCardNumberInvalid && <p className="text-yellow-400 text-xs">Formato de tarjeta inválido.</p>}
            <div className="flex items-center space-x-2">
                <input
                    id="transfer"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="0.01"
                    min="0.01"
                />
                <button
                    type="submit"
                    disabled={isDisabled}
                    className="flex-shrink-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                >
                    <SendIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
        {numAmount > balance && <p className="text-red-400 text-xs mt-2">Fondos insuficientes.</p>}
      </form>
    </div>
  );
};