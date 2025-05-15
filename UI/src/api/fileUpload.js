import axios from "axios";
import { API_BASE_URL, API_URLS, getMultipartHeaders } from "./constant";

// Upload file lên server
// @param {File} file - File cần upload
// @param {string} folder - Thư mục đích trên server
// @returns {string} - URL của file đã upload
export const fileUploadAPI = async (file, folder) => {
    const url = `${API_BASE_URL}${API_URLS.UPLOAD_FILE(folder)}`;
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(url, formData, { headers: getMultipartHeaders() });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to upload file");
    }
};