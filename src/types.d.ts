export type Transaction = {
    id: string;
    category: string;
    amount: number;
    createdAt: string;
};

export type Category = {
    type: 'income' | 'expense';
    name: string;
};

export interface AddTransactionForm {
    category: string;
    amount: number;
    type: 'income' | 'expense';
}