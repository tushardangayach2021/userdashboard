import axios from "axios";
import { API } from "./api";

let axiosInstance = null;
const configurationSetting = (store) => {
    axiosInstance = axios.create();
    setupInterceptors(store)
}
const setAxiosBase = (config) => {
    if (axiosInstance === null) {
        axiosInstance = axios.create();
    }
    if (config.baseURL) {
        axiosInstance.defaults.baseURL = config.baseURL;
    }
}
const fetch = async (url, tokenConfig = {}) => {
    const response = await axiosInstance.get(url);
    if (response.status >= 200 && response.status < 300) {
        return { data: response.data, status: response.status }
    }
    return response;
}
const post = async (url,data, tokenConfig = {}) => {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
        return { data: response.data, status: response.status }
    }
    return response;
}
const put = async (url,data, tokenConfig = {}) => {
    const response = await axiosInstance.patch(url, data);
    if (response.status >= 200 && response.status < 300) {
        return { data: response.data, status: response.status }
    }
    return response;
}

const remove = async (url, tokenConfig = {}) => {
    const response = await axiosInstance.delete(url);
    if (response.status >= 200 && response.status < 300) {
        return { data: response.data, status: response.status }
    }
    return response;
}
const setupInterceptors = (store) => {
    axiosInstance.interceptors.response.use((response) => {
        console.log("interceptors", JSON.stringify(response.data))
        return response;
    }, (error) => {
        console.log(error)
    })
}

export { setAxiosBase, fetch, remove, put, post }
export default configurationSetting;