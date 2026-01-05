'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoWalletOutline, IoChevronDown } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { formatCurrency } from '@/utils/currency';
import dynamic from 'next/dynamic';

// Dynamic imports for modals to prevent SSR issues
const Modal = dynamic(() => import('@/components/Modal'), { ssr: false });
const DepositModal = dynamic(() => import('@/components/DepositModal').then(mod => ({ default: mod.DepositModal })), { ssr: false });
const WithdrawModal = dynamic(() => import('@/components/WithdrawModal').then(mod => ({ default: mod.WithdrawModal })), { ssr: false });
const ProfileModal = dynamic(() => import('@/components/ProfileModal').then(mod => ({ default: mod.ProfileModal })), { ssr: false });
const AuthModal = dynamic(() => import('@/components/AuthModal').then(mod => ({ default: mod.AuthModal })), { ssr: false });

interface TopNavProps {
  sidebarCollapsed: boolean;
}

export function TopNav({ sidebarCollapsed }: TopNavProps) {
  const router = useRouter();
  const { token, profile, wallet, getWallet } = useAuth();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [walletLoading, setWalletLoading] = useState(false);

  const isLoggedIn = !!token;
  const balance = wallet?.balance || 0;

  // Listen for global openAuthModal event (from sidebar, hero banner, etc.)
  useEffect(() => {
    const handleOpenAuthModal = (e: CustomEvent<{ mode?: 'signin' | 'signup' }>) => {
      setAuthModalMode(e.detail?.mode || 'signin');
      setAuthModalOpen(true);
    };

    window.addEventListener('openAuthModal', handleOpenAuthModal as EventListener);
    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal as EventListener);
    };
  }, []);

  // Fetch wallet on mount if logged in
  useEffect(() => {
    const fetchWallet = async () => {
      if (token && !wallet) {
        setWalletLoading(true);
        await getWallet();
        setWalletLoading(false);
      }
    };
    fetchWallet();
  }, [token, wallet, getWallet]);

  const handleSignIn = () => {
    setAuthModalMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  const handleAvatarClick = () => {
    if (isLoggedIn) {
      setProfileModalOpen(true);
    } else {
      handleSignIn();
    }
  };

  const handleDepositClick = () => {
    if (isLoggedIn) {
      setDepositModalOpen(true);
    } else {
      handleSignIn();
    }
  };

  const handleReload = async () => {
    await getWallet();
  };

  return (
    <>
      <header
        className={`hidden md:flex fixed top-0 right-0 h-16 bg-[var(--bc-bg-primary)] border-b border-[var(--bc-border)] z-30 items-center px-4 gap-4 main-transition ${
          sidebarCollapsed ? 'left-[70px]' : 'left-64'
        }`}
      >
        <div className='flex-1' />

        <div className='flex items-center gap-3 ml-auto'>
          {isLoggedIn ? (
            <>
              <div className='flex items-center gap-2 bg-[var(--bc-bg-secondary)] rounded-lg px-3 py-2'>
                <span className='text-lg'>🇳🇬</span>
                <span className='text-white font-medium text-sm'>
                  {walletLoading ? '...' : formatCurrency(balance)}
                </span>
                <IoChevronDown className='text-[var(--bc-text-secondary)] text-sm' />
              </div>

              <button
                onClick={() => setWithdrawModalOpen(true)}
                className='bc-button-primary py-2 px-5 text-sm'
              >
                Withdraw
              </button>

              <button
                onClick={handleDepositClick}
                className='py-2 px-5 text-sm bg-[var(--bc-bg-secondary)] text-white rounded-lg hover:bg-[var(--bc-border)] transition-colors font-medium'
              >
                Deposit
              </button>

              <button
                onClick={() => setDepositModalOpen(true)}
                className='p-2 text-[var(--bc-text-secondary)] hover:text-white transition-colors'
              >
                <IoWalletOutline className='text-xl' />
              </button>

              <button
                onClick={handleAvatarClick}
                className='w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-[var(--bc-accent-green)] transition-all'
              >
                <span className='text-lg'>{profile?.firstName?.[0] || '🦖'}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                className='text-white hover:text-white/80 transition-colors text-sm font-medium px-4 py-2 bg-[var(--bc-bg-secondary)] rounded-lg'
              >
                Sign In
              </button>

              <button
                onClick={handleSignUp}
                className='bc-button-primary py-2 px-5 text-sm'
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      <header className='md:hidden fixed top-0 left-0 right-0 h-14 bg-[var(--bc-bg-primary)] border-b border-[var(--bc-border)] z-30 flex items-center justify-between px-3'>
        <Link href="/casino" className='flex-shrink-0'>
          <Image
            src="/assets/images/white_logo.png"
            alt="OneRapidPlay"
            width={80}
            height={20}
            className="object-contain h-5 w-auto"          />
        </Link>

        <div className='flex items-center gap-1.5'>
          {isLoggedIn ? (
            <>
              <div className='flex items-center gap-1 bg-[var(--bc-bg-secondary)] rounded-lg px-2 py-1.5'>
                <span className='text-xs'>🇳🇬</span>
                <span className='text-white font-medium text-xs'>
                  {walletLoading ? '...' : formatCurrency(balance)}
                </span>
              </div>

              <button
                onClick={handleDepositClick}
                className='bc-button-primary py-1.5 px-2.5 text-[10px]'
              >
                Deposit
              </button>

              <button
                onClick={handleAvatarClick}
                className='w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center overflow-hidden flex-shrink-0'
              >
                <span className='text-sm'>{profile?.firstName?.[0] || '🦖'}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                className='text-white text-xs font-medium px-3 py-1.5 bg-[var(--bc-bg-secondary)] rounded-lg'
              >
                Sign In
              </button>

              <button
                onClick={handleSignUp}
                className='bc-button-primary py-1.5 px-3 text-xs'
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* Deposit Modal - New UI */}
      <DepositModal
        isOpen={depositModalOpen}
        onClose={() => setDepositModalOpen(false)}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onOpenDeposit={() => setDepositModalOpen(true)}
        onOpenWithdraw={() => setWithdrawModalOpen(true)}
      />

      {/* Withdraw Modal - New UI */}
      <WithdrawModal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
