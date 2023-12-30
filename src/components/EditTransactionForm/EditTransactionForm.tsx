import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from '../../store/categories/categoriesSlice';
import { editTransactionAsync } from '../../store/transactions/transactionsThunks';
import { AddTransactionForm, Transaction } from '../../types';

interface EditTransactionFormProps {
    transactionId: string;
    onClose: () => void;
}

const EditTransactionForm: React.FC<EditTransactionFormProps> = ({ transactionId, onClose }) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const [transactionData, setTransactionData] = useState<AddTransactionForm>({ category: '', amount: 0 });

    useEffect(() => {
        const existingTransaction = categories[transactionId];
        if (existingTransaction) {
            setTransactionData({
                category: existingTransaction.category,
                amount: existingTransaction.amount || 0,
            });
        }
    }, [categories, transactionId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTransactionData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (transactionData.category && transactionData.amount !== undefined) {
            dispatch(editTransactionAsync({ transactionId, updatedTransaction: transactionData as Transaction }));
        }

        onClose();
    };

    return (
        <div>
            <h2>Edit Transaction</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="transactionCategory" className="form-label">
                        Transaction Category
                    </label>
                    <select
                        id="transactionCategory"
                        name="category"
                        className="form-select"
                        value={transactionData.category}
                        onChange={handleInputChange}
                    >
                        {/* Render category options here */}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="transactionAmount" className="form-label">
                        Transaction Amount
                    </label>
                    <input
                        type="number"
                        id="transactionAmount"
                        name="amount"
                        className="form-control"
                        value={transactionData.amount}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditTransactionForm;
