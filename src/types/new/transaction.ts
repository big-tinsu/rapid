import { PaginationParams } from "../Response";

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESSFUL = "successful",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}

export enum Currency {
  NGN = "NGN",
}

export enum WithdrawalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
  PROCESSING = "processing",
}

export enum PaymentProvider {
  MONNIFY = "monnify",
  PAYSTACK = "paystack",
}

export interface Transaction {
  id: string;
  amount: number;
  fee: number;
  status: TransactionStatus;
  type: TransactionType;
  currency: Currency;
  reference: string;
  wasRefunded: boolean;
  wasReverted: boolean;
  dateCompleted: Date;
  dateInitiated: Date;
  dateRefunded?: Date;
  dateReverted?: Date;
  provider: PaymentProvider;
  meta: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionQueryParams extends PaginationParams {
  status?: TransactionStatus;
  type?: TransactionType;
  reference?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface InitiateDepositDto {
  amount: number;
  provider: PaymentProvider;
}

export interface InitiateDepositResponse {
  amount: number;
  reference: string;
  customerFullName: string;
  customerEmail: string;
  provider: PaymentProvider;
  accessCode: string;
}

export interface ValidateAccountDto {
  bankCode: string;
  accountNumber: string;
}

export interface Bank {
  name: string;
  code: string;
  ussdTemplate: string | null;
  baseUssdCode: string | null;
  bankId: string;
  nipBankCode: string;
}

export interface VerifyDepositResponse {
  status: "successful" | "pending" | "failed";
  transaction?: Transaction;
}

export interface ValidatedAccount {
  accountNumber: string;
  accountName: string;
  bankCode: string;
}

export interface InitiateWithdrawalDto {
  amount: number;
  bankCode: string;
  accountNumber: string;
}
export interface WithdrawalRequest {
  id: string;
  status: WithdrawalStatus;
  amount: number;
  dateInitiated: Date;
  dateProcessed: Date | null;
}

export interface WithdrawalRequestQuery extends PaginationParams {
  status?: WithdrawalStatus;
  startDate?: Date;
  endDate?: Date;
}
