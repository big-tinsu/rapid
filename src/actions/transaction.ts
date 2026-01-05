import api from "@/libs/axios";
import { GenericResponse, Pagination } from "@/types/Response";
import {
  Bank,
  InitiateDepositDto,
  InitiateDepositResponse,
  InitiateWithdrawalDto,
  PaymentProvider,
  Transaction,
  TransactionQueryParams,
  ValidateAccountDto,
  ValidatedAccount,
  VerifyDepositResponse,
  WithdrawalRequest,
  WithdrawalRequestQuery,
} from "@/types/new/transaction";

export async function getTransactions(params: TransactionQueryParams) {
  try {
    const response = await api.get("/v1/transactions/user", {
      params,
    });
    const { data } = response.data as GenericResponse<Pagination<Transaction>>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function getBanks() {
  try {
    const response = await api.get("/v1/transactions/banks");
    const { data } = response.data as GenericResponse<Bank[]>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function initiateDeposit(payload: InitiateDepositDto) {
  try {
    const response = await api.post(
      "/v1/transactions/deposit/initiate",
      payload
    );
    const { data } = response.data as GenericResponse<InitiateDepositResponse>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function verifyDeposit(
  reference: string,
  provider: PaymentProvider
) {
  try {
    const response = await api.post(
      `/v1/transactions/deposit/verify/${provider}/${reference}`
    );
    const { data } = response.data as GenericResponse<VerifyDepositResponse>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function cancelDeposit(reference: string) {
  try {
    const response = await api.post(
      `/v1/transactions/deposit/cancel/${reference}`
    );
    const { data } = response.data as GenericResponse<{ status: string }>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function validateAccount(payload: ValidateAccountDto) {
  try {
    const response = await api.post(
      "/v1/transactions/account/validate",
      payload
    );
    const { data } = response.data as GenericResponse<ValidatedAccount>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function initiateWithdrawal(payload: InitiateWithdrawalDto) {
  try {
    const response = await api.post(
      "/v1/transactions/withdrawal/initiate",
      payload
    );
    const { data } = response.data as GenericResponse<WithdrawalRequest>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function getWithdrawalRequests(params: WithdrawalRequestQuery) {
  try {
    const response = await api.get(
      "/v1/transactions/withdrawal-requests/user",
      {
        params,
      }
    );
    const { data } = response.data as GenericResponse<
      Pagination<WithdrawalRequest>
    >;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
