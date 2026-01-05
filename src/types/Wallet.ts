import { Pagination } from "./Response";

export interface GetTransactionsResponse {
  success: boolean;
  data: Pagination<Transaction>;
}

export interface Transaction {
  wallet: number;
  id: string;
  userId: string;
  amount: number;
  reference: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  transactionType?: number;
  accountNumber?: string;
  bankName?: string;
  meta?: Meta;
}

export interface Meta {
  bankCode: string;
  titanBankCode: string;
  accountName: string;
}

export interface Wallet {
  balance: number;
  promoBalance: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  userId: string;
}
export interface ValidateAccountResponse {
  success: boolean;
  user: ValidateAccountUser;
}

export interface ValidateAccountUser {
  id: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
}

export interface ValidateAccountBody {
  userId: string;
  accountNumber: string;
  bankCode: string;
}

export interface GetBanksResponse {
  success: boolean;
  data: Bank[];
}

export interface Bank {
  name: string;
  code: string;
  code_2?: string;
}

export interface FundWalletBody {
  reference: string;
  userId: string;
}

export interface MonnifyResponseData {
  requestSuccessful: boolean;
  responseMessage: string;
  responseCode: string;
  responseBody: MonnifyResponseBody;
}

export interface MonnifyResponseBody {
  status: string;
  message: string;
  transactionReference: string;
  paymentReference: string;
  authorizedAmount: number;
}

export interface MonnifyProps {
  amount: number;
  currency: string;
  ref: string;
  name: string;
  email: string;
  apiKey: string;
  contractCode: string | null;
  description: string | null;
  metadata: object | null;
  incomeSplitConfig: Array<any> | null;
  onLoadStart: () => void;
  onLoadComplete: () => void;
  onComplete: () => void;
  onClose: () => void;
}

export interface InitiateDepositResponse {
  amount: number;
  reference: string;
  customerFullName: string;
  customerEmail: string;
}
