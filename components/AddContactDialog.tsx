import React, { useState, useEffect } from 'react';
import { User, Contact } from '../types';

interface AddContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (contact: Contact) => void;
  currentUser: User;
  allUsers: User[];
}

export const AddContactDialog: React.FC<AddContactDialogProps> = ({ 
  isOpen, 
  onClose, 
  onAddContact,
  currentUser,
  allUsers
}) => {
  const [step, setStep] = useState<'input' | 'confirm'>('input');
  const [cardNumberInput, setCardNumberInput] = useState('');
  const [foundContact, setFoundContact] = useState<Contact | null>(null);
  const [error, setError] = useState('');

  // Reset state when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('input');
        setCardNumberInput('');
        setFoundContact(null);
        setError('');
      }, 300); // Wait for closing animation
    }
  }, [isOpen]);

  const handleSearch = () => {
    setError('');
    
    if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumberInput)) {
        setError('Formato de tarjeta inválido. Usa XXXX-XXXX-XXXX-XXXX.');
        return;
    }

    if (cardNumberInput === currentUser.cardNumber) {
        setError('No puedes agregarte a ti mismo.');
        return;
    }

    if (currentUser.contacts.some(c => c.cardNumber === cardNumberInput)) {
        setError('Este usuario ya está en tus contactos.');
        return;
    }

    const foundUser = allUsers.find(u => u.cardNumber === cardNumberInput);

    if (!foundUser) {
        setError('No se encontró ningún usuario con ese número de tarjeta.');
        return;
    }

    setFoundContact({ name: foundUser.name, cardNumber: foundUser.cardNumber });
    setStep('confirm');
  };

  const handleConfirm = () => {
    if (foundContact) {
      onAddContact(foundContact);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      aria-labelledby="add-contact-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md border border-slate-700 transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        {step === 'input' && (
            <>
                <h2 id="add-contact-title" className="text-2xl font-bold text-white mb-4">Añadir Nuevo Contacto</h2>
                <p className="text-slate-400 mb-6">Ingresa el número de tarjeta del contacto que deseas agregar.</p>
                <div className="space-y-4">
                     <input
                        type="text"
                        value={cardNumberInput}
                        onChange={(e) => setCardNumberInput(e.target.value)}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={onClose} className="px-6 py-2 rounded-md bg-slate-600 text-white font-semibold hover:bg-slate-500 transition-colors duration-200">Cancelar</button>
                    <button onClick={handleSearch} className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-200">Buscar</button>
                </div>
            </>
        )}
        {step === 'confirm' && foundContact && (
            <>
                <h2 id="add-contact-title" className="text-2xl font-bold text-white mb-4">Confirmar Contacto</h2>
                <p className="text-slate-300 mb-6 text-lg">
                    ¿Deseas agregar a <strong className="text-indigo-400">{foundContact.name}</strong> a tu lista de contactos?
                </p>
                <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={() => setStep('input')} className="px-6 py-2 rounded-md bg-slate-600 text-white font-semibold hover:bg-slate-500 transition-colors duration-200">Atrás</button>
                    <button onClick={handleConfirm} className="px-6 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200">Confirmar</button>
                </div>
            </>
        )}
      </div>
       {/* Basic animation styles */}
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