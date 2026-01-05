import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameProvider from "@/providers/GameProvider";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <GameProvider>
        <Navbar />

        <main className="flex-grow">{children}</main>
        <Footer />
      </GameProvider>
    </div>
  );
}
