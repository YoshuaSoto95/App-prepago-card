import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { NotificationBell } from './NotificationBell';
import { NotificationPanel } from './NotificationPanel';
import { LogoutIcon } from './Icons';

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
  onMarkNotificationsAsRead: () => void;
  onClearNotifications: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onLogout, onMarkNotificationsAsRead, onClearNotifications }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationPanelRef = useRef<HTMLDivElement>(null);


  const handleToggleNotifications = () => {
    if (!isNotificationPanelOpen) {
      onMarkNotificationsAsRead();
    }
    setIsNotificationPanelOpen(prev => !prev);
    setIsUserMenuOpen(false); // Close user menu when opening notifications
  };

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen(prev => !prev);
    setIsNotificationPanelOpen(false); // Close notifications when opening user menu
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
       if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target as Node)) {
        setIsNotificationPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">Fintech Manager</h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
             {/* Notifications */}
            <div className="relative" ref={notificationPanelRef}>
                <NotificationBell 
                    notifications={user.notifications} 
                    onClick={handleToggleNotifications} 
                />
                {isNotificationPanelOpen && (
                    <NotificationPanel 
                        notifications={user.notifications} 
                        onClose={() => setIsNotificationPanelOpen(false)}
                        onClearAll={() => {
                            onClearNotifications();
                            setIsNotificationPanelOpen(false);
                        }}
                    />
                )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={handleToggleUserMenu}
                className="flex items-center space-x-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                <span>Hola, {user.name}</span>
                <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg border border-slate-700 z-50 transform transition-all origin-top-right animate-fade-in-down">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-red-400 flex items-center space-x-2 transition-colors"
                      role="menuitem"
                    >
                      <LogoutIcon className="w-5 h-5" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-down {
            animation: fade-in-down 0.2s ease-out forwards;
        }
    `}</style>
    </header>
  );
};