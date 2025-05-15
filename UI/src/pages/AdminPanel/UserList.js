import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from '../../api/user';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const { data, total } = await fetchAllUsers(page, size);
                setUsers(data);
                setTotal(total);
            } catch (err) {
                console.error(err.message);
            }
        };
        loadUsers();
    }, [page]);

    const totalPages = Math.ceil(total / size);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <table className="w-full border-collapse bg-white shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.firstName}</td>
                            <td className="border p-2">{user.lastName}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.phoneNumber}</td>
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

export default UserList;