import { PUBLIC_ROUTES } from "@/utils/constants";
import axios, { AxiosInstance } from "axios";

// Microservice base URLs
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiErrorResponse extends Error {
  status: boolean;
  message: string;
}

// Helper to safely access localStorage in both client and server
export const getFromLocalStorage = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(name);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

// Create API instance for a specific service
export function createApiInstance(): AxiosInstance {
  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use((config) => {
    const token = getFromLocalStorage("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      let apiResponse: ApiErrorResponse;

      if (error.response) {
        // Handle 401 Unauthorized responses
        if (error.response.status === 401) {
          // Clear token but don't redirect - let the UI show login modal
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            // Dispatch event to trigger UI update (shows login banner)
            window.dispatchEvent(new Event('storage'));
          }
        }

        apiResponse = error.response.data as ApiErrorResponse;
      } else if (error.request) {
        // Request was made but no response received
        apiResponse = {
          status: false,
          message:
            "Failed to connect to the server, please check your internet connection and try again",
          name: "client-error",
        };
      } else {
        // Error setting up the request
        apiResponse = {
          status: false,
          message: "Error making a request",
          name: "client-error",
        };
      }

      return Promise.reject(apiResponse);
    }
  );

  return api;
}

const api = createApiInstance();

export default api;
