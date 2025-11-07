import React, { useState } from 'react';
import { PrepaidCard } from './components/PrepaidCard';
import { DepositForm, WithdrawalForm } from './components/TransactionForms';
import { TransactionHistory } from './components/TransactionHistory';
import { ConfirmationDialog } from './components/ConfirmationDialog';
import { Transaction, TransactionType } from './types';

function App() {
  const [balance, setBalance] = useState<number>(150.75);
  const [cardName, setCardName] = useState<string>('Mi Tarjeta Virtual');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('');
  
  // State for withdrawal confirmation
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState<boolean>(false);
  const [amountToWithdraw, setAmountToWithdraw] = useState<number | null>(null);

  // State for deposit confirmation
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [amountToDeposit, setAmountToDeposit] = useState<number | null>(null);


  // --- Deposit Logic ---
  const requestDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    setAmountToDeposit(amount);
    setIsDepositModalOpen(true);
  };

  const confirmDeposit = () => {
    if (amountToDeposit === null) return;

    setBalance(prev => prev + amountToDeposit);
    const newTransaction: Transaction = {
      id: Date.now(),
      type: TransactionType.DEPOSIT,
      amount: amountToDeposit,
      date: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);
    
    new Audio('https://cdn.freesound.org/previews/276/276216_5121236-lq.mp3').play();
    
    cancelDeposit();
  };

  const cancelDeposit = () => {
    setIsDepositModalOpen(false);
    setAmountToDeposit(null);
    setDepositAmount('');
  };


  // --- Withdrawal Logic ---
  const requestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0 || amount > balance) return;
    
    setAmountToWithdraw(amount);
    setIsWithdrawalModalOpen(true);
  };

  const confirmWithdrawal = () => {
    if (amountToWithdraw === null) return;

    setBalance(prev => prev - amountToWithdraw);
    const newTransaction: Transaction = {
      id: Date.now(),
      type: TransactionType.WITHDRAWAL,
      amount: amountToWithdraw,
      date: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);

    new Audio('https://cdn.freesound.org/previews/44/44379_384093-lq.mp3').play();

    cancelWithdrawal();
  };

  const cancelWithdrawal = () => {
    setIsWithdrawalModalOpen(false);
    setAmountToWithdraw(null);
    setWithdrawalAmount('');
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      {/* Deposit Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDepositModalOpen}
        onClose={cancelDeposit}
        onConfirm={confirmDeposit}
        title="Confirmar Depósito"
        confirmButtonText="Confirmar Depósito"
        confirmButtonClassName="bg-green-600 hover:bg-green-700"
      >
        <p className="text-slate-300 mb-6">
          ¿Estás seguro de que deseas depositar{' '}
          <strong className="text-green-400 font-semibold">
            {amountToDeposit?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </strong>?
        </p>
      </ConfirmationDialog>

      {/* Withdrawal Confirmation Dialog */}
      <ConfirmationDialog 
        isOpen={isWithdrawalModalOpen}
        onClose={cancelWithdrawal}
        onConfirm={confirmWithdrawal}
        title="Confirmar Retiro"
        confirmButtonText="Confirmar Retiro"
        confirmButtonClassName="bg-red-600 hover:bg-red-700"
      >
         <p className="text-slate-300 mb-6">
          ¿Estás seguro de que deseas retirar{' '}
          <strong className="text-red-400 font-semibold">
            {amountToWithdraw?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </strong>?
        </p>
      </ConfirmationDialog>

      <div className="container mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">Gestor de Tarjeta Prepago</h1>
          <p className="text-slate-400 mt-2">Controla tus finanzas con facilidad y estilo.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PrepaidCard
              cardName={cardName}
              onCardNameChange={setCardName}
              balance={balance}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DepositForm
                amount={depositAmount}
                onAmountChange={setDepositAmount}
                onSubmit={requestDeposit}
              />
              <WithdrawalForm
                amount={withdrawalAmount}
                onAmountChange={setWithdrawalAmount}
                onSubmit={requestWithdrawal}
                balance={balance}
              />
            </div>
          </div>
          <div className="lg:col-span-1">
             <TransactionHistory transactions={transactions} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
