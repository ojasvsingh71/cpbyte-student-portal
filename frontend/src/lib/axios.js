import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: `${backendURL}/api/v1`,
  withCredentials: true,
});
