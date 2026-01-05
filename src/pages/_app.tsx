import "@/styles/globals-v2.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/contexts/auth-context";
import { RecoilRoot } from "@/libs/recoil";
import GameProvider from "@/providers/GameProvider";

// Import Toast with no SSR to avoid hydration issues
const Toast = dynamic(() => import("@/components/Toast"), { ssr: false });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <RecoilRoot>
        <AuthProvider>
          <GameProvider>
            {getLayout(<Component {...pageProps} />)}
            <Toast />
          </GameProvider>
        </AuthProvider>
      </RecoilRoot>
    </>
  );
}
