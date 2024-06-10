import axios from "axios";
export const BASE_URL = "http://localhost:8000";
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  validateStatus: (statusCode) => {
    return  statusCode < 500;
  }
});
