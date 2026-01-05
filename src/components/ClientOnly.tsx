import { useState, useEffect, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * ClientOnly component prevents hydration issues by only rendering its children on the client side.
 * On the server, it will render nothing (or an optional fallback).
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // On the server or during hydration, render fallback (if provided) or nothing
  if (!mounted) return <>{fallback}</>
  
  // On the client, after hydration, render children
  return <>{children}</>
} 