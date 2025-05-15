import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { cancelOrder, loadOrders, selectAllOrders } from '../../store/features/user';
import moment from 'moment';
import Timeline from '../../components/Timeline/Timeline';
import { getStepCount } from '../../utils/order-util';
import { cancelOrderAPI, fetchOrderAPI } from '../../api/order';

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders); // Lấy danh sách đơn hàng từ Redux store
  const [selectedFilter, setSelectedFilter] = useState('ACTIVE'); // Bộ lọc đơn hàng
  const [orders, setOrders] = useState([]); // Dữ liệu đơn hàng sau khi xử lý
  const [selectedOrder, setSelectedOrder] = useState(''); // Đơn hàng đã chọn

  // Lấy danh sách đơn hàng khi component mount
  useEffect(() => {
    dispatch(setLoading(true)); 
    fetchOrderAPI() // Lấy đơn hàng từ API
      .then((res) => {
        dispatch(loadOrders(res)); // Lưu dữ liệu vào Redux
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err.message);
      })
      .finally(() => {
        dispatch(setLoading(false)); // Tắt loading
      });
  }, [dispatch]);

  // Cập nhật danh sách đơn hàng khi `allOrders` thay đổi
  useEffect(() => {
    const displayOrders = allOrders?.data?.map((order) => ({
      id: order?.id,
      orderDate: order?.orderDate,
      orderStatus: order?.orderStatus,
      status:
        ['PENDING', 'IN_PROGRESS', 'SHIPPED'].includes(order?.orderStatus)
          ? 'ACTIVE'
          : order?.orderStatus === 'DELIVERED'
          ? 'COMPLETED'
          : order?.orderStatus,
      items: order?.orderItemList?.map((orderItem) => ({
        id: orderItem?.id,
        name: orderItem?.product?.name,
        price: orderItem?.product?.price,
        quantity: orderItem?.quantity,
        url: orderItem?.product?.resources?.[0]?.url,
        slug: orderItem?.product?.slug,
      })),
      totalAmount: order?.totalAmount,
    }));

    // Lọc đơn hàng theo filter đã chọn
    const filteredOrders = displayOrders?.filter((order) => {
      if (selectedFilter === 'ALL') return true;
      return order.status === selectedFilter;
    });

    setOrders(filteredOrders || []); // Cập nhật danh sách đơn hàng hiển thị
  }, [allOrders, selectedFilter]);

  // Thay đổi bộ lọc đơn hàng
  const handleOnChange = useCallback((evt) => {
    const value = evt?.target?.value;
    setSelectedFilter(value);
  }, []);

  // Hủy đơn hàng và tải lại danh sách
  const onCancelOrder = useCallback((id) => {
    dispatch(setLoading(true));
    cancelOrderAPI(id) // Gọi API huỷ đơn hàng
      .then(() => {
        return fetchOrderAPI(); // Sau khi huỷ, gọi lại API để lấy danh sách đơn hàng mới
      })
      .then((res) => {
        dispatch(loadOrders(res)); // Cập nhật dữ liệu đơn hàng vào Redux
      })
      .catch((err) => {
        console.error('Failed to cancel order:', err.message);
      })
      .finally(() => {
        dispatch(setLoading(false)); // Tắt loading
      });
  }, [dispatch]);

  return (
    <div>
      {(
        <div className="md:w-[70%] w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-4">My Orders</h1>
            <select
              className="border-2 rounded-lg mb-4 p-2"
              value={selectedFilter}
              onChange={handleOnChange}
            >
              <option value="ACTIVE">Active</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          {orders
            ?.filter((order) => order?.status === selectedFilter)
            .map((order, index) => {
              return (
                <div key={index}>
                  <div className="bg-gray-200 p-4 mb-8">
                    <p className="text-lg font-bold">Order no. #{order?.id}</p>
                    <div className="flex justify-between mt-2">
                      <div className="flex flex-col text-gray-500 text-sm">
                        <p>
                          Order Date : {moment(order?.orderDate).format('MMMM DD YYYY')}
                        </p>
                        <p>
                          Expected Delivery Date: {moment(order?.orderDate).add(3, 'days').format('MMMM DD YYYY')}
                        </p>
                      </div>
                      <div className="flex flex-col text-gray-500 text-sm">
                        <p>Order Status : {order?.orderStatus}</p>
                        <button
                          onClick={() => setSelectedOrder(order?.id)}
                          className="text-blue-900 text-right rounded underline cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {selectedOrder === order?.id && (
                    <div>
                      {order?.items?.map((orderItem, index) => {
                        return (
                          <div key={index} className="flex gap-4">
                            <img
                              src={orderItem?.url}
                              alt={orderItem?.name}
                              className="w-[120px] h-[120px] object-cover m-2 rounded"
                            />
                            <div className="flex flex-col text-sm py-2 text-gray-600">
                              <p>{orderItem?.name || 'Name'}</p>
                              <p>Quantity {orderItem?.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex justify-between">
                        <p>Total : ${order?.totalAmount}</p>
                        <button
                          onClick={() => setSelectedOrder('')}
                          className="text-blue-900 text-right rounded underline cursor-pointer"
                        >
                          Hide Details
                        </button>
                      </div>
                      {order?.orderStatus !== 'CANCELLED' && (
                        <>
                          <Timeline stepCount={getStepCount[order?.orderStatus]} />
                          {getStepCount[order?.orderStatus] <= 2 && (
                            <button
                              onClick={() => onCancelOrder(order?.id)}
                              className="bg-black h-[42px] w-[120px] text-white rounded-lg mb-2"
                            >
                              Cancel Order
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Orders;
