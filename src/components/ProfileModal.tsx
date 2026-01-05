'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IoClose, IoHeart, IoTrophy, IoStatsChart, IoWallet, IoLogOut } from 'react-icons/io5';
import { useAuth } from '@/contexts/auth-context';
import { Profile as ProfileType } from '@/types/new/auth';
import Loading from '@/components/loading/Loading';
import dynamic from 'next/dynamic';

const LogoutConfirmModal = dynamic(() => import('@/components/LogoutConfirmModal').then(mod => ({ default: mod.LogoutConfirmModal })), { ssr: false });

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDeposit?: () => void;
  onOpenWithdraw?: () => void;
}

const medalSlots = [
  { id: 1, icon: '🏅', color: 'from-yellow-600 to-yellow-400', unlocked: false },
  { id: 2, icon: '🏅', color: 'from-yellow-600 to-yellow-400', unlocked: false },
  { id: 3, icon: '🏅', color: 'from-green-600 to-green-400', unlocked: false },
  { id: 4, icon: '🏅', color: 'from-orange-600 to-orange-400', unlocked: false },
  { id: 5, icon: '🏅', color: 'from-yellow-600 to-yellow-400', unlocked: false },
  { id: 6, icon: '🏅', color: 'from-yellow-600 to-yellow-400', unlocked: false },
  { id: 7, icon: '🏅', color: 'from-red-600 to-red-400', unlocked: false },
  { id: 8, icon: '🏅', color: 'from-yellow-600 to-yellow-400', unlocked: false },
];

