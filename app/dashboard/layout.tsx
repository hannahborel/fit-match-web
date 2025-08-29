import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import NavbarTrigger from "@/components/layout/NavbarTrigger";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthRedirectHandler } from "@/components/auth/AuthRedirectHandler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitMatch",
  description: "FitMatch Fithness Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Navbar />
      <main className="flex w-full h-screen bg-background ">
        <NavbarTrigger />
        <AuthRedirectHandler />
        {children}
      </main>
    </SidebarProvider>
  );
}
