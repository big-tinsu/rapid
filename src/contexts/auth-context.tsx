"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  login as loginAction,
  getProfile as getProfileAction,
  getWallet as getWalletAction,
} from "@/actions/auth";
import { LoginDto, LoginResponse, Profile, Wallet } from "@/types/new/auth";
import { getFromLocalStorage } from "@/libs/axios";
import { PUBLIC_ROUTES } from "@/utils/constants";

interface AuthContextType {
  token: string | null;
  login: (credentials: LoginDto) => Promise<LoginResponse>;
  logout: () => void;
  setToken: (token: string | null) => void;
  profile: Profile | null;
  getProfile: () => Promise<Profile | null>;
  wallet: Wallet | null;
  getWallet: () => Promise<Wallet | null>;
  fetchingWallet: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isBrowser = typeof window !== "undefined";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [wallet, setWalletState] = useState<Wallet | null>(null);
  const [fetchingWallet, setFetchingWallet] = useState(false);
  useEffect(() => {
    // Check for existing token on mount
    const storedToken = getFromLocalStorage("token");
    if (storedToken) {
      setTokenState(storedToken);
      if (isBrowser && window.location.pathname === "/auth/login") {
        window.location.href = "/casino";
      }
    }
    // Don't auto-redirect to login - let middleware handle protected routes
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);

    if (isBrowser) {
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    }
  };

  const login = async (credentials: LoginDto) => {
    const result = await loginAction(credentials);
    if (result.token) {
      setToken(result.token);
    }
    return result;
  };

  const logout = () => {
    setToken(null);
    setProfileState(null);
    setWalletState(null);
    // Stay on current page - just refresh to update UI state
    if (isBrowser) {
      window.location.reload();
    }
  };

  const getProfile = async () => {
    try {
      const result = await getProfileAction();
      setProfileState(result);
      return result;
    } catch (error: any) {
      console.log("Failed to fetch profile:", error);
      if (error.message.includes("Unauthorized")) {
        setToken(null);
      }
      return null;
    }
  };

  const getWallet = async () => {
    setFetchingWallet(true);
    try {
      const result = await getWalletAction();
      setWalletState(result);
      return result;
    } catch (error) {
      console.error("Failed to fetch wallet:", error);
      return null;
    } finally {
      setFetchingWallet(false);
    }
  };

  const value = {
    token,
    login,
    logout,
    setToken,
    profile,
    getProfile,
    wallet,
    getWallet,
    fetchingWallet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
