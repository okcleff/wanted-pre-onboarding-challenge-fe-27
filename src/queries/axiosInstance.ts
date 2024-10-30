import axios from "axios";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiRequest = {
  get: async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.get(url);
    return response.data.data;
  },
  post: async <T, P>(url: string, payload: P): Promise<T> => {
    const response = await axiosInstance.post(url, payload);
    return response.data;
  },
  put: async <T, P>(url: string, payload: P): Promise<T> => {
    const response = await axiosInstance.put(url, payload);
    return response.data;
  },
  delete: async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete(url);
    return response.data;
  },
};
