import "@/app/globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

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
    <html lang="en">
      <body className="">
        <ClerkProvider
          signInUrl={"/sign-in"}
          signUpUrl={"/sign-up"}
          signInForceRedirectUrl={"/dashboard"}
          signUpForceRedirectUrl={"/dashboard"}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
