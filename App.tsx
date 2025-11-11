import React, { useState } from 'react';
import { AuthScreen } from './screens/AuthScreen';
import { CardManagerScreen } from './screens/CardManagerScreen';
import { Contact, Notification, Transaction, TransactionType, User } from './types';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (name: string, password: string): boolean => {
    const user = users.find(u => u.name === name && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleRegister = (name: string, password: string): boolean => {
    if (users.some(u => u.name === name)) {
      alert('El nombre de usuario ya existe.');
      return false;
    }
    
    const generateCardNumber = () => {
        let newCardNumber;
        do {
            newCardNumber = Array.from({ length: 4 }, () => 
                Math.floor(1000 + Math.random() * 9000).toString()
            ).join('-');
        } while (users.some(u => u.cardNumber === newCardNumber));
        return newCardNumber;
    };

    const newUser: User = {
      id: Date.now(),
      name,
      password,
      cardNumber: generateCardNumber(),
      balance: 0,
      transactions: [],
      contacts: [],
      notifications: [],
      cardStyle: 'default', // Asignar estilo por defecto
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const updateUserState = (updatedUser: User) => {
    const newUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    setUsers(newUsers);
    setCurrentUser(updatedUser);
  };

  const handleTransfer = (sender: User, recipient: User, amount: number): boolean => {
    if (sender.balance < amount) {
        alert('Fondos insuficientes.');
        return false;
    }

    const senderTransaction: Transaction = {
        id: Date.now(),
        type: TransactionType.TRANSFER_SENT,
        amount,
        date: new Date(),
        recipientName: recipient.name,
        recipientCardNumber: recipient.cardNumber,
    };

    const recipientTransaction: Transaction = {
        id: Date.now() + 1, // Ensure unique ID
        type: TransactionType.TRANSFER_RECEIVED,
        amount,
        date: new Date(),
        senderName: sender.name,
    };
    
    const newNotification: Notification = {
        id: Date.now() + 2,
        message: `Has recibido ${amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} de ${sender.name}.`,
        date: new Date(),
        read: false,
    };

    const updatedSender: User = { 
        ...sender, 
        balance: sender.balance - amount,
        transactions: [senderTransaction, ...sender.transactions] 
    };
    
    const updatedRecipient: User = { 
        ...recipient, 
        balance: recipient.balance + amount,
        transactions: [recipientTransaction, ...recipient.transactions],
        notifications: [newNotification, ...recipient.notifications],
    };

    const newUsers = users.map(u => {
        if (u.id === sender.id) return updatedSender;
        if (u.id === recipient.id) return updatedRecipient;
        return u;
    });

    setUsers(newUsers);
    setCurrentUser(updatedSender);
    return true;
  };
  
  const handleAddContact = (user: User, contact: Contact): boolean => {
      if (user.contacts.some(c => c.cardNumber === contact.cardNumber)) {
          alert("Este contacto ya existe.");
          return false;
      }
       if (user.cardNumber === contact.cardNumber) {
          alert("No puedes agregarte a ti mismo como contacto.");
          return false;
      }

      const updatedUser = {
          ...user,
          contacts: [...user.contacts, contact]
      };
      updateUserState(updatedUser);
      return true;
  };

  const handleMarkNotificationsAsRead = (user: User) => {
    if (user.notifications.every(n => n.read)) return; // No updates needed
    const updatedUser = {
        ...user,
        notifications: user.notifications.map(n => ({ ...n, read: true }))
    };
    updateUserState(updatedUser);
  };

  const handleClearNotifications = (user: User) => {
      const updatedUser = {
          ...user,
          notifications: []
      };
      updateUserState(updatedUser);
  };


  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <CardManagerScreen 
        user={currentUser} 
        allUsers={users} 
        onLogout={handleLogout} 
        onUpdateUser={updateUserState} 
        onTransfer={handleTransfer}
        onAddContact={handleAddContact}
        onMarkNotificationsAsRead={() => handleMarkNotificationsAsRead(currentUser)}
        onClearNotifications={() => handleClearNotifications(currentUser)}
    />
  );
}

export default App;