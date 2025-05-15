import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCategoryById, createCategory, updateCategory } from '../../api/categories';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        categoryTypes: [{ name: '', code: '', description: '' }],
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            const loadCategory = async () => {
                try {
                    const category = await fetchCategoryById(id);
                    setFormData({
                        ...category,
                        categoryTypes: category.categoryTypes || [{ name: '', code: '', description: '' }],
                    });
                } catch (err) {
                    setError(err.message);
                }
            };
            loadCategory();
        }
    }, [id, isEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleArrayChange = (index, field, value) => {
        const updatedCategoryTypes = [...formData.categoryTypes];
        updatedCategoryTypes[index][field] = value;
        setFormData({
            ...formData,
            categoryTypes: updatedCategoryTypes,
        });
    };

    const addCategoryType = () => {
        setFormData({
            ...formData,
            categoryTypes: [...formData.categoryTypes, { name: '', code: '', description: '' }],
        });
    };

    const removeCategoryType = (index) => {
        setFormData({
            ...formData,
            categoryTypes: formData.categoryTypes.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEdit) {
                await updateCategory(id, formData);
            } else {
                await createCategory(formData);
            }
            navigate('/admin/categories');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Category' : 'Create Category'}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Code</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                    ></textarea>
                </div>
                <div>
                    <label className="block">Category Types</label>
                    {formData.categoryTypes.map((type, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={type.name}
                                onChange={(e) => handleArrayChange(index, 'name', e.target.value)}
                                className="border p-2 rounded"
                                placeholder="Type Name"
                                required
                            />
                            <input
                                type="text"
                                value={type.code}
                                onChange={(e) => handleArrayChange(index, 'code', e.target.value)}
                                className="border p-2 rounded"
                                placeholder="Type Code"
                                required
                            />
                            <input
                                type="text"
                                value={type.description}
                                onChange={(e) => handleArrayChange(index, 'description', e.target.value)}
                                className="border p-2 rounded"
                                placeholder="Type Description"
                            />
                            <button
                                type="button"
                                onClick={() => removeCategoryType(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addCategoryType}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Category Type
                    </button>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {isEdit ? 'Update' : 'Create'} Category
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;