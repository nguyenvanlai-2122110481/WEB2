import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant";

// Đăng nhập
// @param {object} data - Dữ liệu đăng nhập (userName, password)
// @returns {object} - Token người dùng
export const loginAPI = async (data) => {
    const url = `${API_BASE_URL}${API_URLS.LOGIN}`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to login");
    }
};

// Đăng ký
// @param {object} data - Dữ liệu đăng ký (userName, password, email, firstName, lastName, phoneNumber)
// @returns {object} - Phản hồi đăng ký
export const registerAPI = async (data) => {
    const url = `${API_BASE_URL}${API_URLS.REGISTER}`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to register");
    }
};