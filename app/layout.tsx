import "@/app/globals.css";
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
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
