import { BASE_URL } from "../config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something wrong in sever"
    )
);

export default axiosInstance;
