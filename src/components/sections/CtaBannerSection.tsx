"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CtaBannerSection() {
  const { setIsCartOpen } = useCart();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image & Overlay (Native CSS Parallax) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/images/banner-cta.jpg')" }}
        />
        <div className="absolute inset-0 bg-brand-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/80 to-transparent" />
      </div>

      {/* Konten */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] text-center text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black leading-tight drop-shadow-lg">
          SIAP MEMULAI
          <br />
          PETUALANGANMU?
        </h2>
        <p className="mt-4 text-white/90 max-w-md mx-auto text-lg drop-shadow-md">
          Lengkapi kebutuhan mendaki dan camping-mu bersama kami. Proses sewa mudah,
          cepat, dan terpercaya.
        </p>
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <Button
            asChild
            size="lg"
            variant="border-secondary"
            className="rounded-full border-white/50 text-white bg-white/10 hover:bg-white/20 hover:border-white px-8 transition-all"
          >
            <Link href="/catalog">Lihat Katalog</Link>
          </Button>
          <Button
            size="lg"
            className="rounded-full px-8 font-bold"
            onClick={() => setIsCartOpen(true)}
          >
            Mulai Sewa
          </Button>
        </div>
      </div>
    </section>
  );
}
