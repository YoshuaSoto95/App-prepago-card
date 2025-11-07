import React from 'react';
import { Transaction, TransactionType } from '../types';
import { DepositIcon, WithdrawalIcon } from './Icons';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const isDeposit = transaction.type === TransactionType.DEPOSIT;
  const amountColor = isDeposit ? 'text-green-400' : 'text-red-400';
  const sign = isDeposit ? '+' : '-';

  return (
    <li className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${isDeposit ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
          {isDeposit ? <DepositIcon className="w-5 h-5 text-green-400" /> : <WithdrawalIcon className="w-5 h-5 text-red-400" />}
        </div>
        <div>
          <p className="font-semibold">{isDeposit ? 'Depósito' : 'Retiro'}</p>
          <p className="text-sm text-slate-400">
            {transaction.date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
            {' a las '}
            {transaction.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      <p className={`font-semibold text-lg ${amountColor}`}>
        {sign}{transaction.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
      </p>
    </li>
  );
};

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm h-full">
      <h3 className="text-xl font-bold mb-4">Historial de Movimientos</h3>
      {transactions.length === 0 ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-slate-400">No hay movimientos todavía.</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-700">
          {transactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
        </ul>
      )}
    </div>
  );
};