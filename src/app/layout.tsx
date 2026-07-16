import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartSheet } from "@/components/layout/CartSheet";
import { AuthProvider } from "@/context/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lentera Outdoor — Sewa Perlengkapan Outdoor",
  description:
    "Sewa tenda, backpack, sepatu, dan perlengkapan outdoor terlengkap. Siap menemani setiap perjalanan alammu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <CartSheet />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
