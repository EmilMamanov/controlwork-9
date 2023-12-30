import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCategories } from '../../store/categories/categoriesSlice';
import AddCategoryForm from '../AddCategoryForm/AddCategoryForm.tsx';
import EditCategoryForm from '../EditCategoryForm/EditCategoryForm.tsx';
import { deleteCategory, fetchCategories } from '../../store/categories/categoriesThunks';

const Categories: React.FC = () => {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

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

            <button className="btn btn-success" onClick={handleAddCategory}>
                Add Category
            </button>

            {showAddForm && <AddCategoryForm onClose={() => setShowAddForm(false)} />}

            <div className="mx-auto mt-5" style={{ display: 'flex', flexDirection: 'column' }}>
                {Object.entries(categories).map(([categoryId, category]) => (
                    <div key={categoryId} className="d-flex justify-content-between align-items-center mb-3">
                        <div>{category.name} - {category.type}</div>
                        <div>
                            <button className="btn btn-info me-2" onClick={() => handleEditCategory(categoryId)}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDeleteCategory(categoryId)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategory && <EditCategoryForm categoryId={selectedCategory} onClose={() => setSelectedCategory(null)} />}
        </div>
    );
};

export default Categories;
