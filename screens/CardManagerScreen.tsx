import React, { useState } from 'react';
import { PrepaidCard } from '../components/PrepaidCard';
import { DepositForm, WithdrawalForm } from '../components/TransactionForms';
import { TransferForm } from '../components/TransferForm';
import { TransactionHistory } from '../components/TransactionHistory';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { CurrencySwitcher } from '../components/CurrencySwitcher';
import { Contact, Transaction, TransactionType, User } from '../types';
import { AddContactDialog } from '../components/AddContactDialog';
import { ContactList } from '../components/ContactList';
import { NotificationBell } from '../components/NotificationBell';
import { NotificationPanel } from '../components/NotificationPanel';

interface CardManagerScreenProps {
  user: User;
  allUsers: User[];
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onTransfer: (sender: User, recipient: User, amount: number) => boolean;
  onAddContact: (user: User, contact: Contact) => void;
  onMarkNotificationsAsRead: () => void;
  onClearNotifications: () => void;
}

export const CardManagerScreen: React.FC<CardManagerScreenProps> = ({ user, allUsers, onLogout, onUpdateUser, onTransfer, onAddContact, onMarkNotificationsAsRead, onClearNotifications }) => {
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('');
  const [lastRecipient, setLastRecipient] = useState<Contact | null>(null);

  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [exchangeRate] = useState<number>(1.08);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'deposit' | 'withdrawal' | 'transfer' | null;
    amount: number | null;
    recipientInfo?: { id: number, name: string; cardNumber: string };
  }>({ isOpen: false, type: null, amount: null });

  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const getDisplayBalance = (balanceInEur: number) => {
    return currency === 'USD' ? balanceInEur * exchangeRate : balanceInEur;
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '';
    const displayAmount = getDisplayBalance(amount);
    const locale = currency === 'EUR' ? 'es-ES' : 'en-US';
    return displayAmount.toLocaleString(locale, { style: 'currency', currency: currency });
  };

  const openModal = (type: 'deposit' | 'withdrawal' | 'transfer', amountStr: string, recipientCard?: string) => {
    const amountInDisplayCurrency = parseFloat(amountStr);
    if (isNaN(amountInDisplayCurrency) || amountInDisplayCurrency <= 0) return;
    
    const amountInBaseCurrency = currency === 'USD' ? amountInDisplayCurrency / exchangeRate : amountInDisplayCurrency;
    
    let recipientInfo;
    if (type === 'transfer' && recipientCard) {
      const recipient = allUsers.find(u => u.cardNumber === recipientCard);
      if (!recipient) {
          alert("Destinatario no encontrado.");
          return;
      }
       if (user.id === recipient.id) {
          alert("No puedes transferirte a ti mismo.");
          return;
      }
      recipientInfo = { id: recipient.id, name: recipient.name, cardNumber: recipient.cardNumber };
    }

    setModalState({ isOpen: true, type, amount: amountInBaseCurrency, recipientInfo });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, amount: null });
    setDepositAmount('');
    setWithdrawalAmount('');
  };

  const handleConfirm = () => {
    const { type, amount, recipientInfo } = modalState;
    if (amount === null || type === null) return;

    let newTransaction: Transaction | null = null;
    let updatedUser: User = { ...user };

    if (type === 'deposit') {
      updatedUser.balance += amount;
      newTransaction = { id: Date.now(), type: TransactionType.DEPOSIT, amount, date: new Date() };
      new Audio('https://cdn.freesound.org/previews/276/276216_5121236-lq.mp3').play();
    }
    
    if (type === 'withdrawal') {
      updatedUser.balance -= amount;
      newTransaction = { id: Date.now(), type: TransactionType.WITHDRAWAL, amount, date: new Date() };
      new Audio('https://cdn.freesound.org/previews/44/44379_384093-lq.mp3').play();
    }

    if (type === 'transfer' && recipientInfo) {
      const recipient = allUsers.find(u => u.id === recipientInfo.id);
      if(!recipient) return;

      const success = onTransfer(user, recipient, amount);
      if(success) {
        new Audio('https://cdn.freesound.org/previews/58/58718_6-lq.mp3').play();
        const isRecipientInContacts = user.contacts.some(c => c.cardNumber === recipient.cardNumber);
        if(!isRecipientInContacts){
            setLastRecipient({ name: recipient.name, cardNumber: recipient.cardNumber });
        }
      }
    } 
    
    if (newTransaction) {
       updatedUser.transactions = [newTransaction, ...user.transactions];
       onUpdateUser(updatedUser);
    }

    closeModal();
  };

  const renderModalContent = () => {
    switch (modalState.type) {
      case 'deposit':
        return {
          title: "Confirmar Depósito",
          buttonText: "Confirmar Depósito",
          buttonClass: "bg-green-600 hover:bg-green-700",
          content: <>¿Estás seguro de que deseas depositar <strong className="text-green-400">{formatCurrency(modalState.amount)}</strong>?</>
        };
      case 'withdrawal':
        return {
          title: "Confirmar Retiro",
          buttonText: "Confirmar Retiro",
          buttonClass: "bg-red-600 hover:bg-red-700",
          content: <>¿Estás seguro de que deseas retirar <strong className="text-red-400">{formatCurrency(modalState.amount)}</strong>?</>
        };
      case 'transfer':
        return {
          title: "Confirmar Transferencia",
          buttonText: "Confirmar Transferencia",
          buttonClass: "bg-blue-600 hover:bg-blue-700",
          content: <>¿Estás seguro de que deseas enviar <strong className="text-blue-400">{formatCurrency(modalState.amount)}</strong> a <strong className="text-white">{modalState.recipientInfo?.name}</strong>?</>
        };
      default: return null;
    }
  };
  const modalContent = renderModalContent();
  
  const handleAddLastRecipient = () => {
      if(lastRecipient) {
          onAddContact(user, lastRecipient);
          setLastRecipient(null);
      }
  }

  const handleAddNewContact = (contact: Contact) => {
    onAddContact(user, contact);
  };
  
  const handleToggleNotifications = () => {
    if (!isNotificationPanelOpen) {
      onMarkNotificationsAsRead();
    }
    setIsNotificationPanelOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <ConfirmationDialog
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={modalContent?.title || ''}
        confirmButtonText={modalContent?.buttonText || ''}
        confirmButtonClassName={modalContent?.buttonClass || ''}
      >
        <p className="text-slate-300 mb-6">{modalContent?.content}</p>
      </ConfirmationDialog>

      <AddContactDialog 
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        onAddContact={handleAddNewContact}
        currentUser={user}
        allUsers={allUsers}
      />

      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-3xl font-bold text-white">Hola, {user.name}</h1>
                <p className="text-slate-400 mt-1">Bienvenido a tu gestor de tarjeta.</p>
            </div>
            <div className="flex items-center space-x-4">
              <CurrencySwitcher currency={currency} onCurrencyChange={setCurrency} />
              <div className="relative">
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
              <button onClick={onLogout} className="px-4 py-2 text-sm font-semibold rounded-md bg-slate-700 hover:bg-slate-600 transition-colors">
                Cerrar Sesión
              </button>
            </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PrepaidCard
              userName={user.name}
              cardNumber={user.cardNumber}
              balance={getDisplayBalance(user.balance)}
              currency={currency}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DepositForm
                amount={depositAmount}
                onAmountChange={setDepositAmount}
                onSubmit={(e) => { e.preventDefault(); openModal('deposit', depositAmount); }}
              />
              <WithdrawalForm
                amount={withdrawalAmount}
                onAmountChange={setWithdrawalAmount}
                onSubmit={(e) => { e.preventDefault(); openModal('withdrawal', withdrawalAmount); }}
                balance={getDisplayBalance(user.balance)}
              />
            </div>
            <TransferForm 
                onSubmit={(recipientCard, amount) => openModal('transfer', amount, recipientCard)}
                balance={getDisplayBalance(user.balance)}
                contacts={user.contacts}
            />
            {lastRecipient && (
                <div className="bg-indigo-800/50 rounded-xl p-4 flex items-center justify-between">
                    <p className="text-indigo-200">¿Quieres guardar a <span className="font-bold">{lastRecipient.name}</span> en tus contactos?</p>
                    <button onClick={handleAddLastRecipient} className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200 text-sm">
                        Añadir Contacto
                    </button>
                </div>
            )}
            <ContactList 
              contacts={user.contacts} 
              onAddContactClick={() => setIsAddContactModalOpen(true)}
            />
          </div>
          <div className="lg:col-span-1">
             <TransactionHistory transactions={user.transactions} currency={currency} exchangeRate={exchangeRate} />
          </div>
        </main>
      </div>
    </div>
  );
}