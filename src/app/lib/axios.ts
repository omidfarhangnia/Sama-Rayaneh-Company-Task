import axios from "axios";

const BASE_URL = "https://api.samateb.ir/API";

export function getToken() {
  const token = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("token="));

  return token ? token.split("=")[1] : null;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
