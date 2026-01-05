import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatCurrency } from "@/utils/currency";
import dynamic from "next/dynamic";
import ClientOnly from "./ClientOnly";
import BalanceDisplay from "./BalanceDisplay";
import AuthNavbar from "./AuthNavbar";
import { motion, AnimatePresence } from "framer-motion";
import Joyride from "react-joyride";

const Deposit = dynamic(() => import("@/components/Deposit"), { ssr: false });
const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });
import {
  IconHome,
  IconLogout,
  IconRecords,
  IconTrophy,
  IconWallet,
  IconAccount,
  IconFile,
  IconInstagram,
  IconTwitter,
  IconFacebook,
  IconWhatsApp,
  IconMoney,
  IconWheel,
  IconCustomerService,
  IconCompany,
  IconSocialMedia,
  IconTerms,
  IconRefund,
  IconPrivacy,
  IconFAQ,
} from "@/components/icons";
import { LogoutPromptModal } from "./auth/LogoutPromptModal";
import { useAuth } from "@/contexts/auth-context";
import { useGame } from "@/hooks/useGame";
import { iframeAtom } from "@/global-state/iframe.atom";
import { useRecoilValue } from "@/libs/recoil";

const sideBarLinks = [
  {
    label: "My Account",
    name: "profile",
    icon: IconAccount,
    subLinks: [
      {
        label: "Wallet",
        name: "Wallet",
        path: "/wallet",
        icon: IconWallet,
        target: "",
      },
      {
        label: "Profile",
        name: "Profile",
        path: "/profile",
        icon: IconAccount,
        target: "",
      },
      {
        label: "Bet History",
        name: "Bets",
        path: "/bets",
        icon: IconRecords,
        target: "",
      },
      {
        label: "Promotions",
        name: "Promotions",
        path: "/promotions",
        icon: IconTrophy,
        target: "",
      },
    ],
  },
  {
    label: "Customer Service",
    icon: IconCustomerService,
    subLinks: [
      {
        label: "WhatsApp",
        name: "WhatsApp",
        path: "https://wa.me/+2348147995505",
        icon: IconWhatsApp,
        target: "_blank",
      },
    ],
  },
  {
    label: "Company",
    icon: IconCompany,
    subLinks: [
      {
        label: "Terms & Conditions",
        name: "TermsAndConditions",
        path: "/terms-and-conditions",
        icon: IconTerms,
        target: "",
      },
      {
        label: "Refund Policy",
        name: "RefundPolicy",
        path: "/refund-policy",
        icon: IconRefund,
        target: "",
      },
      {
        label: "Privacy Policy",
        name: "PrivacyPolicy",
        path: "/privacy-policy",
        icon: IconPrivacy,
        target: "",
      },
      {
        label: "FAQs",
        name: "FAQs",
        path: "/faq",
        icon: IconFAQ,
        target: "",
      },
    ],
  },
  {
    label: "Social Media",
    icon: IconSocialMedia,
    subLinks: [
      {
        label: "Instagram",
        name: "Instagram",
        path: "http://instagram.com/onerapidplay",
        icon: IconInstagram,
        target: "_blank",
      },
      {
        label: "Twitter",
        name: "Twitter",
        path: "http://x.com/onerapidplay",
        icon: IconTwitter,
        target: "_blank",
      },
      {
        label: "Facebook",
        name: "Facebook",
        path: "http://facebook.com/onerapidplay",
        icon: IconFacebook,
        target: "_blank",
      },
    ],
  },
  {
    label: "Logout",
    name: "Logout",
    path: "/auth/logout",
    icon: IconLogout,
  },
];

