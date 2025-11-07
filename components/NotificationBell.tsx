import React from 'react';
import { Notification } from '../types';
import { BellIcon } from './Icons';

interface NotificationBellProps {
    notifications: Notification[];
    onClick: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ notifications, onClick }) => {
    const hasUnread = notifications.some(n => !n.read);

    return (
        <button 
            onClick={onClick}
            className="relative p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
            aria-label={`Notificaciones ${hasUnread ? '(no leídas)' : ''}`}
        >
            <BellIcon className="w-6 h-6 text-slate-200" />
            {hasUnread && (
                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-slate-700">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                </span>
            )}
        </button>
    );
};