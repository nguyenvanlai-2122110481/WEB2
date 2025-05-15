import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderById, updateOrder } from '../../api/order';

const OrderEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ status: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const order = await fetchOrderById(id);
                setFormData({ status: order.orderStatus });
            } catch (err) {
                setError(err.message);
            }
        };
        loadOrder();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ status: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log(formData)
            await updateOrder(id, formData);
            navigate('/admin/orders');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                        required
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In progress</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Order
                </button>
            </form>
        </div>
    );
};

export default OrderEdit;
