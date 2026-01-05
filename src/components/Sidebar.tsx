'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import {
  IoPlay,
  IoApps,
  IoFlame,
  IoGift,
  IoTrophy,
  IoShield,
  IoHelpCircle,
  IoWallet,
  IoDocumentText,
  IoPerson,
  IoLogoWhatsapp,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoHome,
  IoRefresh,
} from 'react-icons/io5';
import { useAuth } from '@/contexts/auth-context';
import dynamic from 'next/dynamic';

const LogoutConfirmModal = dynamic(() => import('@/components/LogoutConfirmModal').then(mod => ({ default: mod.LogoutConfirmModal })), { ssr: false });

interface MenuItem {
  label: string;
  href?: string;
  categoryId?: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface MenuSection {
  title: string;
  icon: React.ReactNode;
  href?: string;
  items?: MenuItem[];
  isExpandable?: boolean;
  requiresAuth?: boolean;
}

// My Account items (requires auth)
const myAccountItems: MenuItem[] = [
  { label: 'Wallet', href: '/wallet', icon: <IoWallet className="text-lg" /> },
  { label: 'Profile', href: '/profile', icon: <IoPerson className="text-lg" /> },
  { label: 'Bet History', href: '/bets', icon: <IoTrophy className="text-lg" /> },
  { label: 'Promotions', href: '/promotions', icon: <IoGift className="text-lg" /> },
];

// Customer Service items
const customerServiceItems: MenuItem[] = [
  { label: 'WhatsApp', href: 'https://wa.me/2348000000000', icon: <IoLogoWhatsapp className="text-lg text-green-500" />, external: true },
];

// Company items
const companyItems: MenuItem[] = [
  { label: 'Terms & Conditions', href: '/terms-and-conditions', icon: <IoDocumentText className="text-lg" /> },
  { label: 'Refund Policy', href: '/refund-policy', icon: <IoRefresh className="text-lg" /> },
  { label: 'Privacy Policy', href: '/privacy-policy', icon: <IoShield className="text-lg" /> },
  { label: 'FAQs', href: '/faq', icon: <IoHelpCircle className="text-lg" /> },
];

// Social Media items
const socialMediaItems: MenuItem[] = [
  { label: 'Instagram', href: 'https://instagram.com/onerapidplay', icon: <IoLogoInstagram className="text-lg text-pink-500" />, external: true },
  { label: 'Twitter', href: 'https://twitter.com/onerapidplay', icon: <IoLogoTwitter className="text-lg text-blue-400" />, external: true },
  { label: 'Facebook', href: 'https://facebook.com/onerapidplay', icon: <IoLogoFacebook className="text-lg text-blue-600" />, external: true },
];

const menuSections: MenuSection[] = [
  {
    title: 'Home',
    icon: <IoHome className="text-xl" />,
    href: '/casino',
    isExpandable: false,
  },
  {
    title: 'Free Spin',
    icon: <IoGift className="text-xl text-orange-400" />,
    href: '/casino', // Will be spin wheel
    isExpandable: false,
  },
  {
    title: 'My Account',
    icon: <IoPerson className="text-xl text-orange-400" />,
    items: myAccountItems,
    isExpandable: true,
    requiresAuth: true,
  },
  {
    title: 'Customer Service',
    icon: <IoLogoWhatsapp className="text-xl text-green-500" />,
    items: customerServiceItems,
    isExpandable: true,
  },
  {
    title: 'Company',
    icon: <IoDocumentText className="text-xl" />,
    items: companyItems,
    isExpandable: true,
  },
  {
    title: 'Social Media',
    icon: <IoLogoInstagram className="text-xl text-pink-500" />,
    items: socialMediaItems,
    isExpandable: true,
  },
];

const collapsedIcons = [
  { icon: <IoHome className="text-xl" />, href: '/casino' },
  { icon: <IoGift className="text-xl text-orange-400" />, href: '/casino' },
  { icon: <IoPerson className="text-xl text-orange-400" />, href: '/profile' },
  { icon: <IoWallet className="text-xl text-green-400" />, href: '/wallet' },
  { icon: <IoHelpCircle className="text-xl" />, href: '/faq' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onCategoryChange?: (category: string) => void;
}

export function Sidebar({ isCollapsed, onToggle, onCategoryChange }: SidebarProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const { token, logout } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['My Account']));
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
      router.push('/casino');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const isItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  if (isCollapsed) {
    return (
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[70px] bg-[var(--bc-bg-primary)] z-40 flex-col items-center py-3 border-r border-[var(--bc-border)]">
        <button
          onClick={onToggle}
          className="w-10 h-10 rounded-xl bg-[var(--bc-bg-secondary)] flex items-center justify-center text-white mb-4 hover:bg-[var(--bc-border)] transition-colors"
        >
          <FiMenu className="text-lg" />
        </button>

        <div className="flex-1 flex flex-col gap-1 overflow-y-auto px-2">
          {collapsedIcons.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isItemActive(item.href)
                  ? 'bg-[var(--bc-accent-green)]/20 text-[var(--bc-accent-green)]'
                  : 'text-[var(--bc-text-secondary)] hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-[var(--bc-bg-primary)] z-40 flex-col overflow-hidden border-r border-[var(--bc-border)]">
      <div className="flex-shrink-0 flex items-center gap-3 px-3 py-3 border-b border-[var(--bc-border)]">
        <button
          onClick={onToggle}
          className="w-10 h-10 rounded-xl bg-[var(--bc-bg-secondary)] flex items-center justify-center text-white hover:bg-[var(--bc-border)] transition-colors"
        >
          <FiMenu className="text-lg" />
        </button>
        <Link href="/casino">
          <Image
            src="/assets/images/white_logo.png"
            alt="OneRapidPlay"
            width={120}
            height={32}
            className="object-contain"
          />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {menuSections.map((section) => {
            // Skip auth-required sections if not logged in
            if (section.requiresAuth && !token) {
              return null;
            }

            const isExpanded = expandedSections.has(section.title);
            const hasItems = section.items && section.items.length > 0;
            const isActive = section.href ? isItemActive(section.href) : false;

            return (
              <div key={section.title}>
                <button
                  onClick={() => {
                    if (hasItems) {
                      toggleSection(section.title);
                    } else if (section.href) {
                      router.push(section.href);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[var(--bc-bg-secondary)] text-[var(--bc-accent-green)]'
                      : 'text-white hover:bg-[var(--bc-bg-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[var(--bc-accent-green)]' : ''}>{section.icon}</span>
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                  {hasItems && (
                    <FiChevronDown
                      className={`text-sm transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {hasItems && isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5 bg-[#1e3a5f] rounded-lg p-2">
                    {section.items!.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href || '#'}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                          item.href && isItemActive(item.href)
                            ? 'text-white bg-white/10'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Login/Logout button at bottom */}
      <div className="flex-shrink-0 p-3 border-t border-[var(--bc-border)]">
        {token ? (
          <button
            onClick={handleLogoutClick}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              // Dispatch event to open AuthModal
              window.dispatchEvent(new CustomEvent('openAuthModal'));
            }}
            className="block w-full py-3 px-4 bg-[var(--bc-accent-green)] hover:bg-[var(--bc-accent-green-hover)] text-black rounded-xl text-sm font-medium transition-colors text-center"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        loading={logoutLoading}
      />
    </aside>
  );
}
