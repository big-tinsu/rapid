// Category tabs for the casino page
export const CATEGORY_TABS = [
  { id: 'lobby', label: 'Lobby' },
  { id: 'originals', label: 'Originals' },
  { id: 'hot-games', label: 'Hot Games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live-casino', label: 'Live Casino' },
  { id: 'game-shows', label: 'Game Shows' },
  { id: 'table-games', label: 'Table Games' },
] as const;

// Navigation routes
export const MAIN_ROUTES = {
  HOME: '/',
  CASINO: '/casino',
  SPORTS: '/sports',
  LOTTERY: '/lottery',
  PROMOTIONS: '/promotions',
  VIP_CLUB: '/vip-club',
  BONUS: '/bonus',
  REFERRAL: '/referral',
  PROFILE: '/profile',
  WALLET: '/wallet',
  BETS: '/bets',
  FAQ: '/faq',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_AND_CONDITIONS: '/terms-and-conditions',
  REFUND_POLICY: '/refund-policy',
} as const;

// Auth routes
export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const;

// Sidebar navigation items
export const SIDEBAR_CASINO_ITEMS = [
  { label: 'Originals', categoryId: 'originals' },
  { label: 'Exclusive', categoryId: 'exclusive' },
  { label: 'Hot Games', categoryId: 'hot-games' },
  { label: 'Slots', categoryId: 'slots' },
  { label: 'Live Casino', categoryId: 'live-casino' },
  { label: 'Feature Buy-in', categoryId: 'feature-buy-in' },
  { label: 'New Releases', categoryId: 'new-releases' },
  { label: 'Burst Games', categoryId: 'burst-games' },
  { label: 'Poker', categoryId: 'poker' },
  { label: 'Bingo', categoryId: 'bingo' },
] as const;

export const SIDEBAR_MAIN_SECTIONS = [
  { title: 'Casino', href: '/casino', isExpandable: true, hasItems: true },
  { title: 'Sports', href: '/sports', isExpandable: false },
  { title: 'Lottery', href: '/lottery', isExpandable: false },
  { title: 'Promotions', href: '/promotions', isExpandable: false },
] as const;

export const SIDEBAR_BOTTOM_ITEMS = [
  { title: 'VIP Club', href: '/vip-club', hasVipText: true },
  { title: 'Bonus', href: '/bonus' },
  { title: 'Referral', href: '/referral' },
  { title: 'FAQ', href: '/faq' },
] as const;
