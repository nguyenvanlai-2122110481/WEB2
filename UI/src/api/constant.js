import { getToken } from "../utils/jwt-helper";

// Định nghĩa các endpoint API
export const API_URLS = {
    GET_PRODUCTS: '/api/products', // Lấy danh sách sản phẩm
    GET_PRODUCT: (id) => `/api/products/${id}`, // Lấy sản phẩm theo ID
    CREATE_PRODUCT: '/api/products', // Tạo sản phẩm
    UPDATE_PRODUCT: (id) => `/api/products/${id}`, // Cập nhật sản phẩm
    DELETE_PRODUCT: (id) => `/api/products/${id}`, // Xóa sản phẩm
    GET_PRODUCT_BY_SLUG: '/api/products', // Lấy sản phẩm theo slug
    GET_CATEGORIES: '/api/category', // Lấy danh sách danh mục
    GET_CATEGORY: (id) => `/api/category/${id}`, // Lấy danh mục theo ID
    CREATE_CATEGORY: '/api/category', // Tạo danh mục
    UPDATE_CATEGORY: (id) => `/api/category/${id}`, // Cập nhật danh mục
    DELETE_CATEGORY: (id) => `/api/category/${id}`, // Xóa danh mục
    UPLOAD_FILE: (folder) => `/api/upload/${folder}`, // Upload file
    PLACE_ORDER: '/api/order', // Tạo đơn hàng
    CONFIRM_PAYMENT: '/api/order/update-payment', // Xác nhận thanh toán
    GET_ORDERS: '/api/order/user', // Lấy danh sách đơn hàng
    GET_ORDER: (id) => `/api/order/${id}`, // Lấy đơn hàng theo ID
    UPDATE_ORDER: (id) => `/api/order/${id}`, // Cập nhật đơn hàng (dùng cho update status)
    CANCEL_ORDER: (id) => `/api/order/cancel/${id}`, // Hủy đơn hàng
    USER_PROFILE: '/api/user/profile', // Lấy thông tin người dùng
    ALL_USERS: '/api/user', // Lấy danh sách tất cả người dùng (admin)
    LOGIN: '/api/auth/login', // Đăng nhập
    REGISTER: '/api/auth/register', // Đăng ký
    VERIFY: '/api/auth/verify', // Xác minh tài khoản
    OAUTH2_SUCCESS: '/oauth2/success', // Xử lý OAuth2 callback
    ADD_ADDRESS: '/api/address', // Thêm, lấy danh sách địa chỉ
    GET_ADDRESS: (id) => `/api/address/${id}`, // Lấy địa chỉ theo ID
    UPDATE_ADDRESS: (id) => `/api/address/${id}`, // Cập nhật địa chỉ
    DELETE_ADDRESS: (id) => `/api/address/${id}`, // Xóa địa chỉ
};

// URL gốc của backend
export const API_BASE_URL = 'http://localhost:8081';

// Tạo header với JWT token cho các yêu cầu JSON
export const getHeaders = () => {
    return {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
    };
};

// Tạo header với JWT token cho các yêu cầu multipart/form-data
export const getMultipartHeaders = () => {
    return {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
    };
};