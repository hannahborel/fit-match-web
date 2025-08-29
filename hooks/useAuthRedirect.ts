"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Check if there's a stored redirect URL
      const redirectUrl = sessionStorage.getItem("authRedirect");
      if (redirectUrl) {
        // Clear the stored redirect
        sessionStorage.removeItem("authRedirect");
        // Navigate to the redirect URL
        router.push(redirectUrl);
      }
    }
  }, [isSignedIn, isLoaded, router]);
};
