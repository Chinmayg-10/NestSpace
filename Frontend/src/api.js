import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000, // 10s timeout
});

// Add auth token to headers if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global response error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log or transform error here if needed
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;

