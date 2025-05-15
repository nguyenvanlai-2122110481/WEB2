import axios from "axios";
import { API_BASE_URL, API_URLS, getHeaders } from "./constant";

// Lấy danh sách sản phẩm với phân trang, tìm kiếm, và lọc
// @param {string} categoryId - ID danh mục (tùy chọn)
// @param {string} typeId - ID loại danh mục (tùy chọn)
// @param {string} search - Từ khóa tìm kiếm (tùy chọn)
// @param {number} page - Trang hiện tại (mặc định: 0)
// @param {number} size - Số bản ghi mỗi trang (mặc định: 10)
// @param {string} sort - Sắp xếp (ví dụ: 'createdAt,desc')
// @returns {object} - Dữ liệu sản phẩm và tổng số bản ghi
export const getAllProducts = async (
    page = 0,
    size = 10,
    sort = 'createdAt,desc',
    search = '',
    categoryId = '',
    typeId = ''
) => {
    let url = `${API_BASE_URL}${API_URLS.GET_PRODUCTS}?page=${page}&size=${size}&sort=${sort}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (categoryId) url += `&categoryId=${encodeURIComponent(categoryId)}`;
    if (typeId) url += `&typeId=${encodeURIComponent(typeId)}`;

    try {
        const response = await axios.get(url, { headers: getHeaders() });
        console.log('getAllProducts response:', response); // Debug phản hồi
        return {
            data: response.data.content || response.data, // Điều chỉnh theo định dạng backend
            total: parseInt(response.headers['content-range']?.split('/')[1] || response.data.totalElements || 0),
        };
    } catch (err) {
        console.error('getAllProducts error:', err.response?.data || err.message);
        throw new Error(err.response?.data?.message || 'Failed to fetch products');
    }
};

// Lấy sản phẩm theo slug
// @param {string} slug - Slug của sản phẩm
// @returns {object} - Dữ liệu sản phẩm
export const getProductBySlug = async (slug) => {
    const url = `${API_BASE_URL}${API_URLS.GET_PRODUCT_BY_SLUG}?slug=${slug}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return response.data[0]; // API trả về mảng, lấy phần tử đầu tiên
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch product");
    }
};

// Lấy sản phẩm theo ID
// @param {string} id - ID của sản phẩm
// @returns {object} - Dữ liệu sản phẩm
export const getProductById = async (id) => {
    const url = `${API_BASE_URL}${API_URLS.GET_PRODUCT(id)}`;
    try {
        const response = await axios.get(url, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch product");
    }
};

// Tạo sản phẩm mới
// @param {object} data - Dữ liệu sản phẩm
// @returns {object} - Dữ liệu sản phẩm vừa tạo
export const createProduct = async (data) => {
    const url = `${API_BASE_URL}${API_URLS.CREATE_PRODUCT}`;
    try {
        const response = await axios.post(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to create product");
    }
};

// Cập nhật sản phẩm
// @param {string} id - ID của sản phẩm
// @param {object} data - Dữ liệu sản phẩm cần cập nhật
// @returns {object} - Dữ liệu sản phẩm đã cập nhật
export const updateProduct = async (id, data) => {
    const url = `${API_BASE_URL}${API_URLS.UPDATE_PRODUCT(id)}`;
    try {
        const response = await axios.put(url, data, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to update product");
    }
};

// Xóa sản phẩm
// @param {string} id - ID của sản phẩm
// @returns {void}
export const deleteProduct = async (id) => {
    const url = `${API_BASE_URL}${API_URLS.DELETE_PRODUCT(id)}`;
    try {
        const response = await axios.delete(url, { headers: getHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to delete product");
    }
};