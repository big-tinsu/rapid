'use client';

import { IoClose } from 'react-icons/io5';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function LogoutConfirmModal({ isOpen, onClose, onConfirm, loading }: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[60]'>
        <div className='bg-[#1e2124] rounded-2xl overflow-hidden shadow-2xl'>
          {/* Header */}
          <div className='relative px-4 py-4 flex items-center justify-center border-b border-[var(--bc-border)]'>
            <h2 className='text-white font-semibold text-lg'>Signing Out</h2>
            <button
              onClick={onClose}
              className='absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bc-bg-tertiary)] text-[var(--bc-text-secondary)] hover:text-white hover:bg-[var(--bc-border)] transition-colors'
            >
              <IoClose className='text-xl' />
            </button>
          </div>

          {/* Content */}
          <div className='p-6'>
            <p className='text-[var(--bc-text-secondary)] text-center text-sm mb-6'>
              Are you sure you want to log out? Check our great promotions and bonuses before you leave!
            </p>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <button
                onClick={onClose}
                disabled={loading}
                className='flex-1 py-3 px-4 bg-[var(--bc-bg-tertiary)] text-white rounded-lg font-semibold text-sm hover:bg-[var(--bc-border)] transition-colors disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className='flex-1 py-3 px-4 bg-gradient-to-r from-[var(--bc-accent-green)] to-[#7ceb8b] text-black rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50'
              >
                {loading ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