export function ProfileModal({ isOpen, onClose, onOpenDeposit, onOpenWithdraw }: ProfileModalProps) {
  const router = useRouter();
  const { profile, wallet, getProfile, getWallet, logout } = useAuth();
  const [userData, setUserData] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      setShowLogoutModal(false);
      onClose();
      router.push('/casino');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (isOpen) {
        setIsLoading(true);
        try {
          const profileData = await getProfile();
          if (profileData) {
            setUserData(profileData);
          }
          await getWallet();
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [isOpen]);

  if (!isOpen) return null;

  // Use fetched data or profile from context
  const displayData = userData || profile;
  const displayName = displayData?.firstName || displayData?.lastName
    ? `${displayData.firstName || ''} ${displayData.lastName || ''}`.trim()
    : 'User';
  const userId = displayData?.id || 'N/A';
  const walletBalance = wallet?.balance || 0;

  return (
    <>
      <div
        className='fixed inset-0 bg-black/70 z-50 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-auto md:w-full md:max-w-lg z-50 overflow-y-auto max-h-[calc(100vh-32px)]'>
        <div className='bg-[var(--bc-bg-secondary)] rounded-2xl overflow-hidden shadow-2xl'>
          <div className='relative px-4 py-4 border-b border-[var(--bc-border)] flex items-center justify-center'>
            <h2 className='text-white font-semibold text-lg'>My Profile</h2>
            <button
              onClick={onClose}
              className='absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-[var(--bc-text-secondary)] hover:text-white hover:bg-[var(--bc-bg-tertiary)] transition-colors'
            >
              <IoClose className='text-xl' />
            </button>
          </div>

          {isLoading ? (
            <div className='p-8 flex items-center justify-center'>
              <Loading />
            </div>
          ) : (
            <div className='p-4'>
              <div className='flex flex-col items-center mb-6'>
                <div className='w-full flex items-center justify-center mb-4'>
                  <div className='flex items-center gap-1 text-red-400'>
                    <IoHeart className='text-lg' />
                    <span className='text-white text-sm'>0</span>
                  </div>
                </div>

                <div className='relative mb-3'>
                  <div className='w-20 h-20 rounded-full overflow-hidden bg-[var(--bc-bg-tertiary)] border-2 border-[var(--bc-border)]'>
                    <div className='w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-3xl'>
                      {displayData?.firstName?.[0]?.toUpperCase() || '🦖'}
                    </div>
                  </div>
                  <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#1a1d1f] text-white text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--bc-border)]'>
                    VIP0
                  </div>
                </div>

                <h3 className='text-white font-bold text-lg mb-1'>{displayName}</h3>
                <p className='text-[var(--bc-text-muted)] text-sm'>User ID: {userId}</p>
              </div>

              <div className='bg-[var(--bc-bg-tertiary)] rounded-xl p-4 mb-4'>
                <div className='flex items-center gap-2 mb-3'>
                  <IoTrophy className='text-yellow-400 text-lg' />
                  <span className='text-white font-medium'>Medals 0</span>
                </div>
                <div className='grid grid-cols-8 gap-2'>
                  {medalSlots.map((medal) => (
                    <div
                      key={medal.id}
                      className='aspect-square rounded-lg overflow-hidden'
                    >
                      <div className={`w-full h-full bg-gradient-to-b ${medal.color} flex items-center justify-center opacity-60`}>
                        <span className='text-lg'>{medal.icon}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-[var(--bc-bg-tertiary)] rounded-xl p-4 mb-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <IoStatsChart className='text-[var(--bc-accent-green)] text-lg' />
                  <span className='text-white font-medium'>Statistics</span>
                </div>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div className='text-center'>
                    <div className='flex items-center justify-center gap-2 text-[var(--bc-text-muted)] text-xs mb-1'>
                      <IoTrophy className='text-yellow-400' />
                      <span>Total Wins</span>
                    </div>
                    <p className='text-white font-bold text-lg'>0</p>
                  </div>
                  <div className='text-center'>
                    <div className='flex items-center justify-center gap-2 text-[var(--bc-text-muted)] text-xs mb-1'>
                      <span className='text-blue-400'>🎯</span>
                      <span>Total Bet Counts</span>
                    </div>
                    <p className='text-white font-bold text-lg'>0</p>
                  </div>
                </div>
                <div className='bg-[var(--bc-bg-secondary)] rounded-xl p-4 text-center'>
                  <div className='flex items-center justify-center gap-2 text-[var(--bc-text-muted)] text-xs mb-1'>
                    <IoWallet className='text-[var(--bc-accent-green)]' />
                    <span>Wallet Balance</span>
                  </div>
                  <p className='text-white font-bold text-xl'>NGN {walletBalance.toLocaleString()}</p>
                </div>
              </div>

              <div className='bg-[var(--bc-bg-tertiary)] rounded-xl p-4 mb-4'>
                <h4 className='text-white font-medium mb-4'>Top 3 Favorite Games</h4>
                <div className='flex flex-col items-center justify-center py-8'>
                  <div className='w-32 h-32 mb-4 opacity-50'>
                    <svg viewBox='0 0 100 100' className='w-full h-full text-[var(--bc-text-muted)]'>
                      <ellipse cx='50' cy='85' rx='30' ry='10' fill='currentColor' opacity='0.3' />
                      <circle cx='50' cy='50' r='25' fill='currentColor' opacity='0.2' />
                      <circle cx='42' cy='42' r='4' fill='currentColor' />
                      <circle cx='58' cy='42' r='4' fill='currentColor' />
                      <circle cx='42' cy='43' r='1.5' fill='white' />
                      <circle cx='58' cy='43' r='1.5' fill='white' />
                    </svg>
                  </div>
                  <p className='text-[var(--bc-text-muted)] text-sm italic'>Stay tuned—something&apos;s coming!</p>
                </div>
              </div>

              <div className='text-center mb-6'>
                <p className='text-[var(--bc-text-muted)] text-sm'>Welcome to RapidPlay!</p>
              </div>

              <div className='grid grid-cols-2 gap-3 mb-3'>
                <button
                  onClick={() => {
                    onClose();
                    onOpenDeposit?.();
                  }}
                  className='bc-button-primary py-3 text-sm font-semibold'
                >
                  Deposit
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenWithdraw?.();
                  }}
                  className='bc-button-secondary py-3 text-sm font-semibold border border-[var(--bc-border)]'
                >
                  Withdraw
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogoutClick}
                className='w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors'
              >
                <IoLogOut className='text-lg' />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

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
