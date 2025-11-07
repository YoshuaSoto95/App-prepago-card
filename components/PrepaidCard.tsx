import React from 'react';

interface PrepaidCardProps {
  userName: string;
  cardNumber: string;
  balance: number;
  currency: 'EUR' | 'USD';
}

export const PrepaidCard: React.FC<PrepaidCardProps> = ({ userName, cardNumber, balance, currency }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-2xl shadow-2xl text-white bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">Tarjeta Prepago</h2>
        <div className="w-12 h-8 bg-yellow-400 rounded-md flex items-center justify-start p-1">
          <div className="w-5 h-5 bg-yellow-500 rounded-sm"></div>
        </div>
      </div>
      <div className="mt-6">
        <span className="text-sm text-indigo-100">Saldo Actual</span>
        <p className="text-4xl font-semibold tracking-wider">
          {balance.toLocaleString(currency === 'EUR' ? 'es-ES' : 'en-US', { style: 'currency', currency })}
        </p>
      </div>
       <div className="mt-6 flex justify-between items-end">
        <div>
          <span className="text-xs text-indigo-100">Titular</span>
          <p className="text-lg font-medium tracking-wide">{userName}</p>
        </div>
        <div>
           <span className="text-xs text-indigo-100">Número de Tarjeta</span>
          <p className="text-lg font-mono tracking-widest">{cardNumber}</p>
        </div>
      </div>
    </div>
  );
};
