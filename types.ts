export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER_SENT = 'TRANSFER_SENT',
  TRANSFER_RECEIVED = 'TRANSFER_RECEIVED',
}

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  date: Date;
  senderName?: string;
  recipientName?: string;
  recipientCardNumber?: string;
}

export interface Contact {
    name: string;
    cardNumber: string;
}

export interface Notification {
  id: number;
  message: string;
  date: Date;
  read: boolean;
}

export interface User {
  id: number;
  name: string;
  password: string; // En una app real, esto debería estar hasheado.
  cardNumber: string;
  balance: number;
  transactions: Transaction[];
  contacts: Contact[];
  notifications: Notification[];
  cardStyle: string; // Nueva propiedad para el estilo de la tarjeta
}