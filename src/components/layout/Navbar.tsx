"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Reviews", href: "/review" },
];

export default function Navbar() {
  const pathname = usePathname();

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
            className="hidden md:flex rounded-full font-bold"
            size="lg"
          >
            Sewa sekarang
          </Button>

          {/* Hamburger Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className=" md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-medium font-body ${isActive ? "text-brand-orange" : "text-foreground"}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Button
                  className="mt-6 rounded-lg font-medium"
                  size="lg"
                >
                  Sewa sekarang
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}

