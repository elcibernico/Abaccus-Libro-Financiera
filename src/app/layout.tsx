import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { UserPreferencesProvider } from "@/components/UserPreferencesProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicFavicon from "@/components/DynamicFavicon";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import config from "@/config.json";

export const metadata: Metadata = {
  title: config.titletag.title,
  description: config.header.titleLine3,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        <UserPreferencesProvider>
          <DynamicFavicon />
          <Header />
          {children}
          <Footer />
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
