import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCategories } from '../../store/categories/categoriesSlice';
import AddCategoryForm from '../AddCategoryForm/AddCategoryForm.tsx';
import EditCategoryForm from '../EditCategoryForm/EditCategoryForm.tsx';
import { deleteCategory } from '../../store/categories/categoriesThunks';

const Categories: React.FC = () => {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleAddCategory = () => {
        setShowAddForm(true);
    };

    const handleEditCategory = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleDeleteCategory = (categoryId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (confirmDelete) {
            dispatch(deleteCategory(categoryId));
        }
    };

    return (
        <div>
            <h2>Categories</h2>

            <button onClick={handleAddCategory}>Add Category</button>

            {showAddForm && <AddCategoryForm onClose={() => setShowAddForm(false)} />}

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(categories).map(([categoryId, category]) => (
                    <tr key={categoryId}>
                        <td>{category.name}</td>
                        <td>{category.type}</td>
                        <td>
                            <button onClick={() => handleEditCategory(categoryId)}>Edit</button>
                            <button onClick={() => handleDeleteCategory(categoryId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedCategory && <EditCategoryForm categoryId={selectedCategory} onClose={() => setSelectedCategory(null)} />}
        </div>
    );
};

export default Categories;
