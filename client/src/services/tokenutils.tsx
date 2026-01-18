import { api } from "./user.endpoints";

export const setupTokenInterceptor = () => {
  // Attach token to all requests
  api.interceptors.request.use(
    (config) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth-token="))
        ?.split("=")[1];

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  //Handle 401 unauthorized globally
  api.interceptors.response.use(
    (response) => response,
    (error) => {
       if (error.response?.status === 401) {
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict';
        document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict';
        window.location.href = "/auth";
      }
      return Promise.reject(error);
    },
  );
};
