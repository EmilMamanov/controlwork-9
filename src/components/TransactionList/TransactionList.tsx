import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTransactions, selectFetchTransactionsLoading } from '../../store/transactions/transactionsSlice';
import { fetchTransactions, deleteTransactionAsync, editTransactionAsync } from '../../store/transactions/transactionsThunks.ts';
import { selectCategories, selectFetchCategoriesLoading } from '../../store/categories/categoriesSlice';
import { fetchCategories } from '../../store/categories/categoriesThunks.ts';
import TotalBalance from '../TotalBalance/TotalBalance.tsx';
import ButtonSpinner from '../Spinner/ButtonSpinner.tsx';
import dayjs from 'dayjs';
import { Transaction } from '../../types';

const TransactionList: React.FC = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const fetchTransactionsLoading = useAppSelector(selectFetchTransactionsLoading);
    const categories = useAppSelector(selectCategories);
    const fetchCategoriesLoading = useAppSelector(selectFetchCategoriesLoading);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTransactions());
    }, [dispatch]);

    if (fetchCategoriesLoading || fetchTransactionsLoading) {
        return <ButtonSpinner />;
    }

    const sortedTransactions = Object.entries(transactions)
        .sort(([, transactionA], [, transactionB]) => {
            const dateA = dayjs(transactionA.createdAt).toDate();
            const dateB = dayjs(transactionB.createdAt).toDate();
            return dateB.getTime() - dateA.getTime();
        });

    const handleDeleteTransaction = async (transactionId: string) => {
        try {
            await dispatch(deleteTransactionAsync(transactionId));
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const handleEditTransaction = async (transactionId: string, updatedTransaction: Transaction) => {
        try {
            await dispatch(editTransactionAsync({ transactionId, updatedTransaction }));
        } catch (error) {
            console.error('Error editing transaction:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Transaction List</h2>
            <TotalBalance transactions={transactions} categories={categories} />
            <ul className="list-group">
                {sortedTransactions.map(([id, transaction]) => (
                    <li key={id} className="list-group-item d-flex justify-content-between">
                        <div>
                            <div><strong>Date:</strong> {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</div>
                            <div><strong>Category:</strong> {categories[transaction.category]?.name || 'Unknown Category'}</div>
                            <div><strong>Amount:</strong> {transaction.amount}</div>
                            <div><strong>Type:</strong> {categories[transaction.category]?.type || 'Unknown Type'}</div>
                        </div>
                        <div>
                            <button className="btn btn-danger" type="button" onClick={() => handleDeleteTransaction(id)}>Delete</button>
                            <button className="btn btn-warning" type="button" onClick={() => handleEditTransaction(id, transaction)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
