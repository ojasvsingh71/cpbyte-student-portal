import axios from "axios";

const backendport = import.meta.env.VITE_BACKEND_PORT || 8080;
console.log("Backend URL:", backendport);
export const axiosInstance = axios.create({
  baseURL: `http://localhost:${backendport}/api/v1`,
  withCredentials: true,
});