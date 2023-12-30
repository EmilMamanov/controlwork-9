import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTransactions, selectFetchTransactionsLoading } from '../../store/transactions/transactionsSlice';
import { fetchTransactions } from '../../store/transactions/transactionsThunks.ts';
import { selectCategories,  } from '../../store/categories/categoriesSlice'; //
import {fetchCategories} from '../../store/categories/categoriesThunks.ts'

const TransactionList: React.FC = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const fetchLoading = useAppSelector(selectFetchTransactionsLoading);
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTransactions());
    }, [dispatch]);

    if (Object.keys(categories).length === 0) {
        return <p>Loading categories...</p>;
    }

    return (
        <div>
            <h2>Transaction List</h2>
            {fetchLoading ? (
                <p>Loading transactions...</p>
            ) : (
                <ul>
                    {Object.entries(transactions).map(([id, transaction]) => (
                        <li key={id}>
                            <div>Date: {transaction.createdAt}</div>
                            <div>Category: {categories[transaction.category]?.name || 'Unknown Category'}</div>
                            <div>Amount: {transaction.amount}</div>
                            <div>Type: {categories[transaction.category]?.type || 'Unknown Type'}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;
