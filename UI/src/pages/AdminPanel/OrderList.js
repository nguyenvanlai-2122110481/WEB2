import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrderAPI } from '../../api/order';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const { data, total } = await fetchOrderAPI(page, size);
                setOrders(data);
                setTotal(total);
            } catch (err) {
                console.error(err.message);
            }
        };
        loadOrders();
    }, [page]);

    const totalPages = Math.ceil(total / size);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <table className="w-full border-collapse bg-white shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Total Amount</th>
                        <th className="border p-2">Payment Method</th>
                        <th className="border p-2">Order Date</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">${order.totalAmount}</td>
                            <td className="border p-2">{order.paymentMethod}</td>
                            <td className="border p-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td className="border p-2">{order.status}</td>
                            <td className="border p-2">
                                <Link to={`/admin/orders/edit/${order.id}`} className="text-blue-500">
                                    Edit
                                </Link>
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

export default OrderList;