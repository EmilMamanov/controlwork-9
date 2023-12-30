import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {Transaction} from "../../types";

interface TransactionsState {
    transactions: Record<string, Transaction>;
    fetchLoading: boolean;
}

const initialState: TransactionsState = {
    transactions: {},
    fetchLoading: false,
};

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<Record<string, Transaction>>) => {
            state.transactions = action.payload;
            state.fetchLoading = false;
        },
        setFetchLoading: (state, action: PayloadAction<boolean>) => {
            state.fetchLoading = action.payload;
        },
        deleteTransaction: (state, action: PayloadAction<string>) => {
            const transactionId = action.payload;
            delete state.transactions[transactionId];
        },
        editTransaction: (state, action: PayloadAction<{ transactionId: string; updatedTransaction: Transaction }>) => {
            const { transactionId, updatedTransaction } = action.payload;
            state.transactions[transactionId] = updatedTransaction;
        },
    },
});

export const { setTransactions, setFetchLoading, deleteTransaction, editTransaction  } = transactionsSlice.actions;

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectFetchTransactionsLoading = (state: RootState) => state.transactions.fetchLoading;

export default transactionsSlice.reducer;
