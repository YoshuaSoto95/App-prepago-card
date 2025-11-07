export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  date: Date;
}