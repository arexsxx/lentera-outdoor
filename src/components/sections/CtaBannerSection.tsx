"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ChevronRight } from "lucide-react";

export default function CtaBannerSection() {
  const { setIsCartOpen } = useCart();

  return (
    <section className="py-6 md:py-12 bg-white dark:bg-background">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px]">
        <div className="relative rounded-[32px] overflow-hidden py-10 md:py-16 px-6 md:px-12 text-center text-white shadow-xl">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/banner-cta.jpg')" }}
            />
            {/* Orange tint overlay */}
            <div className="absolute inset-0 bg-brand-orange/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/90 to-brand-orange/40" />
          </div>

          {/* Konten */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 font-display text-white">
              Siap Memulai<br />Petualanganmu?
            </h2>
            <p className="mt-4 text-white/90 text-sm md:text-base max-w-[90%] mx-auto mb-8 font-light">
              Lengkapi kebutuhan mendaki dan camping-mu bersama kami. Proses sewa mudah,
              cepat, dan tanpa ribet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                variant="border-secondary"
                className="w-full sm:w-auto"
              >
                <Link href="/katalog">Lihat Katalog</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-brand-orange"
                onClick={() => setIsCartOpen(true)}
              >
                Mulai Sewa
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
