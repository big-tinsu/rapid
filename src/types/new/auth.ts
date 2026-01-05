export interface LoginDto {
  to: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: any;
  expiresIn: string;
  isVerified: boolean;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  referrerCode?: string;
}

export interface RegisterResponse {
  email: string;
  phoneNumber: string;
}

export interface VerifyDto {
  otp: string;
  email: string;
}

export interface ResendCodeDto {
  email: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  address: string;
  verifiedAt: Date | null;
  isActive: boolean;
}

export interface UpdateProfileDto {
  address: string;
  firstName: string;
  lastName: string;
}

export interface Wallet {
  id: string;
  balance: number;
  promoBalance: number;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}
