declare module "monnify-js" {
  export default class Monnify {
    constructor(apiKey: string, contractCode: string );

    static init(apiKey: string, apiSecret: string ): Monnify;

    public initializePayment(data: {
      amount: number;
      currency: string;
      reference: string;
      customerFullName: string;
      customerEmail: string;
      apiKey: string;
      contractCode: string;
      paymentDescription: string;
      metadata?: object;
      incomeSplitConfig?: object;
      onLoadStart?: () => void;
      onLoadComplete?: () => void;
      onComplete?: (response: MonnifyCompletePaymentResponse) => void;
      onClose?: (data: any) => void;
    }): Promise<any>;
  }
}

interface MonnifyCompletePaymentResponse {
    amount: number;
    amountPaid: number;
    completed: boolean;
    completedOn: string;
    createdOn: string;
    currencyCode: string;
    customerEmail: string;
    customerName: string;
    fee: number;
    metaData: any;
    payableAmount: number;
    paymentMethod: string;
    paymentReference: string;
    paymentStatus: string;
    transactionReference: string;
}