'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/auth-context';

export function HeroBanner() {
  const router = useRouter();
  const { token } = useAuth();

  const handleJoinClick = () => {
    if (token) {
      router.push('/casino');
    } else {
      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'signup' } }));
    }
  };

  return (
    <section className='relative overflow-hidden mx-3 md:mx-4 mt-3 md:mt-4 rounded-xl md:rounded-2xl bg-[#323738]'>
      {/* Mobile Layout */}
      <div className='md:hidden relative w-full'>
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src='/images/banner.webp'
            alt='Background'
            fill
            priority
            className='object-cover object-right opacity-50'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-[#323738]/95 via-[#323738]/80 to-transparent' />
        </div>

        {/* Content */}
        <div className='relative z-10 flex items-center p-4 min-h-[140px]'>
          {/* Left: Logo */}
          <div className='flex-shrink-0 -ml-2'>
            <Image
              src='/images/banner_logo.webp'
              alt='RapidPlay'
              width={120}
              height={120}
              className='object-contain w-[100px] h-[100px]'
              priority
            />
          </div>

          {/* Right: Content */}
          <div className='flex-1 pl-2'>
            <h1 className='text-white text-base font-bold mb-1'>Play & Win Big</h1>
            <div className='bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 mb-2'>
              <p className='text-[var(--bc-text-secondary)] text-[10px]'>Sign Up & Get</p>
              <p className='text-white text-sm font-bold'>
                UP TO <span className='text-[var(--bc-accent-green)]'>₦100,000</span>
              </p>
              <p className='text-[var(--bc-text-secondary)] text-[10px]'>Bonus on First Deposit</p>
            </div>
            {!token && (
              <button
                onClick={handleJoinClick}
                className='bg-[var(--bc-accent-green)] hover:bg-[var(--bc-accent-green-dark)] text-black font-bold py-1.5 px-5 rounded-lg text-xs transition-colors'
              >
                Join Now
              </button>
            )}
          </div>

          {/* Partner Icon */}
          <div className='absolute right-2 top-2'>
            <Image
              src='/images/leister_icon.webp'
              alt='Partner'
              width={32}
              height={32}
              className='object-contain'
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden md:block relative w-full h-[210px] lg:h-[240px]'>
        <div className='absolute right-0 top-0 bottom-0 w-[55%]'>
          <Image
            src='/images/banner.webp'
            alt='Background'
            fill
            priority
            className='object-cover object-right rounded-r-2xl'
          />
        </div>

        <div className='absolute -left-4 lg:-left-2 top-1/2 -translate-y-1/2 z-10'>
          <Image
            src='/images/banner_logo.webp'
            alt='RapidPlay'
            width={320}
            height={320}
            className='object-contain w-[220px] h-[220px] lg:w-[280px] lg:h-[280px]'
            priority
          />
        </div>

        <div className='absolute left-[200px] lg:left-[260px] top-5 z-10'>
          <h1 className='text-white text-2xl lg:text-3xl font-bold'>Play & Win Big</h1>
        </div>

        <div className='absolute left-[200px] lg:left-[260px] top-[55px] lg:top-[65px] z-10'>
          <div className='bg-[#2E3233]/70 backdrop-blur-sm rounded-lg px-4 py-3'>
            <p className='text-[var(--bc-text-secondary)] text-sm'>Sign Up & Get</p>
            <p className='text-white text-lg lg:text-xl font-bold'>
              UP TO <span className='text-[var(--bc-accent-green)]'>₦100,000</span>
            </p>
            <p className='text-[var(--bc-text-secondary)] text-sm'>Bonus on First Deposit</p>
          </div>
        </div>

        {!token && (
          <div className='absolute left-[200px] lg:left-[260px] bottom-4 z-10'>
            <button
              onClick={handleJoinClick}
              className='bg-[var(--bc-accent-green)] hover:bg-[var(--bc-accent-green-dark)] text-black font-bold py-2.5 px-12 rounded-lg text-sm transition-colors'
            >
              Join Now
            </button>
          </div>
        )}

        <div className='absolute right-4 top-1/2 -translate-y-1/2 z-10'>
          <Image
            src='/images/leister_icon.webp'
            alt='Partner'
            width={80}
            height={80}
            className='object-contain w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]'
          />
        </div>
      </div>
    </section>
  );
}
