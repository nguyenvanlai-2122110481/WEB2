import axios from "axios";
import { API_BASE_URL, API_URLS, getHeaders } from "./constant";

// Tạo đơn hàng mới
// @param {object} data - Dữ liệu đơn hàng (addressId, totalAmount, paymentMethod, orderDate, orderItemRequests)
// @returns {object} - Dữ liệu đơn hàng và thông tin thanh toán (nếu có)
export const placeOrderAPI = async (data) => {
    const url = `${API_BASE_URL}${API_URLS.PLACE_ORDER}`;
    try {
        const response = await axios.post(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to place order");
    }
};

// Xác nhận trạng thái thanh toán
// @param {object} data - Dữ liệu thanh toán (paymentIntent, status)
// @returns {object} - Dữ liệu phản hồi từ server
export const confirmPaymentAPI = async (data) => {
    const url = `${API_BASE_URL}${API_URLS.CONFIRM_PAYMENT}`;
    try {
        const response = await axios.post(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to confirm payment");
    }
};

// Lấy danh sách đơn hàng với phân trang
// @param {number} page - Trang hiện tại (mặc định: 0)
// @param {number} size - Số bản ghi mỗi trang (mặc định: 10)
// @param {string} sort - Sắp xếp (ví dụ: 'orderDate,desc')
// @returns {object} - Dữ liệu đơn hàng và tổng số bản ghi
export const fetchOrderAPI = async (page = 0, size = 10, sort = "orderDate,desc") => {
    const url = `${API_BASE_URL}${API_URLS.GET_ORDERS}?page=${page}&size=${size}&sort=${sort}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return {
            data: response.data,
            total: parseInt(response.headers['content-range']?.split('/')[1] || 0),
        };
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch orders");
    }
};
// Lấy đơn hàng theo ID
// @param {string} id - ID của đơn hàng
// @returns {object} - Dữ liệu chi tiết đơn hàng
export const fetchOrderById = async (id) => {
    const url = `${API_BASE_URL}${API_URLS.GET_ORDER(id)}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch order");
    }
};

// Cập nhật trạng thái đơn hàng
// @param {string} id - ID của đơn hàng
// @param {object} data - Dữ liệu cập nhật (ví dụ: { status: 'CONFIRMED' })
// @returns {object} - Dữ liệu đơn hàng đã cập nhật
export const updateOrder = async (id, data) => {
    const url = `${API_BASE_URL}${API_URLS.UPDATE_ORDER(id)}`;
    try {
        const response = await axios.put(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to update order");
    }
};
// Hủy đơn hàng
// @param {string} id - ID của đơn hàng
// @returns {void}
export const cancelOrderAPI = async (id) => {
    const url = `${API_BASE_URL}${API_URLS.CANCEL_ORDER(id)}`;
    try {
        const response = await axios.post(url, {}, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to cancel order");
    }
};