"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
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
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] h-[94px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-xl bg-brand-light/50 p-1 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Lentera Outdoor"
              width={44}
              height={44}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="flex flex-col justify-center items-start leading-tight">
            <span className="text-foreground text-lg md:text-[20px] font-black font-display tracking-tight transition-colors group-hover:text-brand-orange">LENTERA</span>
            <span className="text-muted-foreground text-xs md:text-[13px] font-semibold font-body uppercase tracking-[0.2em]">Outdoor</span>
          </div>
        </Link>

        {/* Nav Links — Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-[15px] font-semibold font-body transition-colors duration-300 ${
                  isActive
                    ? "text-brand-orange"
                    : "text-foreground/70 hover:text-foreground"
                } group`}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] bg-brand-orange transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} 
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Button
            className="hidden md:flex rounded-full font-bold cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/20 hover:-translate-y-0.5 gap-2 px-6"
            size="lg"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-4 h-4" />
            Keranjang
          </Button>

          {/* Hamburger Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-muted/50">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[350px] p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/40">
              <SheetTitle className="sr-only">Navigasi Mobile</SheetTitle>
              <SheetDescription className="sr-only">Menu navigasi untuk versi mobile</SheetDescription>
              
              {/* Mobile Menu Header (Logo) */}
              <div className="flex items-center gap-3 p-6 border-b border-border/40">
                <div className="bg-brand-light/50 p-1 rounded-xl">
                  <Image
                    src="/images/logo.png"
                    alt="Lentera Outdoor"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center items-start leading-tight">
                  <span className="text-foreground text-lg font-black font-display tracking-tight">LENTERA</span>
                  <span className="text-muted-foreground text-xs font-semibold font-body uppercase tracking-[0.2em]">Outdoor</span>
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
                      className={`flex items-center px-4 py-3.5 rounded-2xl text-[16px] font-semibold font-body transition-all duration-300 ${
                        isActive 
                          ? "bg-brand-orange/10 text-brand-orange translate-x-1" 
                          : "text-foreground/80 hover:bg-muted/50 hover:text-foreground hover:translate-x-1"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Footer CTA */}
              <div className="mt-auto p-6 border-t border-border/40 pb-safe">
                <Button
                  className="w-full rounded-2xl font-bold bg-brand-orange hover:bg-brand-orange-dark text-white shadow-lg shadow-brand-orange/20 py-6 text-[16px] gap-2 transition-all"
                  size="lg"
                  onClick={() => {
                    setIsOpen(false);
                    setIsCartOpen(true);
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
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

