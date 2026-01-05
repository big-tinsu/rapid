'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { SendOTP as SendOTPComponent } from '@/components/auth/SendOTP'
import Modal from '@/components/Modal'
import EnterEmailCode from '@/components/auth/EnterEmailCode'

export function SendOTP() {
  const router = useRouter()
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [email, setEmail] = useState('')

  // Get email from session storage if coming from registration
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email')
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleSuccess = () => {
    setShowVerifyModal(true)
  }

  const handleVerificationSuccess = () => {
    router.push('/auth/login')
  }

  const handleBack = () => {
    router.push('/auth/register')
  }

  return (
    <div className="px-4 mx-auto w-full max-w-[350px] md:max-w-[500px] screen-margin-bottom">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back to Register
        </button>
        <h1 className="text-2xl font-bold">Resend OTP</h1>
      </div>
      
      <SendOTPComponent 
        initialEmail={email} 
        onSuccess={handleSuccess} 
      />

      {showVerifyModal && <Modal title="Verify Email" onClose={() => setShowVerifyModal(false)}>
        <EnterEmailCode
          email={email}
          onClose={() => setShowVerifyModal(false)}
          onSuccess={handleVerificationSuccess}
        />
      </Modal>}
    </div>
  )
}
