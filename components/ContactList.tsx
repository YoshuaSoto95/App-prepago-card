import React from 'react';
import { Contact } from '../types';

const AddIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);


interface ContactListProps {
    contacts: Contact[];
    onAddContactClick: () => void;
}

export const ContactList: React.FC<ContactListProps> = ({ contacts, onAddContactClick }) => (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Contactos</h3>
            <button 
                onClick={onAddContactClick}
                className="flex items-center space-x-2 bg-indigo-500 text-white font-bold py-2 px-3 rounded-md hover:bg-indigo-600 transition-colors duration-200 text-sm"
                aria-label="Añadir nuevo contacto"
            >
                <AddIcon className="w-5 h-5" />
                <span>Añadir</span>
            </button>
        </div>
        {contacts.length === 0 ? (
            <p className="text-slate-400 text-sm">No tienes contactos guardados.</p>
        ) : (
            <ul className="space-y-3">
                {contacts.map(contact => (
                    <li key={contact.cardNumber} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <span className="font-semibold">{contact.name}</span>
                        <span className="font-mono text-sm text-slate-400">{contact.cardNumber}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);