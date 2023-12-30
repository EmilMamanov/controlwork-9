import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from '../../store/categories/categoriesSlice';
import { editCategory } from '../../store/categories/categoriesThunks';
import { AddCategoryForm } from '../../types';

interface EditCategoryFormProps {
    categoryId: string;
    onClose: () => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ categoryId, onClose }) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const [categoryData, setCategoryData] = useState<AddCategoryForm>({ name: '', type: 'expense' });

    useEffect(() => {
        const category = categories[categoryId];
        if (category) {
            setCategoryData({ name: category.name, type: category.type });
        }
    }, [categories, categoryId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(editCategory({ categoryId, categoryData }));

        onClose();
    };

    return (
        <div>
            <h2>Edit Category</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="categoryName"
                        name="name"
                        className="form-control"
                        value={categoryData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryType" className="form-label">
                        Category Type
                    </label>
                    <select
                        id="categoryType"
                        name="type"
                        className="form-select"
                        value={categoryData.type}
                        onChange={handleInputChange}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
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

export default EditCategoryForm;
