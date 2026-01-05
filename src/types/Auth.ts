import { Customer } from "@/types/Customer";

export interface GetRegistrationResponse {
  success: boolean;
  user: Customer;
  token: string;
  message: string;
}

export interface GetLoginResponse {
  data: {
    isVerified: boolean;
    token: string;
    [key: string]: any;  // For other user data properties
  };
  status: boolean;
  message: string;
}

export interface GetOTPVerificationResponse {
  success: boolean;
  message: string;
}

export interface RegistrationBody {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  promo?: string;
  username: string;
}

export interface GetCustomerResponse {
  success: boolean;
  user: Customer;
}

export interface VerifySMSCodeBody {
  email: string;
  otp: string;
}

export interface SendEmailCodeBody {
  email: string;
  otp: string;
}

export type IBankDetails = {
  bankDetails: {
    accountNumber: string;
    bankName: string;
    bankCode: any;
    accountName: string;
};
}

export interface SendPhoneCodeBody {
  mobile: string;
}

export interface UpdatePasswordBody {
  old_password: string;
  password: string;
}

export interface ResetPasswordBody {
  password: string;
  token: string;
  email: string;
}
