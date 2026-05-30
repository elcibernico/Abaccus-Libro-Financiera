import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { UserPreferencesProvider } from "@/modules/libro_financiero/components/UserPreferencesProvider";
import Header from "@/visual/components/Header";
import Footer from "@/visual/components/Footer";
import TitleTag from "@/visual/components/TitleTag";
import { NavigationProvider } from "@/modules/libro_financiero/components/NavigationProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import config from "../../data_content/locales/config.json";

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
          <NavigationProvider>
            <TitleTag />
            <Header />
            {children}
            <Footer />
          </NavigationProvider>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}

