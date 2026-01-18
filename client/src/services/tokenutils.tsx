import { api } from "./user.endpoints";

export const setupTokenInterceptor =()=>{
    // Attach token to all requests
    api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth-token");
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
          localStorage.removeItem("auth-token");
          window.location.href = "/auth";
        }
        return Promise.reject(error);
      },
    );
}