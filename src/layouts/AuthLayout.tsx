import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import GameProvider from "@/providers/GameProvider";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/auth/login";
  const isRegisterPage = router.pathname === "/auth/register";

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bc-bg-primary)]">
      <GameProvider>
        {/* Auth Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bc-bg-primary)] border-b border-[var(--bc-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/casino" className="cursor-pointer">
                  <img
                    src="/assets/images/white_logo.png"
                    alt="OneRapidPlay"
                    className="h-5"
                  />
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isLoginPage
                      ? "bg-[var(--bc-bg-tertiary)] text-white"
                      : "text-[var(--bc-text-secondary)] hover:text-white bg-[var(--bc-bg-secondary)]"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isRegisterPage
                      ? "bc-button-primary"
                      : "bc-button-primary"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Add spacing for fixed navbar */}
        <div className="h-16" />

        <main className="flex-grow flex justify-center items-center py-8">
          <div className="w-full max-w-md px-4">{children}</div>
        </main>

        {/* Simple Footer */}
        <footer className="py-6 border-t border-[var(--bc-border)] bg-[var(--bc-bg-secondary)]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[var(--bc-text-secondary)] text-sm">
              © 2024 OneRapidPlay. All rights reserved.
            </p>
          </div>
        </footer>
      </GameProvider>
    </div>
  );
}
