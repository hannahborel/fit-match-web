"use client";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export const AuthRedirectHandler = () => {
  useAuthRedirect();
  
  // This component doesn't render anything, it just handles the redirect logic
  return null;
};
