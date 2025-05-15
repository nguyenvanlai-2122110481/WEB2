import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../../api/categories';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { data, total } = await fetchCategories(page, size, 'name,asc', search);
                setCategories(data);
                setTotal(total);
            } catch (err) {
                console.error(err.message);
            }
        };
        loadCategories();
    }, [page, search, size]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter(category => category.id !== id));
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    const totalPages = Math.ceil(total / size);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="border p-2 rounded w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Link to="/admin/categories/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Category
                </Link>
            </div>
            <table className="w-full border-collapse bg-white shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Code</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td className="border p-2">{category.id}</td>
                            <td className="border p-2">{category.name}</td>
                            <td className="border p-2">{category.code}</td>
                            <td className="border p-2">{category.description}</td>
                            <td className="border p-2">
                                <Link to={`/admin/categories/edit/${category.id}`} className="text-blue-500 mr-2">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(category.id)} className="text-red-500">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page + 1} of {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages - 1}
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CategoryList;