import React from 'react';
import { Transaction, Category } from '../../types';

interface TotalBalanceProps {
    transactions: Record<string, Transaction>;
    categories: Record<string, Category>;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ transactions, categories }) => {
    const calculateBalance = (): number => {
        let balance = 0;

        if (transactions) {
            Object.values(transactions).forEach((transaction) => {
                const amount = parseInt(transaction.amount, 10);
                const type = categories[transaction.category]?.type;

                if (type === 'income') {
                    balance += amount;
                } else if (type === 'expense') {
                    balance -= amount;
                }
            });
        }

        return balance;
    };

    return (
        <div className="card text-white bg-primary mx-auto mt-5" style={{ maxWidth: '18rem' }}>
            <div className="card-header text-center">Total Balance</div>
            <div className="card-body text-center">
                <h5 className="card-title">{calculateBalance()} KGZ</h5>
            </div>
        </div>
    );
};

export default TotalBalance;
