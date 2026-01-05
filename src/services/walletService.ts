import { GenericResponse } from "@/types/Response";
import { ApiService } from "./apiService";
import { Wallet } from "@/types/Wallet";
import { PaymentProvider } from "@/types/new/transaction";
export interface WithdrawResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class WalletService {
  public async getWallet(): Promise<GenericResponse<Wallet>> {
    const response = await ApiService.request.get("/v1/users/wallet");
    return response.data;
  }

  public async withdraw(amount: number): Promise<WithdrawResponse> {
    const response = await ApiService.request.post("/v1/wallets/withdraw", {
      amount,
    });
    return response.data;
  }

  public async initiateDeposit(data: { amount: number }): Promise<
    GenericResponse<{
      amount: number;
      reference: string;
      customerFullName: string;
      customerEmail: string;
    }>
  > {
    const response = await ApiService.request.post(
      "/v1/transactions/deposit/initiate",
      {
        amount: data.amount,
      }
    );
    return response.data;
  }

  public async cancelDepositTransaction(
    reference: string
  ): Promise<GenericResponse<any>> {
    const response = await ApiService.request.post(
      `/v1/transactions/deposit/cancel/${reference}`
    );
    return response.data;
  }

  public async verifyDepositTransaction(
    reference: string,
    provider: PaymentProvider
  ): Promise<GenericResponse<any>> {
    const response = await ApiService.request.get(
      `/v1/transactions/deposit/verify/${provider}/${reference}`
    );
    return response.data;
  }
}
