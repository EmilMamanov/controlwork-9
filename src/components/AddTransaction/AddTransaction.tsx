import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchCategories } from '../../store/categories/categoriesThunks.ts';
import { selectCategories } from '../../store/categories/categoriesSlice.ts';
import { addTransaction } from '../../store/transactions/transactionsThunks';
import { AddTransactionForm } from '../../types';

const AddTransaction: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const [formData, setFormData] = useState<AddTransactionForm>({
        category: '',
        amount: 0,
        type: 'expense',
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addTransaction(formData));

        setFormData({
            category: '',
            amount: 0,
            type: 'expense',
        });
    };

    const filteredCategories = Object.entries(categories)
        .filter(([categoryId, category]) => category.type === formData.type)
        .reduce((acc, [categoryId, category]) => {
            acc[categoryId] = category;
            return acc;
        }, {} as typeof categories);

    return (
        <div>
            <h2>Add Transaction</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a category</option>
                        {Object.entries(filteredCategories).map(([categoryId, category]) => (
                            <option key={categoryId} value={categoryId}>
                                {category && category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="form-control"
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-check-label">Type</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="income"
                            name="type"
                            value="income"
                            className="form-check-input"
                            checked={formData.type === 'income'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="income" className="form-check-label">
                            Income
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="expense"
                            name="type"
                            value="expense"
                            className="form-check-input"
                            checked={formData.type === 'expense'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="expense" className="form-check-label">
                            Expense
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;
