'use client';

import { useState } from 'react';
import { IoClose, IoCheckmarkCircle, IoShieldCheckmark } from 'react-icons/io5';
import { useAuth } from '@/contexts/auth-context';
import { useSetRecoilState } from '@/libs/recoil';
import { toastAtom } from '@/global-state/toast.atom';
import {
  cancelDeposit,
  initiateDeposit as initiateDepositAction,
  verifyDeposit,
} from '@/actions/transaction';
import { PaymentProvider } from '@/types/new/transaction';
import Monnify from 'monnify-js';
import OverlayLoader from './OverlayLoader';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  provider: PaymentProvider;
  badge?: 'Recommend' | 'Popular';
}

const fiatPaymentMethods: PaymentMethod[] = [
  {
    id: 'paystack-1',
    name: 'Paystack',
    provider: PaymentProvider.PAYSTACK,
    badge: 'Recommend',
  },
  {
    id: 'monnify-1',
    name: 'Monnify',
    provider: PaymentProvider.MONNIFY,
    badge: 'Popular',
  },
];

const presetAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const { getWallet } = useAuth();
  const setToast = useSetRecoilState(toastAtom);

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(fiatPaymentMethods[0]);
  const [amount, setAmount] = useState<number>(1000);
  const [loading, setLoading] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');

  if (!isOpen) return null;

  const formatAmount = (num: number) => {
    return num.toLocaleString();
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Recommend':
        return 'bg-[var(--bc-accent-green)]';
      case 'Popular':
        return 'bg-blue-500';
      case 'Fastest':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  async function onComplete(
    reference: string,
    payload: any,
    provider: PaymentProvider
  ) {
    try {
      setToast({
        showToast: true,
        toastObj: {
          type: 'success',
          description: 'Payment initiated! Your balance will be updated once payment is confirmed.',
        },
      });
      setLoaderText('Verifying payment...');
      const res = await verifyDeposit(reference, provider);

      if (res.status !== 'successful') {
        setToast({
          showToast: true,
          toastObj: {
            type: 'info',
            description: 'Payment is still being processed. Please check back later.',
          },
        });
        setDepositLoading(false);
        return;
      }

      setLoaderText('Updating balance...');
      await getWallet();
      setDepositLoading(false);

      setToast({
        showToast: true,
        toastObj: {
          type: 'success',
          description: 'Deposit successful! Your balance has been updated.',
        },
      });
      onClose();
    } catch (error) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'error',
          description: 'Failed to verify payment. Please try again.',
        },
      });
      setDepositLoading(false);
    }
  }

  async function onCancel(reference: string, payload: any) {
    if (payload?.status === 'SUCCESS') return;
    setDepositLoading(false);
    await cancelDeposit(reference);
    setToast({
      showToast: true,
      toastObj: {
        type: 'error',
        description: 'Deposit request cancelled.',
      },
    });
  }

  async function initiateDepositPaystack() {
    if (amount < 100) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'warning',
          description: 'Please enter a minimum of ₦100',
        },
      });
      return;
    }
    setLoading(true);

    try {
      const transactionInfo = await initiateDepositAction({
        amount,
        provider: PaymentProvider.PAYSTACK,
      });
      setLoading(false);

      setLoaderText('Launching payment gateway...');
      setDepositLoading(true);

      if (typeof window === 'undefined' || !window.PaystackPop) {
        throw new Error('Paystack script not loaded');
      }

      const paystackHandler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        email: transactionInfo.customerEmail,
        amount: amount * 100,
        ref: transactionInfo.reference,
        currency: 'NGN',
        metadata: {
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: transactionInfo.customerFullName,
            },
          ],
        },
        callback: (response: any) => {
          onComplete(transactionInfo.reference, response, PaymentProvider.PAYSTACK);
        },
        onClose: () => {
          onCancel(transactionInfo.reference, { status: 'CANCELLED' });
        },
      });

      paystackHandler.openIframe();
    } catch (error) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'error',
          description: 'Failed to process deposit request. Please try again.',
        },
      });
      setDepositLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function initiateDepositMonnify() {
    if (amount < 100) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'warning',
          description: 'Please enter a minimum of ₦100',
        },
      });
      return;
    }
    setLoading(true);

    try {
      const transactionInfo = await initiateDepositAction({
        amount,
        provider: PaymentProvider.MONNIFY,
      });
      setLoading(false);

      setLoaderText('Launching payment gateway...');
      setDepositLoading(true);

      const monnify = new Monnify(
        process.env.NEXT_PUBLIC_MONNIFY_API_KEY || '',
        process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE || ''
      );

      monnify.initializePayment({
        amount: amount,
        currency: 'NGN',
        reference: transactionInfo.reference,
        customerFullName: transactionInfo.customerFullName,
        customerEmail: transactionInfo.customerEmail,
        apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY || '',
        contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE || '',
        paymentDescription: 'Deposit to wallet',
        onComplete: (payload: any) =>
          onComplete(transactionInfo.reference, payload, PaymentProvider.MONNIFY),
        onClose: (payload: any) => onCancel(transactionInfo.reference, payload),
      });
    } catch (error) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'error',
          description: 'Failed to process deposit request. Please try again.',
        },
      });
      setDepositLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const handleDeposit = () => {
    if (!selectedMethod) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'warning',
          description: 'Please select a payment method',
        },
      });
      return;
    }

    if (selectedMethod.provider === PaymentProvider.PAYSTACK) {
      initiateDepositPaystack();
    } else if (selectedMethod.provider === PaymentProvider.MONNIFY) {
      initiateDepositMonnify();
    }
  };

  return (
    <>
      <div
        className='fixed inset-0 bg-black/70 z-50 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-auto md:w-full md:max-w-lg z-50 overflow-y-auto max-h-[calc(100vh-32px)]'>
        <div className='bg-[var(--bc-bg-secondary)] rounded-2xl overflow-hidden shadow-2xl'>
          <div className='relative px-4 py-4 border-b border-[var(--bc-border)] flex items-center justify-center'>
            <h2 className='text-white font-semibold text-lg'>Deposit</h2>
            <button
              onClick={onClose}
              className='absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-[var(--bc-text-secondary)] hover:text-white hover:bg-[var(--bc-bg-tertiary)] transition-colors'
            >
              <IoClose className='text-xl' />
            </button>
          </div>

          <div className='p-4'>
            {/* Deposit Guarantee Badge */}
            <div className='flex justify-center mb-4'>
              <div className='inline-flex items-center gap-2 bg-[var(--bc-accent-green)]/20 text-[var(--bc-accent-green)] px-4 py-2 rounded-full text-sm'>
                <IoShieldCheckmark className='text-lg' />
                <span className='font-medium'>Secure Payment</span>
                <span className='w-5 h-5 rounded-full bg-[var(--bc-accent-green)] text-black flex items-center justify-center text-xs'>✓</span>
              </div>
            </div>

            {/* Amount Input */}
            <div className='mb-4'>
              <label className='block text-[var(--bc-text-secondary)] text-sm mb-2'>
                Amount (NGN)
              </label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[var(--bc-text-secondary)]'>₦</span>
                <input
                  type='number'
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={100}
                  className='w-full bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg pl-8 pr-4 py-3 text-white text-lg font-medium focus:border-[var(--bc-accent-green)] focus:outline-none transition-colors'
                  placeholder='Enter amount'
                />
              </div>
            </div>

            {/* Preset Amounts */}
            <div className='grid grid-cols-3 gap-2 mb-4'>
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    amount === preset
                      ? 'bg-[var(--bc-accent-green)] text-black'
                      : 'bg-[var(--bc-bg-tertiary)] text-white hover:bg-[var(--bc-border)]'
                  }`}
                >
                  ₦{formatAmount(preset)}
                </button>
              ))}
            </div>

            {/* Bonus Banner */}
            <div className='bg-[var(--bc-bg-tertiary)] rounded-lg p-3 mb-4 flex items-center gap-3'>
              <span className='text-2xl'>🎁</span>
              <p className='text-sm'>
                <span className='text-white'>Get extra </span>
                <span className='text-[var(--bc-accent-green)] font-bold'>180% bonus</span>
                <span className='text-white'> on minimum of </span>
                <span className='text-[var(--bc-accent-green)] font-bold'>₦2,000.00</span>
                <span className='text-white'> deposit</span>
              </p>
            </div>

            {/* Payment Methods */}
            <div className='mb-4'>
              <label className='block text-[var(--bc-text-secondary)] text-sm mb-3'>
                Payment Method
              </label>

              <div className='grid grid-cols-2 gap-3'>
                {fiatPaymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className={`relative bg-[var(--bc-bg-tertiary)] border rounded-xl p-4 text-center transition-all hover:border-[var(--bc-accent-green)] ${
                      selectedMethod?.id === method.id
                        ? 'border-[var(--bc-accent-green)] ring-1 ring-[var(--bc-accent-green)]'
                        : 'border-[var(--bc-border)]'
                    }`}
                  >
                    {method.badge && (
                      <span className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white px-2 py-0.5 rounded ${getBadgeColor(method.badge)}`}>
                        {method.badge}
                      </span>
                    )}

                    <h4 className='text-white font-medium text-sm'>{method.name}</h4>

                    {selectedMethod?.id === method.id && (
                      <IoCheckmarkCircle className='absolute top-2 right-2 text-[var(--bc-accent-green)] text-lg' />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Deposit Button */}
            <button
              onClick={handleDeposit}
              disabled={loading || !selectedMethod || amount < 100}
              className={`w-full bc-button-primary py-3 text-sm font-semibold transition-opacity ${
                loading || !selectedMethod || amount < 100 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className='flex items-center justify-center gap-2'>
                  <span className='w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin'></span>
                  Processing...
                </span>
              ) : (
                `Deposit ₦${formatAmount(amount)}`
              )}
            </button>

            {/* Min Amount Notice */}
            <p className='text-center text-[var(--bc-text-muted)] text-xs mt-3'>
              Minimum deposit: ₦100
            </p>
          </div>
        </div>
      </div>

      {depositLoading && <OverlayLoader loaderText={loaderText} />}
    </>
  );
}
