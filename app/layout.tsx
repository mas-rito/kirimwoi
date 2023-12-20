"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "@/lib/redux/StoreProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          <SessionProvider>{children}</SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
