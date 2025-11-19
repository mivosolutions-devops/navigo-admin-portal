import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import keycloak from "./keycloak";

// Create axios instance with Keycloak token interceptor
export const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    timeoutErrorMessage: "Time out!",
  });

  // Request interceptor to add Keycloak token
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (keycloak && keycloak.authenticated && keycloak.token) {
        try {
          // Update token if it's about to expire
          await keycloak.updateToken(30);
          config.headers.Authorization = `Bearer ${keycloak.token}`;
        } catch (error) {
          console.error("Failed to refresh token:", error);
          // Token refresh failed, user will need to login again
          if (keycloak.logout) {
            keycloak.logout();
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401 errors
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid, logout user
        if (keycloak && keycloak.authenticated && keycloak.logout) {
          keycloak.logout();
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

