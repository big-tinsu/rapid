import api from "@/libs/axios";
import { GenericResponse } from "@/types/Response";
import {
  ForgotPasswordDto,
  LoginDto,
  LoginResponse,
  Profile,
  RegisterDto,
  RegisterResponse,
  ResendCodeDto,
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateProfileDto,
  VerifyDto,
  Wallet,
} from "@/types/new/auth";

export async function register(payload: RegisterDto) {
  try {
    const response = await api.post("/v1/auth/signup", payload);
    const { data } = response.data as GenericResponse<RegisterResponse>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function getProfile() {
  try {
    const response = await api.get("/v1/auth/profile");
    const { data } = response.data as GenericResponse<Profile>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function updateProfile(payload: UpdateProfileDto) {
  try {
    const response = await api.put("/v1/auth/profile", payload);
    const { data } = response.data as GenericResponse<Profile>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function getWallet() {
  try {
    const response = await api.get("/v1/users/wallet");
    const { data } = response.data as GenericResponse<Wallet>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function login(payload: LoginDto) {
  try {
    const response = await api.post("/v1/auth/login", payload);
    const { data } = response.data as GenericResponse<LoginResponse>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function verifyOTP(payload: VerifyDto) {
  try {
    const response = await api.post("/v1/auth/verify", payload);
    const { data } = response.data as GenericResponse<any>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function resendCode(payload: ResendCodeDto) {
  try {
    const response = await api.post("/v1/auth/resend-code", payload);
    const { data } = response.data as GenericResponse<any>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function updatePassword(payload: UpdatePasswordDto) {
  try {
    const response = await api.put("/v1/auth/password", payload);
    const { data } = response.data as GenericResponse<{ message: string }>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function forgotPassword(payload: ForgotPasswordDto) {
  try {
    const response = await api.post("/v1/auth/forgot-password", payload);
    const { data } = response.data as GenericResponse<{ message: string }>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function resetPassword(payload: ResetPasswordDto) {
  try {
    const response = await api.post("/v1/auth/reset-password", payload);
    const { data } = response.data as GenericResponse<{ message: string }>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
