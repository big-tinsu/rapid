import { ApiService } from "./apiService";
import {
  FundWalletBody,
  GetBanksResponse,
  GetTransactionsResponse,
  ValidateAccountBody,
  ValidateAccountResponse,
} from "@/types/Transactions";

// Simple caching implementation
interface CacheRecord {
  data: any;
  timestamp: number;
}

const cache: Record<string, CacheRecord> = {};

// Cache for 30 seconds
const CACHE_DURATION = 30000;

export class TransactionsApiService {
  private getFromCache<T>(key: string): T | null {
    const record = cache[key];
    if (record && Date.now() - record.timestamp < CACHE_DURATION) {
      return record.data as T;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  public async getTransactions(page: number): Promise<GetTransactionsResponse> {
    const cacheKey = `transactions-${page}`;
    const cachedData = this.getFromCache<GetTransactionsResponse>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    // The server should identify the user from the Authorization header,
    // so we don't need to send userId in the params
    const response = await ApiService.request.get(`/v1/transactions/user`, {
      params: {
        page,
        limit: 10,
      },
    });

    this.setCache(cacheKey, response.data);
    return response.data;
  }

  public async validateAccount(
    data: ValidateAccountBody
  ): Promise<ValidateAccountResponse> {
    const response = await ApiService.request.post(
      `/v1/transactions/validate-account`,
      {
        bankCode: data.bankCode,
        accountNumber: data.accountNumber,
      }
    );

    return response.data;
  }

  public async getBanks(): Promise<GetBanksResponse> {
    const cacheKey = "banks";
    const cachedData = this.getFromCache<GetBanksResponse>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await ApiService.request.get(
      `/v1/transactions/banks-monnify`
    );

    this.setCache(cacheKey, response.data);
    return response.data;
  }

  public async getWallet(walletId: string): Promise<GetBanksResponse> {
    const cacheKey = `wallet-${walletId}`;
    const cachedData = this.getFromCache<GetBanksResponse>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await ApiService.request.get(`/v1/users/wallet`);

    this.setCache(cacheKey, response.data);
    return response.data;
  }

  public async initPayment(amount: number): Promise<GetBanksResponse> {
    const response = await ApiService.request.post(
      `/v1/transactions/deposit/initiate`,
      amount
    );

    return response.data;
  }

  public async fundWallet(payload: FundWalletBody): Promise<GetBanksResponse> {
    const response = await ApiService.request.post(
      `/v1/payment/fund-wallet`,
      payload
    );

    return response.data;
  }

  // : Promise<GetBanksResponse>
  public async initiateWithdrawal(payload: {
    amount: number;
    accountNumber: string;
    bankCode: string;
  }) {
    const response = await ApiService.request.post(
      `/v1/wallets/withdraw`,
      payload
    );

    return response.data;
  }

  public async bonusTransfer(payload: any): Promise<GetBanksResponse> {
    const response = await ApiService.request.post(
      `/v1/walletUrl/bonus-transfer`,
      payload
    );

    return response.data;
  }

  public async coralPayInitPayment(payload: any): Promise<GetBanksResponse> {
    const response = await ApiService.request.post(
      `/v1/payment/initiate-deposit`,
      payload
    );

    return response.data;
  }

  public async coralPayValidateTransaction(
    payload: any
  ): Promise<GetBanksResponse> {
    const response = await ApiService.request.post(
      `/v1/payment/requery-transaction`,
      payload
    );

    // Invalidate cache for transactions
    delete cache["transactions-1"];

    return response.data;
  }
}
