import { Customer } from "../types/Customer";
import { decrypt, encrypt } from "./crypto-js";
import { cookieStorage } from "./cookieStorage";

export function formatCurrency(
  num: number,
  locale?: string,
  currency?: string
) {
  return new Intl.NumberFormat(locale ? `en-${locale}` : `en-ng`, {
    style: "currency",
    currency: currency ?? "NGN",
  }).format(num);
}

// User data function using cookies for user data
export function getUser(): Customer | null {
  const userData = cookieStorage.get("user");
  if (userData) {
    try {
      if (typeof userData === "string") {
        return JSON.parse(decrypt(userData));
      }
      return userData;
    } catch (error) {
      console.error("Failed to decrypt user data:", error);
      return null;
    }
  }
  return null;
}

export function getUserId() {
  return cookieStorage.get("uid");
}

export function getWalletId() {
  return cookieStorage.get("walletId") || "";
}

export function getOTPCode() {
  const otp = cookieStorage.get("otp");
  if (otp === null) {
    return "";
  }
  return otp;
}

export function getToken() {
  return cookieStorage.get("token");
}

// Setter functions
export function setUser(user: Customer | null) {
  if (user) {
    const encrypted = encrypt(JSON.stringify(user));
    cookieStorage.set("user", encrypted);
  } else {
    cookieStorage.remove("user");
  }
}

export function setUserId(id: string) {
  cookieStorage.set("uid", id);
}

export function setWalletId(id: string) {
  cookieStorage.set("walletId", id);
}

export function setOTPCode(otp: string) {
  cookieStorage.set("otp", otp);
}

export function setToken(token: string | null) {
  if (token) {
    cookieStorage.set("token", token);
  } else {
    cookieStorage.remove("token");
  }
}

// Clear all auth data
export function clearAuthData() {
  cookieStorage.remove("token");
  cookieStorage.remove("user");
  cookieStorage.remove("uid");
  cookieStorage.remove("walletId");
  cookieStorage.remove("otp");
}
