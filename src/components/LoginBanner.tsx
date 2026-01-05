'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '@/contexts/auth-context';
import dynamic from 'next/dynamic';

const AuthModal = dynamic(() => import('@/components/AuthModal').then(mod => ({ default: mod.AuthModal })), { ssr: false });

export function LoginBanner() {
  const { token } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Don't show if logged in or dismissed
  if (token || dismissed) return null;

  const handleSignIn = () => {
    setAuthModalMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  return (
    <>
      <div className='bg-gradient-to-r from-[var(--bc-accent-green)]/20 to-[var(--bc-bg-secondary)] border-b border-[var(--bc-accent-green)]/30 px-4 py-3'>
        <div className='flex items-center justify-between gap-4 max-w-7xl mx-auto'>
          <div className='flex items-center gap-3 flex-1'>
            <span className='text-2xl'>🎰</span>
            <div className='flex-1'>
              <p className='text-white text-sm font-medium'>
                Sign in to access all features
              </p>
              <p className='text-[var(--bc-text-secondary)] text-xs'>
                Deposit, play games, and win big!
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={handleSignIn}
              className='text-white text-xs font-medium px-3 py-1.5 bg-[var(--bc-bg-tertiary)] hover:bg-[var(--bc-border)] rounded-lg transition-colors'
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className='bc-button-primary py-1.5 px-3 text-xs'
            >
              Sign Up
            </button>
            <button
              onClick={() => setDismissed(true)}
              className='p-1 text-[var(--bc-text-secondary)] hover:text-white transition-colors ml-2'
            >
              <IoClose className='text-lg' />
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
