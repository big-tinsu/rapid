'use client';

import { useState, useEffect } from 'react';
import { IoClose, IoCheckmarkCircle, IoShieldCheckmark, IoWallet } from 'react-icons/io5';
import { useAuth } from '@/contexts/auth-context';
import { useSetRecoilState } from '@/libs/recoil';
import { toastAtom } from '@/global-state/toast.atom';
import { useDebounce } from '@/hooks/useDebounce';
import { Bank } from '@/types/new/transaction';
import {
  getBanks,
  validateAccount,
  initiateWithdrawal as initiateWithdrawalAction,
} from '@/actions/transaction';
import OverlayLoader from './OverlayLoader';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const presetAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const { wallet, getWallet } = useAuth();
  const setToast = useSetRecoilState(toastAtom);

  const [amount, setAmount] = useState<number>(1000);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(false);
  const [banksLoading, setBanksLoading] = useState(false);
  const [validatingAccount, setValidatingAccount] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBankDropdown, setShowBankDropdown] = useState(false);

  const { debounce } = useDebounce();

  // Fetch banks on mount
  useEffect(() => {
    if (isOpen) {
      fetchBanks();
    }
  }, [isOpen]);

  // Validate account when bank and account number are set
  useEffect(() => {
    if (selectedBank && accountNumber.length === 10) {
      debouncedValidateAccount();
    } else {
      setAccountName('');
    }
  }, [selectedBank, accountNumber]);

  const fetchBanks = async () => {
    setBanksLoading(true);
    try {
      const response = await getBanks();
      setBanks(response);
    } catch (error: any) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'error',
          description: error.message || 'Failed to fetch banks',
        },
      });
    } finally {
      setBanksLoading(false);
    }
  };

  const validateAccountNumber = async () => {
    if (!selectedBank || accountNumber.length !== 10) return;

    setValidatingAccount(true);
    setAccountName('');

    try {
      const response = await validateAccount({
        accountNumber,
        bankCode: selectedBank.code,
      });

      if (response.accountName) {
        setAccountName(response.accountName);
      }
    } catch (error: any) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'error',
          description: error.message || 'Account validation failed',
        },
      });
    } finally {
      setValidatingAccount(false);
    }
  };

  const debouncedValidateAccount = debounce(validateAccountNumber, 1000);

  const handleWithdraw = async () => {
    if (!selectedBank || !accountNumber || !accountName) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'warning',
          description: 'Please fill in all bank details',
        },
      });
      return;
    }

    if (amount < 1000) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'warning',
          description: 'Minimum withdrawal amount is ₦1,000',
        },
      });
      return;
    }

    if (amount > 100000) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'warning',
          description: 'Maximum withdrawal amount is ₦100,000',
        },
      });
      return;
    }

    if (wallet && amount > wallet.balance) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'warning',
          description: 'Insufficient balance',
        },
      });
      return;
    }

    setWithdrawLoading(true);
    setLoaderText('Processing withdrawal...');

    try {
      await initiateWithdrawalAction({
        amount,
        accountNumber,
        bankCode: selectedBank.code,
      });

      setLoaderText('Updating balance...');
      await getWallet();

      setToast({
        showToast: true,
        toastObj: {
          type: 'success',
          description: 'Withdrawal request submitted successfully!',
        },
      });

      onClose();
    } catch (error: any) {
      setToast({
        showToast: true,
        toastObj: {
          type: 'error',
          description: error.message || 'Withdrawal failed. Please try again.',
        },
      });
    } finally {
      setWithdrawLoading(false);
    }
  };

  const formatAmount = (num: number) => {
    return num.toLocaleString();
  };

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        className='fixed inset-0 bg-black/70 z-50 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-auto md:w-full md:max-w-lg z-50 overflow-y-auto max-h-[calc(100vh-32px)]'>
        <div className='bg-[var(--bc-bg-secondary)] rounded-2xl overflow-hidden shadow-2xl'>
          {/* Header */}
          <div className='relative px-4 py-4 border-b border-[var(--bc-border)] flex items-center justify-center'>
            <h2 className='text-white font-semibold text-lg'>Withdraw</h2>
            <button
              onClick={onClose}
              className='absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-[var(--bc-text-secondary)] hover:text-white hover:bg-[var(--bc-bg-tertiary)] transition-colors'
            >
              <IoClose className='text-xl' />
            </button>
          </div>

          <div className='p-4'>
            {/* Secure Badge */}
            <div className='flex justify-center mb-4'>
              <div className='inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm'>
                <IoShieldCheckmark className='text-lg' />
                <span className='font-medium'>Secure Withdrawal</span>
                <span className='w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs'>✓</span>
              </div>
            </div>

            {/* Available Balance */}
            <div className='bg-[var(--bc-bg-tertiary)] rounded-lg p-3 mb-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <IoWallet className='text-[var(--bc-accent-green)] text-xl' />
                <span className='text-[var(--bc-text-secondary)] text-sm'>Available Balance</span>
              </div>
              <span className='text-white font-bold text-lg'>₦{formatAmount(wallet?.balance || 0)}</span>
            </div>

            {/* Bank Selection */}
            <div className='mb-4'>
              <label className='block text-[var(--bc-text-secondary)] text-sm mb-2'>
                Select Bank
              </label>
              <div className='relative'>
                <button
                  type='button'
                  onClick={() => setShowBankDropdown(!showBankDropdown)}
                  className='w-full bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg px-4 py-3 text-left text-white focus:border-[var(--bc-accent-green)] focus:outline-none transition-colors flex items-center justify-between'
                >
                  <span className={selectedBank ? 'text-white' : 'text-[var(--bc-text-secondary)]'}>
                    {selectedBank ? selectedBank.name : 'Select a bank'}
                  </span>
                  <svg className='w-4 h-4 text-[var(--bc-text-secondary)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>

                {showBankDropdown && (
                  <div className='absolute top-full left-0 right-0 mt-1 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg shadow-xl z-10 max-h-60 overflow-hidden'>
                    <div className='p-2 border-b border-[var(--bc-border)]'>
                      <input
                        type='text'
                        placeholder='Search banks...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full bg-[var(--bc-bg-secondary)] border border-[var(--bc-border)] rounded-lg px-3 py-2 text-sm text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:border-[var(--bc-accent-green)]'
                      />
                    </div>
                    <div className='max-h-48 overflow-y-auto'>
                      {banksLoading ? (
                        <div className='p-4 text-center text-[var(--bc-text-secondary)]'>
                          Loading banks...
                        </div>
                      ) : filteredBanks.length === 0 ? (
                        <div className='p-4 text-center text-[var(--bc-text-secondary)]'>
                          No banks found
                        </div>
                      ) : (
                        filteredBanks.map((bank) => (
                          <button
                            key={bank.code}
                            onClick={() => {
                              setSelectedBank(bank);
                              setShowBankDropdown(false);
                              setSearchQuery('');
                            }}
                            className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[var(--bc-border)] flex items-center justify-between ${
                              selectedBank?.code === bank.code ? 'bg-[var(--bc-border)] text-[var(--bc-accent-green)]' : 'text-white'
                            }`}
                          >
                            {bank.name}
                            {selectedBank?.code === bank.code && (
                              <IoCheckmarkCircle className='text-[var(--bc-accent-green)]' />
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Number */}
            <div className='mb-4'>
              <label className='block text-[var(--bc-text-secondary)] text-sm mb-2'>
                Account Number
              </label>
              <input
                type='text'
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
                className='w-full bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg px-4 py-3 text-white focus:border-[var(--bc-accent-green)] focus:outline-none transition-colors'
                placeholder='Enter 10-digit account number'
              />
            </div>

            {/* Account Name */}
            <div className='mb-4'>
              <label className='block text-[var(--bc-text-secondary)] text-sm mb-2'>
                Account Name
              </label>
              <div className='relative'>
                <input
                  type='text'
                  value={accountName}
                  disabled
                  className='w-full bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg px-4 py-3 text-white disabled:opacity-70'
                  placeholder={validatingAccount ? 'Validating...' : 'Account name will appear here'}
                />
                {validatingAccount && (
                  <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                    <div className='w-5 h-5 border-2 border-[var(--bc-accent-green)] border-t-transparent rounded-full animate-spin'></div>
                  </div>
                )}
                {accountName && !validatingAccount && (
                  <IoCheckmarkCircle className='absolute right-3 top-1/2 -translate-y-1/2 text-[var(--bc-accent-green)] text-xl' />
                )}
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
                  min={1000}
                  max={100000}
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

            {/* Info Banner */}
            <div className='bg-[var(--bc-bg-tertiary)] rounded-lg p-3 mb-4 flex items-center gap-3'>
              <span className='text-2xl'>⚡</span>
              <p className='text-sm text-[var(--bc-text-secondary)]'>
                Withdrawals are processed within <span className='text-white font-medium'>5-30 minutes</span>
              </p>
            </div>

            {/* Withdraw Button */}
            <button
              onClick={handleWithdraw}
              disabled={loading || !selectedBank || !accountName || amount < 1000}
              className={`w-full bc-button-primary py-3 text-sm font-semibold transition-opacity ${
                loading || !selectedBank || !accountName || amount < 1000 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className='flex items-center justify-center gap-2'>
                  <span className='w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin'></span>
                  Processing...
                </span>
              ) : (
                `Withdraw ₦${formatAmount(amount)}`
              )}
            </button>

            {/* Min/Max Notice */}
            <p className='text-center text-[var(--bc-text-muted)] text-xs mt-3'>
              Min: ₦1,000 • Max: ₦100,000
            </p>
          </div>
        </div>
      </div>

      {withdrawLoading && <OverlayLoader loaderText={loaderText} />}
    </>
  );
}
