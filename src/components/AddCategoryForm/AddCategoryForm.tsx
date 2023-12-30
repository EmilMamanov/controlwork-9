import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { addCategory } from '../../store/categories/categoriesThunks.ts';
import ButtonSpinner from "../Spinner/ButtonSpinner.tsx";
import { selectFetchTransactionsLoading } from '../../store/transactions/transactionsSlice';

const AddCategoryForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const fetchLoading = useAppSelector(selectFetchTransactionsLoading);

    const [categoryName, setCategoryName] = useState('');
    const [categoryType, setCategoryType] = useState('expense');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'categoryName') {
            setCategoryName(value);
        } else if (name === 'categoryType') {
            setCategoryType(value);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(addCategory({ name: categoryName, type: categoryType }));

        setCategoryName('');
        setCategoryType('expense');
    };

    return (
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        className="form-control"
                        value={categoryName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryType" className="form-label">
                        Category Type
                    </label>
                    <select
                        id="categoryType"
                        name="categoryType"
                        className="form-select"
                        value={categoryType}
                        onChange={handleInputChange}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={fetchLoading}>
                    {fetchLoading ? <ButtonSpinner /> : 'Add Category'}
                </button>
            </form>
        </div>
    );
};

export default AddCategoryForm;
