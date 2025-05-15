import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { countCartItems } from '../../store/features/cart';
import { Wishlist } from '../common/Wishlist';
import { AccountIcon } from '../common/AccountIcon';
import { CartIcon } from '../common/CartIcon';
import { fetchCategories } from '../../api/categories';
import { getAllProducts } from '../../api/products';
import './Navigation.css';

const Navigation = ({ variant = "default" }) => {
    const cartLength = useSelector(countCartItems);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);

    // Gọi API để lấy danh mục
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { data } = await fetchCategories(0, 100, 'name,asc');
                // console.log('Categories:', data);
                setCategories(data);
            } catch (err) {
                console.error('Failed to load categories:', err.message);
            }
        };
        loadCategories();
    }, []);

    // Xử lý tìm kiếm sản phẩm
    const handleSearch = async (e) => {
        e.preventDefault();
        if (search.trim()) {
            try {
                const { data } = await getAllProducts(0, 10, 'createdAt,desc', search);
                console.log('Search results:', data);
                navigate(`/search?query=${encodeURIComponent(search)}`, { state: { products: data } });
            } catch (err) {
                console.error('Search failed:', err.message);
            }
        }
    };

    // Xử lý mở/đóng dropdown
    const handleMouseEnter = (id) => {
        setIsDropdownOpen(id);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(null);
    };

    return (
        <nav className='flex items-center py-6 px-16 justify-between gap-20 custom-nav'>
            <div className='flex items-center gap-6'>
                {/* Logo */}
                <Link to='/' className='text-3xl text-black font-bold'>ShopEase</Link>
            </div>

            {variant === "default" && (
                <div className='flex flex-wrap items-center gap-10'>
                    {/* Nav items */}
                    <ul className='flex gap-14 text-gray-600'>
                        <li>
                            <NavLink to='/' className={({ isActive }) => isActive ? 'active-link' : ''}>
                                Shop
                            </NavLink>
                        </li>
                        {/* Menu danh mục đa cấp */}
                        {categories.map(category => (
                            <li
                                key={category.id}
                                className='relative'
                                onMouseEnter={() => handleMouseEnter(category.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <NavLink
                                    to={`/category/${category.id}`}
                                    className={({ isActive }) => isActive ? 'active-link' : ''}
                                >
                                    {category.name}
                                </NavLink>
                                {/* {category.categoryTypes && category.categoryTypes.length > 0 && isDropdownOpen === category.id && (
                                    <ul className='absolute left-0 pt-1 w-48 bg-white shadow-lg rounded-lg z-10'>
                                        {category.categoryTypes.map(type => (
                                            <li key={type.id}>
                                                <NavLink
                                                    to={`/category/${category.code}/${type.code}`}
                                                    className='block px-4 py-2 text-gray-600 hover:bg-gray-100'
                                                >
                                                    {type.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )} */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {variant === "default" && (
                <div className='flex justify-center'>
                    {/* Search bar */}
                    <form onSubmit={handleSearch} className='border rounded flex overflow-hidden'>
                        <div className='flex items-center justify-center px-4'>
                            <svg
                                className='h-4 w-4 text-grey-dark'
                                fill='currentColor'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                            >
                                <path d='M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z' />
                            </svg>
                            <input
                                type='text'
                                className='px-4 py-2 outline-none'
                                placeholder='Search products...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button type='submit' className='px-4 py-2 bg-gray-200 hover:bg-gray-300'>
                            Search
                        </button>
                    </form>
                </div>
            )}

            <div className='flex flex-wrap items-center gap-4'>
                {/* Action Items - icons */}
                {variant === "default" && (
                    <ul className='flex gap-8'>
                        <li>
                            <button>
                                <Wishlist />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/account-details/profile')}>
                                <AccountIcon />
                            </button>
                        </li>
                        <li>
                            <Link to='/cart-items' className='flex flex-wrap relative'>
                                <CartIcon />
                                {cartLength > 0 && (
                                    <div className='absolute ml-6 inline-flex items-center justify-center h-6 w-6 bg-black text-white rounded-full border-2 text-xs border-white'>
                                        {cartLength}
                                    </div>
                                )}
                            </Link>
                        </li>
                    </ul>
                )}
                {variant === "auth" && (
                    <ul className='flex gap-8'>
                        <li className='text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'>
                            <NavLink to='/v1/login' className={({ isActive }) => isActive ? 'active-link' : ''}>
                                Login
                            </NavLink>
                        </li>
                        <li className='text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'>
                            <NavLink to='/v1/register' className={({ isActive }) => isActive ? 'active-link' : ''}>
                                Signup
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navigation;