import axios from "axios";
import { API_BASE_URL, API_URLS, getHeaders } from "./constant";

// Lấy thông tin hồ sơ người dùng
// @returns {object} - Dữ liệu hồ sơ người dùng
export const fetchUserDetails = async () => {
    const url = `${API_BASE_URL}${API_URLS.USER_PROFILE}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch user details");
    }
};

// Lấy danh sách tất cả người dùng (admin) với phân trang
// @param {number} page - Trang hiện tại (mặc định: 0)
// @param {number} size - Số bản ghi mỗi trang (mặc định: 10)
// @param {string} sort - Sắp xếp (ví dụ: 'email,asc')
// @returns {object} - Dữ liệu người dùng và tổng số bản ghi
export const fetchAllUsers = async (page = 0, size = 10, sort = "email,asc") => {
    const url = `${API_BASE_URL}${API_URLS.ALL_USERS}?page=${page}&size=${size}&sort=${sort}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return {
            data: response.data,
            total: parseInt(response.headers['content-range']?.split('/')[1] || 0),
        };
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch all users");
    }
};

// Thêm địa chỉ mới
// @param {object} data - Dữ liệu địa chỉ (name, street, city, state, zipCode, phoneNumber)
// @returns {object} - Dữ liệu địa chỉ vừa tạo
export const addAddressAPI = async (data) => {
    const url = `${API_BASE_URL}${API_URLS.ADD_ADDRESS}`;
    try {
        const response = await axios.post(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to add address");
    }
};

// Cập nhật địa chỉ hiện có
// @param {string} id - ID của địa chỉ
// @param {object} data - Dữ liệu địa chỉ cần cập nhật
// @returns {object} - Dữ liệu địa chỉ đã cập nhật
export const updateAddress = async (id, data) => {
    const url = `${API_BASE_URL}${API_URLS.UPDATE_ADDRESS(id)}`;
    try {
        const response = await axios.put(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to update address");
    }
};

// Xóa địa chỉ
// @param {string} id - ID của địa chỉ
// @returns {void}
export const deleteAddressAPI = async (id) => {
    const url = `${API_BASE_URL}${API_URLS.DELETE_ADDRESS(id)}`;
    try {
        const response = await axios.delete(url, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to delete address");
    }
};

// Lấy danh sách địa chỉ với phân trang
// @param {number} page - Trang hiện tại (mặc định: 0)
// @param {number} size - Số bản ghi mỗi trang (mặc định: 10)
// @param {string} sort - Sắp xếp (ví dụ: 'createdAt,desc')
// @returns {object} - Dữ liệu địa chỉ và tổng số bản ghi
export const fetchAddressesAPI = async (page = 0, size = 10, sort = "createdAt,desc") => {
    const url = `${API_BASE_URL}${API_URLS.ADD_ADDRESS}?page=${page}&size=${size}&sort=${sort}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return {
            data: response.data,
            total: parseInt(response.headers['content-range']?.split('/')[1] || 0),
        };
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch addresses");
    }
};

// Lấy địa chỉ theo ID
// @param {string} id - ID của địa chỉ
// @returns {object} - Dữ liệu địa chỉ
export const getAddressById = async (id) => {
    const url = `${API_BASE_URL}${API_URLS.GET_ADDRESS(id)}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch address");
    }
};