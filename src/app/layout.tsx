import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { config } from "@/config/prospect";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import ZeusChatWidget from "@/components/chat/ZeusChatWidget";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${config.name} — ${config.tagline}`,
  description: `${config.tagline} dashboard powered by ALDC Eclipse + Zeus`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased font-sans`}>
        <SidebarLayout>{children}</SidebarLayout>
        <ZeusChatWidget />
      </body>
    </html>
  );
}
