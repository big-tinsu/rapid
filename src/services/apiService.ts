import Axios, { AxiosInstance } from "axios";

// Helper to safely access localStorage in both client and server
const getFromLocalStorage = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(name);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

export class ApiService {
  private static _axiosInstance: AxiosInstance;

  public static get request(): AxiosInstance {
    if (ApiService._axiosInstance == null) {
      const token = getFromLocalStorage("token");

      ApiService._axiosInstance = Axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      // Set up the interceptors only once
      this.setupRequestInterceptors();
      this.setupResponseInterceptors();
    }
    return this._axiosInstance;
  }

  // Reset the Axios instance to use current env variables
  public static resetInstance(): void {
    ApiService._axiosInstance = null as any;
    // This will trigger a new instance creation with current token
  }

  private static setupRequestInterceptors() {
    this._axiosInstance.interceptors.request.use((config) => {
      // Get token from localStorage
      const token = getFromLocalStorage("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
      }

      return config;
    });
  }

  private static setupResponseInterceptors() {
    // Define public routes that don't require authentication
    const publicRoutes = ["/", "/landing-page", "/home"];

    this._axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
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
  }
}

export interface ApiErrorResponse extends Error {
  status: boolean;
  message: string;
}
