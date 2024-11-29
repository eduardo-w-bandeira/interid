import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach Access Token)
Api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response Interceptor (Handle 401 and Refresh Token)
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Refresh token not available");

        const response = await axios.post(`${BASE_URL}token-refresh/`, {
          refresh: refreshToken,
        });

        // Update tokens in localStorage
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return Api(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
