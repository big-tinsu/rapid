import { Wallet } from "./Wallet";


export interface GetCustomerResponse {
  success: boolean;
  user: Customer;
}

export interface Balances {
  balance: number;
  promoBalance: number;
  fullBalance: number;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  isActive: boolean;
  otp?: string;
  promo?: string;
  deletedAt: null | Date;
  createdAt: Date;
  updatedAt: Date;
  verifiedAt: Date;
  address?: string;
  username?: string;
  
  // Keep backward compatibility with old properties
  // These can be gradually removed as code is updated
  role?: string;
  isDisabled?: boolean;
  admin?: boolean;
  verificationStatus?: boolean;
  status?: boolean;
  balances?: Balances;
  mobile?: string;
  hashedId?: string;
  walletId?: Wallet;
  __v?: number;
  lastPlayed?: Date;
  dateOfBirth?: Date;
  firstname?: string;
  lastname?: string;
}

export interface UpdateCustomerProfileBody {
  firstname: string;
  lastname: string;
  dateOfBirth: string | Date;
  bankName: string;
  accountNumber: string;
  accountName: string;
}
