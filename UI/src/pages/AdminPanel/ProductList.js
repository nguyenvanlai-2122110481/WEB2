import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ColorsFilter from './components/ColorsFilter';
import SizeFilter from './components/SizeFilter';
import { deleteProduct, getAllProducts } from '../../api/products';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { data, total } = await getAllProducts(
                    page,
                    size,
                    'createdAt,desc',
                    search,
                );
                console.log(data)
                setProducts(data);
                setTotal(total);
            } catch (err) {
                console.log(err.message);
            }
        };
        loadProducts();
    }, [page, search, size]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    const totalPages = Math.ceil(total / size);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="border p-2 rounded w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Link to="/admin/products/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Product
                </Link>
            </div>
            {/* <div className="flex space-x-4 mb-4">
                <ColorsFilter onChange={setColorFilter} />
                <SizeFilter onChange={setSizeFilter} />
            </div> */}
            <table className="w-full border-collapse bg-white shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Thumbnail</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Brand</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">
                                <img src={product.thumbnail} alt={product.name} className="w-16 h-16 object-cover" />
                            </td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">{product.brand}</td>
                            <td className="border p-2">${product.price}</td>
                            <td className="border p-2">
                                <Link to={`/admin/products/edit/${product.id}`} className="text-blue-500 mr-2">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(product.id)} className="text-red-500">
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

export default ProductList;