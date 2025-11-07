import React from 'react';

interface PrepaidCardProps {
  cardName: string;
  onCardNameChange: (name: string) => void;
  balance: number;
}

export const PrepaidCard: React.FC<PrepaidCardProps> = ({ cardName, onCardNameChange, balance }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-2xl shadow-2xl text-white bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 transform transition-transform hover:scale-105 duration-300">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">Tarjeta Prepago</h2>
        <div className="w-12 h-8 bg-yellow-400 rounded-md flex items-center justify-start p-1">
          <div className="w-5 h-5 bg-yellow-500 rounded-sm"></div>
        </div>
      </div>
      <div className="mt-8">
        <span className="text-sm text-indigo-100">Saldo Actual</span>
        <p className="text-4xl font-semibold tracking-wider">
          {balance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
        </p>
      </div>
      <div className="mt-8">
        <span className="text-sm text-indigo-100">Nombre de la Tarjeta</span>
        <input
          type="text"
          value={cardName}
          onChange={(e) => onCardNameChange(e.target.value)}
          placeholder="Nombre de la Tarjeta"
          className="w-full bg-transparent border-b-2 border-indigo-200/50 focus:border-white text-xl font-medium outline-none py-1 placeholder-indigo-100/70"
        />
      </div>
    </div>
  );
};