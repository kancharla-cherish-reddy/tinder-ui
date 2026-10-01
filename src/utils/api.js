import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/api"
    : import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

export default api;
