import { ApiService } from "@/services/apiService";
import {
  GetRegistrationResponse,
  GetOTPVerificationResponse,
  GetLoginResponse,
  RegistrationBody,
  VerifySMSCodeBody,
  SendEmailCodeBody,
  UpdatePasswordBody,
  ResetPasswordBody,
} from "../types/Auth";

// Helper to safely access localStorage
const getFromLocalStorage = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(name);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

export class AuthApiService {
  public async register(data: RegistrationBody) {
    const response = await ApiService.request.post("/v1/auth/signup", data);

    return response.data as GetRegistrationResponse;
  }

  public async getUserDetails() {
    // Check if token exists before making the API call
    const token = getFromLocalStorage("token");
    if (!token) {
      return { success: false, data: null };
    }

    const response = await ApiService.request.get("/v1/auth/profile");
    return response.data;
  }

  public async verifyPromoCode(data: string) {
    const response = await ApiService.request.post(
      "/v1/transaction/verify-promo",
      {
        code: data,
      }
    );

    return response.data as GetOTPVerificationResponse;
  }

  public async verifyOTP(data: any) {
    const response = await ApiService.request.post("/v1/auth/verify", data);

    return response.data as GetOTPVerificationResponse;
  }

  public async login(data: any): Promise<GetLoginResponse> {
    const response = await ApiService.request.post("/v1/auth/login", data);

    return response.data;
  }

  public async sendToken(data: any): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post(
      "/v1/auth/resend-code",
      data
    );

    return response.data;
  }

  public async verifyRegistrationCode(
    data: VerifySMSCodeBody
  ): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post("/v1/auth/verify", data);

    return response.data;
  }

  public async sendPhoneCode(): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.get("/v1/auth/sendphonecode");

    return response.data;
  }

  public async sendSMSCode(phone: string): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post("/v1/auth/send-sms", {
      to: phone,
    });

    return response.data;
  }

  public async verifyPhoneCode(data: any): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post("/v1/auth/verify", data);

    return response.data;
  }

  public async sendEmailCode(
    data: SendEmailCodeBody
  ): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post(
      "/v1/auth/send-verification-email",
      data
    );

    return response.data;
  }

  public async verifyEmailCode(data: any): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post(
      "/v1/auth/verify-email-code",
      data
    );

    return response.data;
  }

  public async sendVerification(
    user: any
  ): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post("/v1/auth/sendemail", user);

    return response.data;
  }

  public async forgotPassword(
    data: SendEmailCodeBody
  ): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post(
      "/v1/auth/passwordreset",
      data
    );

    return response.data;
  }

  public async updateProfile(data: { bankDetails: object }) {
    const response = await ApiService.request.put("/v1/auth/profile", data);

    return response.data;
  }

  public async resetPassword(
    data: ResetPasswordBody
  ): Promise<GetOTPVerificationResponse> {
    // const response = await ApiService.request.post("/api/v1/auth/reset-password?token=", data);
    const response = await ApiService.request.post(
      "/v1/auth/reset-password",
      data
    );

    return response.data;
  }

  public async updatePassword(payload: UpdatePasswordBody) {
    const response = await ApiService.request.post(
      `/v1/auth/changepassword`,
      payload
    );

    return response.data;
  }

  public async uploadFile(data: any) {
    const response = await ApiService.request.post("/v1/upload", data);

    return response.data;
  }

  public async resendCode(data: any): Promise<GetOTPVerificationResponse> {
    const response = await ApiService.request.post(
      "/v1/users/resend-code",
      data
    );

    return response.data;
  }

  async getProfileDetails() {
    // Check if token exists before making the API call
    const token = getFromLocalStorage("token");
    if (!token) {
      return { data: { success: false, data: null } };
    }

    try {
      const response = await ApiService.request.get("/v1/auth/profile");
      return response;
    } catch (error) {
      console.error("Error fetching profile details:", error);
      throw error;
    }
  }
}
