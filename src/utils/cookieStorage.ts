import { encrypt, decrypt } from "./crypto-js";

// Check if we're running on the client side
const isClient = typeof window !== "undefined";

interface StorageOptions {
  shouldEncrypt?: boolean;
}

export const cookieStorage = {
  get: (key: string): any => {
    if (!isClient) return null;

    try {
      const value = localStorage.getItem(key);

      if (!value) return null;

      // Try to decrypt and parse the value if it's encrypted
      try {
        return JSON.parse(decrypt(value));
      } catch {
        // If it's not encrypted or not JSON, try plain JSON parse
        try {
          return JSON.parse(value);
        } catch {
          // Return as is if not JSON
          return value;
        }
      }
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return null;
    }
  },

  set: (key: string, value: any, options: StorageOptions = {}): void => {
    if (!isClient) return;

    try {
      const { shouldEncrypt = false } = options;

      let stringValue: string;

      // Only encrypt if specified or if the value is an object
      if (shouldEncrypt || (typeof value === "object" && value !== null)) {
        stringValue = encrypt(JSON.stringify(value));
      } else {
        // Otherwise just stringify
        stringValue = typeof value === "string" ? value : JSON.stringify(value);
      }

      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  },

  remove: (key: string): void => {
    if (!isClient) return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  // Check if an item exists
  exists: (key: string): boolean => {
    if (!isClient) return false;

    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error("Error checking localStorage existence:", error);
      return false;
    }
  },
};

// For Zustand persist compatibility
export const cookieStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => {
    if (!isClient) return null;
    try {
      return localStorage.getItem(name);
    } catch (error) {
      console.error("Error getting item from localStorage:", error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (!isClient) return;
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      console.error("Error setting item in localStorage:", error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (!isClient) return;
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  },
};
