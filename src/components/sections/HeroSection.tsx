"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen,  } from "lucide-react";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isClient) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <section 
      className="relative w-full bg-[#e4eef0] overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >

      {/* White strip at the very bottom (for the next section to blend in) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-36 bg-white z-0" />

      {/* ─── MAIN STACK (fixed height, everything overlaps inside) ─── */}
      <div className="relative mx-auto max-w-[1440px] px-[56px]" style={{ height: "clamp(480px, 80vh, 800px)" }}>

        {/* 1. GIANT HEADING — top, behind everything */}
        <div className="absolute top-8 md:top-12 left-0 right-0 text-center z-10 pointer-events-none">
          <h1
            className="font-black uppercase font-display text-brand-orange leading-[0.85] tracking-[-0.02em] select-none"
            style={{ fontSize: "clamp(52px, 9.5vw, 130px)" }}
          >
            LENTERA
            <br />
            OUTDOOR
          </h1>
        </div>

        {/* 2. MOUNTAIN CARD — sits at the bottom, behind person */}
        <div className="absolute bottom-0 left-4 right-4 lg:left-8 lg:right-8 z-20"
             style={{ height: "clamp(200px, 35vh, 360px)" }}>
          <div className="relative w-full h-full rounded-t-3xl overflow-hidden shadow-2xl">
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

        {/* 3. PERSON — centered, overlaps text AND card */}
        <div
          className="absolute left-1/2 z-30 pointer-events-none transition-transform duration-300 ease-out"
          style={{ 
            top: "clamp(-40px, -5vh, 0px)", // Dinaikkan sedikit ke atas
            width: "clamp(480px, 75vw, 1100px)", // Skala diperbesar drastis
            height: "clamp(800px, 140vh, 2000px)", // Tinggi sengaja dibuat meluap sangat jauh ke bawah layar
            transform: `translate(calc(-50% + ${mousePos.x}px), ${mousePos.y}px)`
          }}
        >
          <Image
            src="/images/hero.png"
            alt="Pendaki Lentera Outdoor"
            fill
            sizes="(max-width: 768px) 80vw, 60vw"
            className="object-contain object-top" // Kepala tetap di atas, kaki terpotong di bawah
            priority
          />
        </div>

        {/* 4. BUTTONS — z-40, in FRONT of the person */}
        <div className="absolute left-0 right-0 flex justify-center gap-6 z-40" style={{ bottom: "calc(clamp(200px, 35vh, 360px) / 2 - 22px)" }}>
          <Button asChild variant="secondary" size="lg">
            <Link href="/catalog">
              <BookOpen data-icon="inline-start" />
              Lihat Katalog
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/sewa">
              Mulai Sewa
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
