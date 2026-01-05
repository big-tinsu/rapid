import { Pagination } from "./Response";

export interface GetTransactionsResponse {
  data: Pagination<Transaction>;
}

export interface Transaction {
  id: string;
  amount: number;
  fee: number;
  user: string;
  wallet: string;
  status: string;
  type: string; // debit or credit
  currency: string;
  reference: string;
  dateInitiated: Date;
  meta?: {
    type: string;
    playerId: string;
    gameOutcome: string | null;
    gameRoundEnded: boolean;
    gameType: string;
    roundId: string;
    freebet: boolean;
    amount: number;
    signature: string;
    reference: string;
    sessionId: string;
  };
  deletedAt: string | null;
  createdAt: Date;
  updatedAt: Date;
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
  data: ValidatedAccount;
}

export interface ValidatedAccount {
  accountNumber: string;
  accountName: string;
  bankCode: string;
}

export interface ValidateAccountBody {
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
