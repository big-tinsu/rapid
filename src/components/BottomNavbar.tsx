'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { IoSearch, IoHome, IoWallet, IoGift, IoPerson, IoLogOut } from 'react-icons/io5';
import { useAuth } from '@/contexts/auth-context';
import { useGame } from '@/hooks/useGame';

const Modal = dynamic(() => import('@/components/Modal'), { ssr: false });
const SearchComponent = dynamic(() => import('@/components/SearchComponent'), { ssr: false });
const DepositModal = dynamic(() => import('@/components/DepositModal').then(mod => ({ default: mod.DepositModal })), { ssr: false });
const ProfileModal = dynamic(() => import('@/components/ProfileModal').then(mod => ({ default: mod.ProfileModal })), { ssr: false });
const WithdrawModal = dynamic(() => import('@/components/WithdrawModal').then(mod => ({ default: mod.WithdrawModal })), { ssr: false });
const LogoutConfirmModal = dynamic(() => import('@/components/LogoutConfirmModal').then(mod => ({ default: mod.LogoutConfirmModal })), { ssr: false });

export default function BottomNavbar() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const { launchFreeSpin, closeGame } = useGame();

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Hide on auth pages
  if (router.pathname.startsWith('/auth/')) {
    return null;
  }

  const handleHomeClick = () => {
    closeGame();
    router.push('/casino');
  };

  const handleDepositClick = () => {
    if (token) {
      setShowDepositModal(true);
    } else {
      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'signin' } }));
    }
  };

  const handleFreeSpinClick = () => {
    if (token) {
      launchFreeSpin();
    } else {
      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'signin' } }));
    }
  };

  const handleProfileClick = () => {
    if (token) {
      setShowProfileModal(true);
    } else {
      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'signin' } }));
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      setShowLogoutModal(false);
      router.push('/casino');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Bottom Navigation */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f1419] border-t border-[var(--bc-border)] safe-area-bottom'>
        <div className='flex items-stretch h-14'>
          {/* Search */}
          <button
            onClick={() => setShowSearchModal(true)}
            className='flex-1 flex flex-col items-center justify-center gap-0.5 text-[var(--bc-text-secondary)] hover:text-white transition-colors'
          >
            <IoSearch className='text-xl' />
            <span className='text-[10px] font-medium'>Search</span>
          </button>

          {/* Home */}
          <button
            onClick={handleHomeClick}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive('/casino') ? 'text-[var(--bc-accent-green)]' : 'text-[var(--bc-text-secondary)] hover:text-white'
            }`}
          >
            <IoHome className='text-xl' />
            <span className='text-[10px] font-medium'>Home</span>
          </button>

          {/* Deposit */}
          <button
            onClick={handleDepositClick}
            className='flex-1 flex flex-col items-center justify-center gap-0.5 text-[var(--bc-text-secondary)] hover:text-white transition-colors'
          >
            <IoWallet className='text-xl' />
            <span className='text-[10px] font-medium'>Deposit</span>
          </button>

          {/* Free Spin - Highlighted */}
          <button
            onClick={handleFreeSpinClick}
            className='flex-1 flex flex-col items-center justify-center gap-0.5 bg-gradient-to-t from-orange-600 to-orange-500 text-white'
          >
            <IoGift className='text-xl' />
            <span className='text-[10px] font-medium'>Free Spin</span>
          </button>

          {/* Profile / Logout */}
          {token ? (
            <button
              onClick={handleLogoutClick}
              className='flex-1 flex flex-col items-center justify-center gap-0.5 text-[var(--bc-text-secondary)] hover:text-white transition-colors'
            >
              <IoLogOut className='text-xl' />
              <span className='text-[10px] font-medium'>Logout</span>
            </button>
          ) : (
            <button
              onClick={handleProfileClick}
              className='flex-1 flex flex-col items-center justify-center gap-0.5 text-[var(--bc-text-secondary)] hover:text-white transition-colors'
            >
              <IoPerson className='text-xl' />
              <span className='text-[10px] font-medium'>Profile</span>
            </button>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      {showSearchModal && (
        <Modal title="Search Games" onClose={() => setShowSearchModal(false)}>
          <SearchComponent onClose={() => setShowSearchModal(false)} />
        </Modal>
      )}

      {/* Deposit Modal */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onOpenDeposit={() => {
          setShowProfileModal(false);
          setShowDepositModal(true);
        }}
        onOpenWithdraw={() => {
          setShowProfileModal(false);
          setShowWithdrawModal(true);
        }}
      />

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        loading={logoutLoading}
      />
    </>
  );
}
