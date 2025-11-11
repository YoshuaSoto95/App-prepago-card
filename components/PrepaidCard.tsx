import React from 'react';

// Definimos los estilos de las tarjetas en un objeto para fácil acceso
export const cardStyles: { [key: string]: string } = {
  default: 'linear-gradient(to bottom right, #4f46e5, #a855f7, #ec4899)',
  ocean: 'linear-gradient(to bottom right, #0077b6, #00b4d8, #90e0ef)',
  sunset: 'linear-gradient(to bottom right, #f77737, #f53844, #ffc857)',
  emerald: 'linear-gradient(to bottom right, #059669, #10b981, #6ee7b7)',
  midnight: 'linear-gradient(to bottom right, #1e293b, #334155, #475569)',
  amethyst: 'linear-gradient(to bottom right, #6d28d9, #8b5cf6, #a78bfa)',
};

const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);


interface PrepaidCardProps {
  userName: string;
  cardNumber: string;
  balance: number;
  cardStyle: string;
  onStyleChangeClick: () => void;
}

export const PrepaidCard: React.FC<PrepaidCardProps> = ({ userName, cardNumber, balance, cardStyle, onStyleChangeClick }) => {
  const backgroundStyle = cardStyles[cardStyle] || cardStyles.default;

  return (
    <div 
        className="w-full max-w-lg mx-auto p-6 rounded-2xl shadow-2xl text-white relative overflow-hidden animated-gradient"
        style={{ backgroundImage: backgroundStyle }}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">Tarjeta Prepago</h2>
        <div className="w-12 h-8 bg-yellow-400/80 rounded-md flex items-center justify-start p-1">
          <div className="w-5 h-5 bg-yellow-500/90 rounded-sm"></div>
        </div>
      </div>
      <div className="mt-6">
        <span className="text-sm text-white/80">Saldo Actual</span>
        <p className="text-4xl font-semibold tracking-wider">
          {balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
      </div>
       <div className="mt-6 flex justify-between items-end">
        <div>
          <span className="text-xs text-white/80">Titular</span>
          <p className="text-lg font-medium tracking-wide">{userName}</p>
        </div>
        <div>
           <span className="text-xs text-white/80">Número de Tarjeta</span>
          <p className="text-lg font-mono tracking-widest">{cardNumber}</p>
        </div>
      </div>
      <button 
        onClick={onStyleChangeClick}
        className="absolute top-4 right-20 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors duration-200"
        aria-label="Cambiar diseño de la tarjeta"
      >
          <EditIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};