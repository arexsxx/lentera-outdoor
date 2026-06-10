"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { AbstractBackground } from "@/components/ui/abstract-background";
import { useCart } from "@/context/CartContext";

export default function HeroSection() {
  const { setIsCartOpen } = useCart();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isClient) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <section 
      className="relative w-full bg-gradient-to-b from-orange-50/70 via-white to-white overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      <AbstractBackground />

      {/* White strip at the very bottom (for the next section to blend in) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-36 bg-white z-0" />

      {/* ─── MAIN STACK (fixed height, everything overlaps inside) ─── */}
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] min-h-[600px] h-[100vh]">

        {/* 1. GIANT HEADING — top, behind everything */}
        <div className="absolute top-20 md:top-24 left-0 right-0 text-center z-10 pointer-events-none animate-in fade-in zoom-in-95 duration-1000 ease-out">
          <div style={{ transform: `translateY(${scrollY * 0.4}px)`, willChange: "transform" }}>
            <h1
              className="font-black uppercase font-display text-transparent bg-clip-text bg-gradient-to-br from-brand-orange to-brand-orange-dark leading-[0.85] tracking-[-0.02em] select-none drop-shadow-sm"
              style={{ fontSize: "clamp(52px, 15vw, 130px)" }}
            >
              LENTERA
              <br />
              OUTDOOR
            </h1>
          </div>
        </div>

        {/* 2. MOUNTAIN CARD — sits at the bottom, behind person */}
        <div className="absolute bottom-0 left-4 right-4 lg:left-8 lg:right-8 z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both ease-out min-h-[300px] h-[45vh] max-h-[400px] md:min-h-[280px] md:h-[45vh] md:max-h-[500px]">
          <div className="w-full h-full" style={{ transform: `translateY(${scrollY * 0.15}px)`, willChange: "transform" }}>
            <div className="relative w-full h-full rounded-t-3xl overflow-hidden shadow-[0_0_40px_rgba(255,91,4,0.1)] border-t border-white/50">
              <Image
                src="/images/hero-bg.png"
                alt="Pemandangan Gunung"
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover object-center"
                priority
              />
              {/* subtle scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
          </div>
        </div>

        {/* 3. PERSON — centered, overlaps text AND card */}
        <div className="absolute inset-0 z-30 pointer-events-none flex justify-center animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-500 fill-mode-both ease-out">
          <div
            className="relative shrink-0 transition-transform duration-300 ease-out mt-8 md:-mt-10"
            style={{ 
              width: "clamp(910px, 75vw, 1100px)", // Dikembalikan ke ukuran RAKSASA agar bagian bawah pasti terpotong (tidak terlihat full)
              height: "clamp(800px, 140vh, 2000px)", 
              transform: `translate(${mousePos.x}px, ${mousePos.y - scrollY * 0.05}px)`,
              willChange: "transform"
            }}
          >
            <Image
              src="/images/hero.png"
              alt="Pendaki Lentera Outdoor"
              fill
              sizes="(max-width: 768px) 150vw, 100vw"
              className="object-contain object-top" 
              priority
            />
          </div>
        </div>

        {/* 4. BUTTONS — z-50, in FRONT of everything */}
        <div className="absolute left-0 right-0 flex flex-wrap justify-center gap-4 md:gap-6 z-50 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-700 fill-mode-both ease-out bottom-[25vh] md:bottom-[30vh]">
          <Button asChild variant="secondary" className="rounded-full font-bold bg-white/80 backdrop-blur-md border border-white/50 hover:bg-white text-brand-orange-dark shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all px-8 h-14 text-base md:text-lg">
            <Link href="/catalog">
              <BookOpen data-icon="inline-start" className="w-5 h-5" />
              Lihat Katalog
            </Link>
          </Button>
          <Button onClick={() => setIsCartOpen(true)} className="rounded-full font-bold bg-gradient-to-r from-brand-orange to-brand-orange-dark hover:from-brand-orange-dark hover:to-brand-orange text-white shadow-[0_8px_30px_rgba(255,91,4,0.4)] hover:shadow-[0_12px_40px_rgba(255,91,4,0.6)] hover:-translate-y-1 transition-all px-8 h-14 text-base md:text-lg border border-brand-orange/50">
            Mulai Sewa
            <ArrowRight data-icon="inline-end" className="w-5 h-5 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
}
