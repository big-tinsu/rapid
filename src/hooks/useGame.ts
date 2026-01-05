import { useAuth } from "@/contexts/auth-context";
import { useRecoilState } from "@/libs/recoil";
import { iframeAtom } from "@/global-state/iframe.atom";
import { useEffect, useState } from "react";

export const useGame = () => {
  const { profile, token, getWallet } = useAuth();

  const [isNotFirstTime, setIsNotFirstTime] = useState(false);
  const [iframeLink, setIframeLink] = useRecoilState(iframeAtom);

  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    setIsNotFirstTime(Boolean(localStorage.getItem("isNotFirstTime")));
  }, [iframeLink]);

  const launchFreeSpin = () => {
    if (!profile?.id) {
      console.error("No profile ID available for free spin");
      return;
    }

    const devLink =
      process.env.NEXT_PUBLIC_DEV_SPIN_WHEEL + `&id=${profile.id}`;
    const prodLink =
      process.env.NEXT_PUBLIC_PROD_SPIN_WHEEL + `&id=${profile.id}`;
    const newIframeLink = isDevelopment ? devLink : prodLink;

    setIframeLink(newIframeLink);
    document.body.style.overflow = "hidden";
  };

  const launchGame = (gameUrl: string) => {
    document.getElementById("navbar")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      document.body.style.overflow = "hidden";
      setIframeLink(gameUrl);
    }, 200);
  };

  const closeGame = () => {
    setIframeLink("");
    document.body.style.overflow = "auto";
    localStorage.setItem("isNotFirstTime", "true");
    setIsNotFirstTime(true);

    if (token) {
      getWallet();
    }
  };

  return {
    iframeLink,
    launchFreeSpin,
    launchGame,
    closeGame,
    isFirstTime: !isNotFirstTime,
  };
};
