import axios from "axios";

const API_URL = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000";
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest.url === "/user/refresh" ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      const refreshResponse = await api.get("/user/refresh");
      isRefreshing = false;
      processQueue(null);
      return api(originalRequest);
    } catch (err) {
      isRefreshing = false;
      processQueue(err, null);
      return Promise.reject(err);
    }
  }
);

export default api;