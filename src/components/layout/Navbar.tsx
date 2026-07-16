"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsCartOpen, cartItems } = useCart();
  const { session } = useAuth();

  const profileHref = "/auth";
  const profileName =
    session?.user.user_metadata?.full_name ||
    session?.user.user_metadata?.name ||
    session?.user.email?.split("@")[0] ||
    "Akun";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-sm py-0"
          : "bg-transparent border-transparent py-2 md:py-4"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] h-[72px] md:h-[80px] flex items-center justify-between transition-all duration-500">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-xl bg-brand-light/50 p-1 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Lentera Outdoor"
              width={44}
              height={44}
              className="w-10 h-10 object-contain"
              unoptimized
            />
          </div>
          <div className="flex flex-col justify-center items-start leading-tight">
            <span className="text-foreground text-lg md:text-[20px] font-black font-display tracking-tight transition-colors group-hover:text-brand-orange">
              LENTERA
            </span>
            <span className="text-muted-foreground text-xs md:text-[13px] font-semibold font-body uppercase tracking-[0.2em]">
              Outdoor
            </span>
          </div>
        </Link>

        {/* Center Nav Links - Desktop */}
        <nav
          className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center transition-all duration-500 ease-in-out ${
            isScrolled ? "gap-10" : "gap-8"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-[15px] font-semibold font-body transition-colors duration-300 ${
                  isActive
                    ? "text-brand-orange"
                    : "text-foreground/80 hover:text-brand-orange"
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

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {session ? (
            <details className="group relative">
              <summary className="list-none cursor-pointer rounded-full px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-black/5 hover:text-foreground flex items-center gap-2">
                <span className="max-w-[140px] truncate">{profileName}</span>
                <ChevronDown className="h-4 w-4 text-foreground/45 transition-transform group-open:rotate-180" />
              </summary>

              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-52 overflow-hidden rounded-3xl border border-black/8 bg-white/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground"
                >
                  <UserRound className="h-4 w-4 text-brand-orange" />
                  Profil saya
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground"
                >
                  <Package className="h-4 w-4 text-brand-orange" />
                  Transaksi
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 text-brand-orange" />
                  Logout
                </button>
              </div>
            </details>
          ) : (
            <Button
              asChild
              size="icon-sm"
              variant="ghost"
              className="rounded-full"
            >
              <Link href={profileHref} aria-label="Masuk">
                <UserRound className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Button
            size="icon-sm"
            variant="ghost"
            className="relative rounded-full"
            onClick={() => setIsCartOpen(true)}
            aria-label="Buka keranjang"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItems.length > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-brand-orange px-1.5 text-[11px] font-bold leading-5 text-white shadow-sm">
                {cartItems.length}
              </span>
            ) : null}
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-2 transition-all duration-300">
          {session ? (
            <details className="group relative">
              <summary className="list-none cursor-pointer rounded-full p-2 text-foreground/85 transition-colors hover:bg-black/5 hover:text-foreground">
                <UserRound className="h-5 w-5" />
              </summary>

              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-48 overflow-hidden rounded-3xl border border-black/8 bg-white/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground"
                >
                  <UserRound className="h-4 w-4 text-brand-orange" />
                  {profileName}
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground"
                >
                  <Package className="h-4 w-4 text-brand-orange" />
                  Transaksi
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setIsOpen(false);
                    await handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 text-brand-orange" />
                  Logout
                </button>
              </div>
            </details>
          ) : (
            <Button
              asChild
              size="icon-sm"
              variant="ghost"
              className="rounded-full"
            >
              <Link href={profileHref} aria-label="Masuk">
                <UserRound className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Button
            size="icon-sm"
            variant="ghost"
            className="relative rounded-full"
            onClick={() => setIsCartOpen(true)}
            aria-label="Buka keranjang"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItems.length > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-brand-orange px-1.5 text-[11px] font-bold leading-5 text-white shadow-sm">
                {cartItems.length}
              </span>
            ) : null}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className={`rounded-full transition-all duration-300 ${
                  !isScrolled
                    ? "bg-white/60 backdrop-blur-md border border-white/50 shadow-sm"
                    : ""
                } hover:bg-muted/80`}
              >
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-[350px] p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/40"
            >
              <SheetTitle className="sr-only">Navigasi Mobile</SheetTitle>
              <SheetDescription className="sr-only">
                Menu navigasi untuk versi mobile
              </SheetDescription>

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
                  <span className="text-foreground text-lg font-black font-display tracking-tight">
                    LENTERA
                  </span>
                  <span className="text-muted-foreground text-xs font-semibold font-body uppercase tracking-[0.2em]">
                    Outdoor
                  </span>
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

              {/* Mobile Menu Footer Actions */}
              <div className="mt-auto p-4 border-t border-border/40 pb-safe">
                <Button
                  className="w-full shadow-lg shadow-brand-orange/25"
                  size="lg"
                  onClick={() => {
                    setIsOpen(false);
                    setIsCartOpen(true);
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Keranjang
                  {cartItems.length > 0 ? (
                    <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-[11px] font-bold leading-5">
                      {cartItems.length}
                    </span>
                  ) : null}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
