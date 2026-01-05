import { useGame } from "@/hooks/useGame";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AuthNavbar() {
  const router = useRouter();
  const { closeGame, iframeLink } = useGame();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#161923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              onClick={iframeLink ? closeGame : () => router.push("/")}
              className="cursor-pointer"
            >
              <img
                src="/assets/images/white_logo.png"
                alt="Logo"
                className="h-5"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === "/auth/login" ? "text-white" : ""
              }`}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className={`bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 ${
                router.pathname === "/auth/register" ? "bg-orange-600" : ""
              }`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
