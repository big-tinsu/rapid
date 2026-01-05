'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoClose, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useAuth } from '@/contexts/auth-context';
import { register, verifyOTP, resendCode } from '@/actions/auth';
import { toastAtom } from '@/global-state/toast.atom';
import { useSetRecoilState } from '@/libs/recoil';
import { RegisterDto } from '@/types/new/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const { login } = useAuth();
  const setToast = useSetRecoilState(toastAtom);

  const [mode, setMode] = useState<'signin' | 'signup' | 'verify'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign In fields
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  // OTP Verification
  const [otp, setOtp] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');

  // Reset form when mode changes
  useEffect(() => {
    setError('');
  }, [mode]);

  // Reset mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const isSignIn = mode === 'signin';
  const isSignUp = mode === 'signup';
  const isVerify = mode === 'verify';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await login({
        to: emailOrUsername,
        password,
      });

      if (!response.isVerified) {
        setVerifyEmail(emailOrUsername);
        setMode('verify');
        setLoading(false);
        return;
      }

      setToast({
        showToast: true,
        toastObj: {
          type: 'success',
          description: 'Successfully logged in!',
        },
      });

      onClose();
      // Refresh to update UI with logged in state
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Login failed');

      if (err.message?.includes('account is not activated')) {
        setVerifyEmail(emailOrUsername);
        setMode('verify');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !email || !phone || !signupPassword) {
      setError('Please fill all required fields');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');

    const data: RegisterDto = {
      email,
      phoneNumber: phone.replace(/\s+/g, ''),
      firstName,
      lastName,
      password: signupPassword,
      username,
    };

    if (referralCode) {
      data.referrerCode = referralCode;
    }

    try {
      await register(data);

      setToast({
        showToast: true,
        toastObj: {
          type: 'success',
          description: 'Account created! Please verify your email.',
        },
      });

      setVerifyEmail(email);
      setMode('verify');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyOTP({
        otp,
        email: verifyEmail,
      });

      setToast({
        showToast: true,
        toastObj: {
          type: 'success',
          description: 'Email verified! Please sign in.',
        },
      });

      // Reset and go to sign in
      setOtp('');
      setMode('signin');
      setEmailOrUsername(verifyEmail);
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendCode({ email: verifyEmail });
      setToast({
        showToast: true,
        toastObj: {
          type: 'success',
          description: 'Verification code sent!',
        },
      });
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/70 z-50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed inset-2 sm:inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-auto md:w-full md:max-w-4xl z-50 overflow-y-auto max-h-[calc(100vh-16px)] sm:max-h-[calc(100vh-32px)] md:max-h-[90vh]'>
        <div className='bg-[var(--bc-bg-secondary)] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl min-h-full md:min-h-0'>
          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/30 text-white/70 hover:text-white hover:bg-black/50 transition-colors'
          >
            <IoClose className='text-lg sm:text-xl' />
          </button>

          {/* Two Column Layout */}
          <div className='grid grid-cols-1 lg:grid-cols-2 min-h-[450px] sm:min-h-[500px] lg:min-h-[580px]'>
            {/* Left Column - Image (hidden on mobile) */}
            <div className='relative hidden lg:block bg-[#1a1d1f]'>
              {/* Background Image */}
              <Image
                src="/images/auth-bg.webp"
                alt="OneRapidPlay"
                fill
                className='object-cover object-top'
                priority
              />

              {/* Content Overlay */}
              <div className='absolute inset-0 flex flex-col'>
                {/* Logo at top */}
                <div className='p-6'>
                  <Image
                    src="/assets/images/white_logo.png"
                    alt="OneRapidPlay"
                    width={140}
                    height={36}
                    className="object-contain"
                  />
                </div>

                {/* Bottom content */}
                <div className='mt-auto bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pt-16'>
                  {/* Promo badges */}
                  <div className='flex justify-between gap-2 mb-6'>
                    <div className='flex-1 text-center'>
                      <div className='text-yellow-400 text-lg mb-1'>👑</div>
                      <div className='text-[var(--bc-accent-green)] font-bold text-lg'>470%</div>
                      <div className='text-white/60 text-xs'>Welcome deposit bonus</div>
                    </div>
                    <div className='flex-1 text-center border-x border-white/20'>
                      <div className='text-yellow-400 text-lg mb-1'>🎰</div>
                      <div className='text-[var(--bc-accent-green)] font-bold text-lg'>5 BTC</div>
                      <div className='text-white/60 text-xs'>Free daily lucky spin</div>
                    </div>
                    <div className='flex-1 text-center'>
                      <div className='text-yellow-400 text-lg mb-1'>🎁</div>
                      <div className='text-[var(--bc-accent-green)] font-bold text-lg'>Free Perks</div>
                      <div className='text-white/60 text-xs'>Daily free rewards & bonuses</div>
                    </div>
                  </div>

                  {/* Main text */}
                  <h2 className='text-white text-3xl font-bold mb-2'>Stay Untamed</h2>
                  <p className='text-white/70 text-sm'>Sign Up & Get Welcome Bonus</p>
                </div>
              </div>
            </div>

            {/* Right Column - Forms */}
            <div className='p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col overflow-y-auto max-h-[calc(100vh-32px)] sm:max-h-[calc(90vh-32px)] lg:max-h-[580px]'>
              {/* Mobile promo banner (shown only on mobile) */}
              <div className='lg:hidden mb-2 sm:mb-3 p-2 sm:p-3 bg-gradient-to-r from-[#1a2c1a] to-[#1a2520] rounded-lg sm:rounded-xl'>
                <h3 className='text-white font-bold text-xs sm:text-sm mb-1'>Stay Untamed</h3>
                <div className='flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs'>
                  <span className='flex items-center gap-1'>
                    <span className='text-[var(--bc-accent-green)] font-bold'>470%</span>
                    <span className='text-white/80'>Bonus</span>
                  </span>
                  <span className='flex items-center gap-1'>
                    <span className='text-[var(--bc-accent-green)] font-bold'>5 BTC</span>
                    <span className='text-white/80'>Lucky spin</span>
                  </span>
                  <span className='flex items-center gap-1'>
                    <span className='text-[var(--bc-accent-green)] font-bold'>Free</span>
                    <span className='text-white/80'>Perks</span>
                  </span>
                </div>
              </div>

              {/* Logo - only on mobile/tablet, hidden on desktop since it's on left panel */}
              <div className='flex items-center gap-2 mb-2 sm:mb-3 lg:hidden'>
                <Image
                  src="/assets/images/white_logo.png"
                  alt="OneRapidPlay"
                  width={120}
                  height={30}
                  className="object-contain"
                />
              </div>

              {/* Mode Tabs (only for signin/signup) */}
              {!isVerify && (
                <div className='flex gap-2 mb-3 sm:mb-4'>
                  <button
                    onClick={() => setMode('signin')}
                    className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-colors ${
                      isSignIn
                        ? 'bg-[var(--bc-accent-green)] text-black'
                        : 'bg-[var(--bc-bg-tertiary)] text-[var(--bc-text-secondary)] hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-colors ${
                      isSignUp
                        ? 'bg-[var(--bc-accent-green)] text-black'
                        : 'bg-[var(--bc-bg-tertiary)] text-[var(--bc-text-secondary)] hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className='mb-3 sm:mb-4 p-2 sm:p-3 bg-red-500/20 border border-red-500/50 rounded-lg'>
                  <p className='text-red-400 text-xs sm:text-sm'>{error}</p>
                </div>
              )}

              {/* Sign In Form */}
              {isSignIn && (
                <form onSubmit={handleSignIn} className='space-y-3 sm:space-y-4 flex-1'>
                  <div>
                    <label className='block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2'>
                      Email / Phone Number / Username
                    </label>
                    <input
                      type='text'
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      placeholder='Email / Phone / Username'
                      className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm'
                    />
                  </div>

                  <div>
                    <label className='block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2'>
                      Password
                    </label>
                    <div className='relative'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm pr-10 sm:pr-12'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-[var(--bc-text-secondary)] hover:text-white'
                      >
                        {showPassword ? <IoEyeOffOutline className='text-lg sm:text-xl' /> : <IoEyeOutline className='text-lg sm:text-xl' />}
                      </button>
                    </div>
                  </div>

                  <div className='text-right'>
                    <button
                      type='button'
                      className='text-[var(--bc-accent-green)] hover:underline text-xs sm:text-sm font-medium'
                    >
                      Forgot your password?
                    </button>
                  </div>

                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full bc-button-primary py-2.5 sm:py-3 text-xs sm:text-sm font-semibold disabled:opacity-50'
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              )}

              {/* Sign Up Form */}
              {isSignUp && (
                <form onSubmit={handleSignUp} className='space-y-1.5 sm:space-y-2 flex-1'>
                  <div className='grid grid-cols-2 gap-1.5 sm:gap-2'>
                    <div>
                      <label className='block text-white text-[10px] sm:text-xs font-medium mb-1'>First Name</label>
                      <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='John'
                        className='w-full px-2.5 sm:px-3 py-2 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm'
                      />
                    </div>
                    <div>
                      <label className='block text-white text-[10px] sm:text-xs font-medium mb-1'>Last Name</label>
                      <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Doe'
                        className='w-full px-2.5 sm:px-3 py-2 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-white text-[10px] sm:text-xs font-medium mb-1'>Username</label>
                    <input
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='Choose a username'
                      className='w-full px-2.5 sm:px-3 py-2 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm'
                    />
                  </div>

                  <div>
                    <label className='block text-white text-[10px] sm:text-xs font-medium mb-1'>Email</label>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email'
                      className='w-full px-2.5 sm:px-3 py-2 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm'
                    />
                  </div>

                  <div>
                    <label className='block text-white text-[10px] sm:text-xs font-medium mb-1'>Phone Number</label>
                    <input
                      type='tel'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='+234 800 000 0000'
                      className='w-full px-2.5 sm:px-3 py-2 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm'
                    />
                  </div>

                  <div>
                    <label className='block text-white text-[10px] sm:text-xs font-medium mb-1'>Password</label>
                    <div className='relative'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder='Create a password'
                        className='w-full px-2.5 sm:px-3 py-2 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm pr-9 sm:pr-10'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-[var(--bc-text-secondary)] hover:text-white'
                      >
                        {showPassword ? <IoEyeOffOutline className='text-base sm:text-lg' /> : <IoEyeOutline className='text-base sm:text-lg' />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className='block text-white text-[10px] sm:text-xs font-medium mb-1'>
                      Referral Code <span className='text-[var(--bc-text-secondary)]'>(Optional)</span>
                    </label>
                    <input
                      type='text'
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder='Optional'
                      className='w-full px-2.5 sm:px-3 py-2 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-xs sm:text-sm'
                    />
                  </div>

                  <div className='pt-1'>
                    <label className='flex items-start gap-2 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className='mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 accent-[var(--bc-accent-green)] rounded'
                      />
                      <span className='text-[var(--bc-text-secondary)] text-[10px] sm:text-xs'>
                        I agree to the{' '}
                        <a href='/terms-and-conditions' className='text-[var(--bc-accent-green)] hover:underline'>User Agreement</a> &
                        confirm I am at least 18 years old
                      </span>
                    </label>
                  </div>

                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full bc-button-primary py-2 sm:py-2.5 text-xs sm:text-sm font-semibold disabled:opacity-50 mt-1 sm:mt-2'
                  >
                    {loading ? 'Creating account...' : 'Sign Up'}
                  </button>
                </form>
              )}

              {/* Verify OTP Form */}
              {isVerify && (
                <form onSubmit={handleVerifyOTP} className='space-y-4 flex-1'>
                  <div className='text-center mb-4'>
                    <h3 className='text-white text-lg font-semibold mb-2'>Verify Your Email</h3>
                    <p className='text-[var(--bc-text-secondary)] text-sm'>
                      Enter the code sent to <span className='text-white'>{verifyEmail}</span>
                    </p>
                  </div>

                  <div>
                    <input
                      type='text'
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder='Enter verification code'
                      className='w-full px-4 py-3 bg-[var(--bc-bg-tertiary)] border border-[var(--bc-border)] rounded-lg text-white placeholder-[var(--bc-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--bc-accent-green)] text-center text-lg tracking-widest'
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full bc-button-primary py-3 text-sm font-semibold disabled:opacity-50'
                  >
                    {loading ? 'Verifying...' : 'Verify Email'}
                  </button>

                  <div className='text-center'>
                    <button
                      type='button'
                      onClick={handleResendCode}
                      className='text-[var(--bc-accent-green)] hover:underline text-sm'
                    >
                      Resend Code
                    </button>
                  </div>

                  <div className='text-center pt-2'>
                    <button
                      type='button'
                      onClick={() => setMode('signin')}
                      className='text-[var(--bc-text-secondary)] hover:text-white text-sm'
                    >
                      ← Back to Sign In
                    </button>
                  </div>
                </form>
              )}


            </div>
          </div>
        </div>
      </div>
    </>
  );
}
