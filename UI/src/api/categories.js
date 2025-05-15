import axios from "axios";
import { API_BASE_URL, API_URLS, getHeaders } from "./constant";

// Lấy danh sách danh mục với phân trang và sắp xếp
// @param {number} page - Trang hiện tại (mặc định: 0)
// @param {number} size - Số bản ghi mỗi trang (mặc định: 10)
// @param {string} sort - Sắp xếp (ví dụ: 'name,asc')
// @returns {object} - Dữ liệu danh mục và tổng số bản ghi
export const fetchCategories = async (page = 0, size = 10, sort = "name,asc",search = '') => {
    let url = `${API_BASE_URL}${API_URLS.GET_CATEGORIES}?page=${page}&size=${size}&sort=${sort}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return {
            data: response.data,
            total: parseInt(response.headers['content-range']?.split('/')[1] || 0),
        };
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch categories");
    }
};

// Lấy thông tin danh mục theo ID
// @param {string} id - ID của danh mục
// @returns {object} - Dữ liệu danh mục
export const fetchCategoryById = async (id) => {
    const url = `${API_BASE_URL}${API_URLS.GET_CATEGORY(id)}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch category");
    }
};

// Tạo danh mục mới
// @param {object} data - Dữ liệu danh mục (name, code, description, categoryTypeList)
// @returns {object} - Dữ liệu danh mục vừa tạo
export const createCategory = async (data) => {
    const url = `${API_BASE_URL}${API_URLS.CREATE_CATEGORY}`;
    try {
        const response = await axios.post(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to create category");
    }
};

// Cập nhật danh mục hiện có
// @param {string} id - ID của danh mục
// @param {object} data - Dữ liệu danh mục cần cập nhật
// @returns {object} - Dữ liệu danh mục đã cập nhật
export const updateCategory = async (id, data) => {
    const url = `${API_BASE_URL}${API_URLS.UPDATE_CATEGORY(id)}`;
    try {
        const response = await axios.put(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to update category");
    }
};

// Xóa danh mục
// @param {string} id - ID của danh mục
// @returns {void}
export const deleteCategory = async (id) => {
    const url = `${API_BASE_URL}${API_URLS.DELETE_CATEGORY(id)}`;
    try {
        const response = await axios.delete(url, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to delete category");
    }
};