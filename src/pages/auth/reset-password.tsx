import { useEffect } from "react";
import { useRouter } from "next/router";

// Auth is handled via AuthModal - this page just redirects
export default function ResetPasswordPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/casino");
  }, [router]);

  return null;
}
