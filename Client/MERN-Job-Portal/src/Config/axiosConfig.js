import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        return axiosInstance
          .post("/auth/refresh-token", { refreshToken })
          .then(({ data }) => {
            localStorage.setItem("accessToken", data.accessToken);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            return axiosInstance(originalRequest);
          })
          .catch((refreshError) => {
            // Refresh token failed, logout user
            localStorage.clear();
            window.location.href = "/auth/login";
            return Promise.reject(refreshError);
          });
      }
    }

    // Handle specific error codes
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error(data.message || "Bad request");
          break;
        case 401:
          toast.error("Session expired. Please login again.");
          break;
        case 403:
          toast.error("You do not have permission to perform this action");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 500:
          toast.error("Internal server error");
          break;
        default:
          toast.error(data.message || "An error occurred");
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
