import React from 'react';

interface EditCategoryFormProps {
    categoryId: string;
    onClose: () => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ categoryId, onClose }) => {

    return (
        <div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default EditCategoryForm;
