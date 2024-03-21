import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// catch 401 -> refresh
let refreshAttempts = 0;
const maxRefreshAttempts = 3;

axiosInstance.interceptors.response.use(
  (res) => {
    // Сброс счетчика при успешном ответе
    refreshAttempts = 0;
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        refreshAttempts++;

        if (refreshAttempts <= maxRefreshAttempts) {
          try {
            await axiosInstance.get("/refresh");
            localStorage.setItem("IS_LOGGED_IN", "true");
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        } else {
          localStorage.removeItem("IS_LOGGED_IN");
          window.location.href = "/signin";
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const api = axiosInstance;
