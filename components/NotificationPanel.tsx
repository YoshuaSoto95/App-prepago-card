import React from 'react';
import { Notification } from '../types';

interface NotificationPanelProps {
    notifications: Notification[];
    onClose: () => void;
    onClearAll: () => void;
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => (
    <div className="p-3 hover:bg-slate-600/50 rounded-md transition-colors">
        <p className="text-sm text-slate-200">{notification.message}</p>
        <p className="text-xs text-slate-400 mt-1">
            {new Date(notification.date).toLocaleString('es-ES', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            })}
        </p>
    </div>
);

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onClose, onClearAll }) => {
    const sortedNotifications = [...notifications].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div 
            className="absolute top-full right-0 mt-2 w-80 max-w-sm bg-slate-800 rounded-xl shadow-2xl border border-slate-700 z-50 transform transition-all duration-300 origin-top-right animate-fade-in-down"
            role="dialog"
            aria-labelledby="notification-panel-title"
        >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 id="notification-panel-title" className="font-bold text-lg">Notificaciones</h3>
                <button 
                    onClick={onClose} 
                    className="text-slate-400 hover:text-white"
                    aria-label="Cerrar notificaciones"
                >
                    &times;
                </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
                {sortedNotifications.length > 0 ? (
                    sortedNotifications.map(n => <NotificationItem key={n.id} notification={n} />)
                ) : (
                    <p className="text-slate-400 text-center py-8 px-4 text-sm">No tienes notificaciones.</p>
                )}
            </div>
            {notifications.length > 0 && (
                <div className="p-2 border-t border-slate-700">
                    <button 
                        onClick={onClearAll} 
                        className="w-full text-center text-sm py-2 text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors"
                    >
                        Limpiar Todo
                    </button>
                </div>
            )}
            <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};