declare global {
  interface Window {
    PaystackPop: {
      setup(options: PaystackOptions): {
        openIframe(): void;
      };
    };
  }
}

export interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  ref: string;
  currency?: string;
  metadata?: {
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  callback?: (response: PaystackCallbackResponse) => void;
  onClose?: () => void;
  channels?: string[];
  plan?: string;
  quantity?: number;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: string;
}

export interface PaystackCallbackResponse {
  message: string;
  reference: string;
  status: "success" | "failed";
  trans: string;
  transaction: string;
  trxref: string;
}

export {};
