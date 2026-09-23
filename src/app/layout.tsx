import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#164B61",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hayanhospital.com"),
  title: {
    default: "Hayan General & Children's Hospital | Kodad, Telangana",
    template: "%s | Hayan Hospital Kodad",
  },
  description: "Specialized healthcare and surgical care designed around children, families, and individuals in Kodad, Suryapet District, Telangana.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#111111] antialiased">
        {children}
      </body>
    </html>
  );
}
