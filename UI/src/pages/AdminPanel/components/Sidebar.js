import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <nav>
                <NavLink
                    to="/admin/products"
                    className={({ isActive }) => `block py-2 px-4 mb-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                >
                    Products
                </NavLink>
                <NavLink
                    to="/admin/categories"
                    className={({ isActive }) => `block py-2 px-4 mb-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                >
                    Categories
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) => `block py-2 px-4 mb-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                >
                    Users
                </NavLink>
                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) => `block py-2 px-4 mb-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                >
                    Orders
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;