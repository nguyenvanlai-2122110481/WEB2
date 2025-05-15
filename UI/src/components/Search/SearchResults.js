import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/products';
import ProductCard from '../../pages/ProductListPage/ProductCard';

const SearchResults = () => {
    const { state, search } = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(search).get('query') || '';
    const [products, setProducts] = useState(state?.products || []);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const size = 10;

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, total } = await getAllProducts(page, size, 'createdAt,desc', query);
                setProducts(data);
                setTotal(total);
            } catch (err) {
                setError('Failed to load products. Please try again.');
                console.error('Failed to load products:', err.message);
            } finally {
                setLoading(false);
            }
        };

        // Chỉ gọi API nếu không có state.products hoặc khi chuyển trang
        if (!state?.products || page !== 0 || query !== state?.query) {
            loadProducts();
        }
    }, [page, query, state]);

    const totalPages = Math.ceil(total / size);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>

            {loading && (
                <div className="text-center">
                    <p>Loading products...</p>
                </div>
            )}

            {error && (
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
            )}

            {!loading && products.length === 0 && !error && (
                <p className="text-gray-600">No products found for "{query}".</p>
            )}

            {!loading && products.length > 0 && (
                <div className='pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12 px-2'>
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.name}
                            description={product.description}
                            price={product.price}
                            discoutnt={product.discountPercentage}
                            rating={product.rating}
                            brand={product.brand}
                            thumbnail={product.thumbnail}
                            slug={product.slug}
                        />
                    ))}
                </div>
            )}

            {!loading && products.length > 0 && (
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition"
                    >
                        Previous
                    </button>
                    <span className="text-gray-600">
                        Page {page + 1} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchResults;