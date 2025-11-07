import React from 'react';
import { Transaction, TransactionType } from '../types';
import { DepositIcon, WithdrawalIcon } from './Icons';

// Un nuevo icono para transferencias
const TransferIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);


const TransactionItem: React.FC<{ transaction: Transaction, currency: 'EUR' | 'USD', exchangeRate: number }> = ({ transaction, currency, exchangeRate }) => {
  const displayAmount = currency === 'USD' ? transaction.amount * exchangeRate : transaction.amount;
  const locale = currency === 'EUR' ? 'es-ES' : 'en-US';

  const renderDetails = () => {
    switch (transaction.type) {
      case TransactionType.DEPOSIT:
        return {
          icon: <DepositIcon className="w-5 h-5 text-green-400" />,
          title: 'Depósito',
          amountClass: 'text-green-400',
          sign: '+',
          description: `Depósito a tu cuenta`,
          bgClass: 'bg-green-500/10'
        };
      case TransactionType.WITHDRAWAL:
        return {
          icon: <WithdrawalIcon className="w-5 h-5 text-red-400" />,
          title: 'Retiro',
          amountClass: 'text-red-400',
          sign: '-',
          description: `Retiro de tu cuenta`,
          bgClass: 'bg-red-500/10'
        };
      case TransactionType.TRANSFER_SENT:
        return {
          icon: <TransferIcon className="w-5 h-5 text-yellow-400" />,
          title: 'Transferencia Enviada',
          amountClass: 'text-red-400',
          sign: '-',
          description: `A ${transaction.recipientName} (${transaction.recipientCardNumber})`,
          bgClass: 'bg-yellow-500/10'
        };
      case TransactionType.TRANSFER_RECEIVED:
        return {
          icon: <TransferIcon className="w-5 h-5 text-cyan-400" />,
          title: 'Transferencia Recibida',
          amountClass: 'text-green-400',
          sign: '+',
          description: `De ${transaction.senderName}`,
          bgClass: 'bg-cyan-500/10'
        };
      default:
        return null;
    }
  };

  const details = renderDetails();
  if (!details) return null;

  return (
    <li className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${details.bgClass}`}>
          {details.icon}
        </div>
        <div>
          <p className="font-semibold">{details.title}</p>
          <p className="text-sm text-slate-400">{details.description}</p>
          <p className="text-xs text-slate-500 mt-1">
            {transaction.date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
            {' a las '}
            {transaction.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      <p className={`font-semibold text-lg ${details.amountClass}`}>
        {details.sign}{displayAmount.toLocaleString(locale, { style: 'currency', currency: currency })}
      </p>
    </li>
  );
};

export const TransactionHistory: React.FC<{ transactions: Transaction[], currency: 'EUR' | 'USD', exchangeRate: number }> = ({ transactions, currency, exchangeRate }) => {
  const sortedTransactions = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm h-full">
      <h3 className="text-xl font-bold mb-4">Historial de Movimientos</h3>
      {sortedTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <p className="text-slate-400">No hay movimientos todavía.</p>
          <p className="text-slate-500 text-sm mt-2">¡Realiza un depósito para empezar!</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-700 max-h-[60vh] overflow-y-auto pr-2">
          {sortedTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} currency={currency} exchangeRate={exchangeRate} />)}
        </ul>
      )}
    </div>
  );
};
