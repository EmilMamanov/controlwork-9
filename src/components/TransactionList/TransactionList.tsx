import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTransactions, selectFetchTransactionsLoading } from '../../store/transactions/transactionsSlice';
import {fetchTransactions} from '../../store/transactions/transactionsThunks.ts';

const TransactionList: React.FC = () => {
    const dispatch = useAppDispatch();
    const transactionsRecord = useAppSelector(selectTransactions);
    const fetchLoading = useAppSelector(selectFetchTransactionsLoading);

    const transactions = Object.entries(transactionsRecord).map(([id, transaction]) => ({
        id,
        ...transaction,
    }));

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    return (
        <div>
            <h2>Transaction List</h2>
            {fetchLoading ? (
                <p>Loading transactions...</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <div>Date: {transaction.createdAt}</div>
                            <div>Category: {transaction.category}</div>
                            <div>Amount: {transaction.amount}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;
