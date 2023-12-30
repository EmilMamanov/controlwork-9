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
    },
});

export const { setTransactions, setFetchLoading } = transactionsSlice.actions;

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectFetchTransactionsLoading = (state: RootState) => state.transactions.fetchLoading;

export default transactionsSlice.reducer;
