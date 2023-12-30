import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Transaction, AddTransactionForm } from '../../types';
import { setTransactions, setFetchLoading, deleteTransaction, editTransaction  } from './transactionsSlice';
import { AppDispatch } from '../../app/store';

export const fetchTransactions = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
    'transactions/fetchTransactions',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setFetchLoading(true));
            const response = await axiosApi.get('/transactions.json');

            const transactions: Record<string, Transaction> = {};

            for (const [key, value] of Object.entries(response.data)) {
                transactions[key] = value as Transaction;
            }

            thunkAPI.dispatch(setTransactions(transactions));
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        } finally {
            thunkAPI.dispatch(setFetchLoading(false));
        }
    }
);

export const addTransaction = createAsyncThunk<void, AddTransactionForm, { dispatch: AppDispatch }>(
    'transactions/addTransaction',
    async (transactionData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setFetchLoading(true));
            await axiosApi.post('/transactions.json', {
                ...transactionData,
                createdAt: new Date().toISOString(),
            });
            thunkAPI.dispatch(fetchTransactions());
        } catch (error) {
            console.error('Error adding transaction:', error);
            throw error;
        } finally {
            thunkAPI.dispatch(setFetchLoading(false));
        }
    }
);
export const deleteTransactionAsync = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
    'transactions/deleteTransaction',
    async (transactionId, thunkAPI) => {
        try {
            thunkAPI.dispatch(setFetchLoading(true));

            await axiosApi.delete(`/transactions/${transactionId}.json`);

            thunkAPI.dispatch(deleteTransaction(transactionId));
        } catch (error) {
            console.error('Error deleting transaction:', error);
            throw error;
        } finally {
            thunkAPI.dispatch(setFetchLoading(false));
        }
    }
);

export const editTransactionAsync = createAsyncThunk<void, { transactionId: string; updatedTransaction: Transaction }, { dispatch: AppDispatch }>(
    'transactions/editTransaction',
    async ({ transactionId, updatedTransaction }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setFetchLoading(true));

            await axiosApi.put(`/transactions/${transactionId}.json`, updatedTransaction);

            thunkAPI.dispatch(editTransaction({ transactionId, updatedTransaction }));
        } catch (error) {
            console.error('Error editing transaction:', error);
            throw error;
        } finally {
            thunkAPI.dispatch(setFetchLoading(false));
        }
    }
);
