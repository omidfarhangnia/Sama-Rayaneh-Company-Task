import axios from "axios";

const BASE_URL = "https://api.samateb.ir/API/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));

    if (token) {
      // ["token" , "tokenValue"]
      config.headers["Authorization"] = "Bearer " + token.split("=")[1];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
