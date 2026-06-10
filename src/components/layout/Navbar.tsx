"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Reviews", href: "/review" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
      {/* height ~94px sesuai Figma, padding ~80px kiri-kanan */}
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] h-[94px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Lentera Outdoor"
            width={44}
            height={44}
            className="w-11 h-11"
          />
          <div className="flex flex-col justify-start items-start leading-none">
            <span className="text-foreground text-[18px] font-bold font-display tracking-wide">LENTERA</span>
            <span className="text-foreground text-[13px] font-normal font-body">Outdoor</span>
          </div>
        </Link>

        {/* Nav Links — Desktop */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-0.5 text-[16px] font-medium font-body transition-colors ${
                  isActive
                    ? "border-b-2 border-brand-orange text-brand-orange"
                    : "text-foreground hover:text-brand-orange"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Button
            className="hidden md:flex rounded-full font-bold cursor-pointer"
            size="lg"
            onClick={() => setIsCartOpen(true)}
          >
            Keranjang Sewa
          </Button>

          {/* Hamburger Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-brand-dark-soft" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[350px] p-0 flex flex-col bg-white/95 backdrop-blur-xl border-l border-white/20">
              <SheetTitle className="sr-only">Navigasi Mobile</SheetTitle>
              
              {/* Mobile Menu Header (Logo) */}
              <div className="flex items-center gap-2 p-6 border-b border-gray-100">
                <Image
                  src="/images/logo.png"
                  alt="Lentera Outdoor"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div className="flex flex-col justify-start items-start leading-none">
                  <span className="text-brand-dark-soft text-[18px] font-bold font-display tracking-wide">LENTERA</span>
                  <span className="text-gray-500 text-[13px] font-normal font-body">Outdoor</span>
                </div>
              </div>

              {/* Mobile Menu Links */}
              <nav className="flex flex-col px-4 py-6 gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl text-lg font-medium font-body transition-all ${
                        isActive 
                          ? "bg-brand-orange/10 text-brand-orange" 
                          : "text-brand-dark-soft hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Footer CTA */}
              <div className="mt-auto p-6 border-t border-gray-100">
                <Button
                  className="w-full rounded-xl font-bold bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white shadow-lg shadow-brand-orange/20 py-6 text-lg"
                  size="lg"
                  onClick={() => {
                    setIsOpen(false);
                    setIsCartOpen(true);
                  }}
                >
                  Keranjang Sewa
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}