// Add these animation variants near the top of the file
const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Navbar() {
  const router = useRouter();
  const { logout, token, getProfile, getWallet, wallet, fetchingWallet } =
    useAuth();
  const iframeLink = useRecoilValue(iframeAtom);
  const { launchFreeSpin, closeGame, isFirstTime } = useGame();

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [sideBarStatus, setSideBarStatus] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        getProfile();
        getWallet();
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [token]);

  // Don't render navbar on auth pages
  if (router.pathname.startsWith("/auth/")) {
    return null;
  }

  // Use AuthNavbar for unauthenticated users
  if (!token) {
    return (
      <>
        <AuthNavbar />
        <div className="h-16" />
      </>
    );
  }

  const openDepositModal = () => {
    setShowDepositModal(true);
    toggleSidebarMenu();
  };

  const handleReload = async () => {
    await getWallet();
  };

  const toggleSidebarMenu = () => {
    setSideBarStatus(!sideBarStatus);
  };

  const closeSideBar = () => {
    setSideBarStatus(false);
  };

  const goTo = (screen: string | undefined) => {
    if (!screen) return;

    if (screen === "Logout") {
      setShowLogoutModal(true);
    } else if (screen === "FreeSpin") {
      launchFreeSpin();
    } else {
      if (router.pathname === `/${screen.toLowerCase()}`) {
        closeSideBar();
        return;
      }
      router.push(`/${screen.toLowerCase()}`);
    }
  };

  // Server-side and hydration-safe render
  return (
    <motion.div
      className="w-full px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav
        className="h-[74px] w-full max-w-[1440px] mx-auto flex justify-between items-center p-2 lg:py-4 z-10"
        id="navbar"
      >
        <div>
          <Joyride
            steps={[
              {
                target: "#navbar-logo",
                content: "Click on this logo to close the game",
                placement: "bottom",
                isFixed: true,
                event: "hover",
              },
            ]}
            showSkipButton={false}
            showProgress={false}
            disableScrolling
            spotlightClicks={true}
            run={Boolean(isFirstTime && iframeLink)}
            continuous={false}
            styles={{
              options: {
                zIndex: 10000,
              },
            }}
          />
          <Link
            href="/"
            onClick={iframeLink ? closeGame : () => router.push("/")}
            className="block w-[100px] sm:w-[120px]"
          >
            <img
              src="/assets/images/white_logo.png"
              id="navbar-logo"
              alt="Logo"
              width={60}
              height={40}
              className="w-full h-auto"
            />
          </Link>
        </div>

        {/* Use conditional rendering in a way that's hydration-safe */}
        <>
          {!token ? (
            <div className="flex items-center gap-1">
              <Link href="/auth/login">
                <button className="text-gray-400 hover:text-gray-300 transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="ml-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* Mobile Menu */}
              <div className="flex lg:hidden justify-between items-center">
                {!iframeLink && (
                  <div className="flex items-center">
                    <div>
                      <BalanceDisplay />
                    </div>

                    {!sideBarStatus && (
                      <button
                        onClick={toggleSidebarMenu}
                        className="py-2 px-4 z-20 lg:hidden"
                      >
                        <div className="space-y-2">
                          <span className="block w-8 h-0.5 bg-white"></span>
                          <span className="block w-8 h-0.5 bg-white"></span>
                          <span className="block w-8 h-0.5 bg-white"></span>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {/* Mobile Sidebar */}
                <AnimatePresence>
                  {sideBarStatus && !iframeLink && (
                    <motion.div
                      className="fixed inset-0 bg-buslybg bg-opacity-95 z-20 overflow-y-auto"
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={sidebarVariants}
                    >
                      <div className="flex justify-between items-center p-2 border-b border-gray-700">
                        <Link
                          href="/"
                          onClick={closeGame}
                          className="block w-[152px]"
                        >
                          <img
                            src="/assets/images/white_logo.png"
                            alt="Logo"
                            width={152}
                            height={40}
                            className="w-full"
                          />
                        </Link>

                        <button onClick={toggleSidebarMenu} className="p-4">
                          <div className="relative w-8 h-8">
                            <span className="absolute top-1/2 left-0 w-8 h-0.5 bg-white transform -rotate-45"></span>
                            <span className="absolute top-1/2 left-0 w-8 h-0.5 bg-white transform rotate-45"></span>
                          </div>
                        </button>
                      </div>

                      <div className="px-3 py-1">
                        <ul className="space-y-4">
                          <div
                            onClick={launchFreeSpin}
                            className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors"
                          >
                            <IconWheel />
                            <p className="text-sm text-white uppercase">
                              Free Spin
                            </p>
                          </div>

                          {sideBarLinks.map((link, index) => (
                            <li key={index} className="w-full">
                              <div className="py-1 space-y-1">
                                <p
                                  onClick={() => goTo(link.name)}
                                  className="text-sm text-orange-500 uppercase font-semibold cursor-pointer hover:text-orange-600"
                                >
                                  {link.label}
                                </p>

                                <div className="space-y-2">
                                  {link.name === "MyAccount" && (
                                    <div
                                      onClick={openDepositModal}
                                      className="flex items-center gap-2 py-2 cursor-pointer hover:text-orange-500 transition-colors"
                                    >
                                      <IconMoney />
                                      <p className="text-sm text-white uppercase">
                                        Deposit
                                      </p>
                                    </div>
                                  )}

                                  {link.subLinks?.map((subLink, idx) => (
                                    <div key={idx} className="py-2">
                                      <a
                                        href={subLink.path}
                                        target={subLink.target}
                                        className="flex items-center gap-2 hover:text-orange-500 transition-colors"
                                      >
                                        <subLink.icon />
                                        <p className="text-sm text-white uppercase">
                                          {subLink.label}
                                        </p>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-2 xl:gap-6">
            {!iframeLink && (
              <>
                <div>
                  <p className="text-[10px] text-[#eeeded]">Balance:</p>
                  <ClientOnly>
                    {fetchingWallet ? (
                      <motion.div
                        className="h-4 w-20 bg-gray-400/20 rounded"
                        animate={{
                          background: [
                            "linear-gradient(90deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.4) 50%, rgba(156, 163, 175, 0.2) 100%)",
                            "linear-gradient(90deg, rgba(156, 163, 175, 0.4) 0%, rgba(156, 163, 175, 0.2) 50%, rgba(156, 163, 175, 0.4) 100%)",
                            "linear-gradient(90deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.4) 50%, rgba(156, 163, 175, 0.2) 100%)",
                          ],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ) : (
                      <p
                        className={`font-bold text-sm ${
                          (wallet?.balance || 0) > 0
                            ? "text-white"
                            : "text-red-500"
                        }`}
                      >
                        {formatCurrency(
                          +(wallet?.balance || 0) + +(wallet?.promoBalance || 0)
                        )}
                      </p>
                    )}
                  </ClientOnly>
                </div>

                <div
                  onClick={launchFreeSpin}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <IconWheel />
                  <p className="text-sm text-white uppercase underline group-hover:text-orange-500 transition-colors">
                    Free Spin
                  </p>
                </div>
              </>
            )}

            {sideBarLinks.map((link, idx) => (
              <li key={idx} className="relative group">
                <p
                  onClick={() => goTo(link.name)}
                  className="text-sm text-white uppercase cursor-pointer underline group-hover:text-orange-500 transition-colors"
                >
                  {link.label}
                </p>

                <AnimatePresence>
                  <motion.ul
                    className="hidden group-hover:block absolute left-0 min-w-full w-max bg-[#22438c] rounded-md z-50"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                  >
                    {link.name === "MyAccount" && (
                      <li>
                        <a
                          onClick={openDepositModal}
                          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#112c66] transition-colors"
                        >
                          <IconMoney />
                          <p className="text-sm text-white uppercase">
                            Deposit
                          </p>
                        </a>
                      </li>
                    )}

                    {link.subLinks?.map((subLink, index) => (
                      <li key={index}>
                        <a
                          href={subLink.path}
                          target={subLink.target}
                          className="flex items-center gap-2 p-2 text-white hover:bg-[#112c66] transition-colors"
                        >
                          <subLink.icon />
                          <span className="text-sm uppercase">
                            {subLink.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </>
      </nav>

      {/* Update the Modal and iFrame with animations */}
      <AnimatePresence>
        {showDepositModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {showDepositModal && (
              <Modal
                title="Add Funds"
                onClose={() => setShowDepositModal(false)}
              >
                <Deposit
                  onReload={handleReload}
                  onClose={() => setShowDepositModal(false)}
                />
              </Modal>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutPromptModal
        onClose={() => setShowLogoutModal(false)}
        onLogout={() => logout()}
        open={showLogoutModal}
      />
    </motion.div>
  );
}
