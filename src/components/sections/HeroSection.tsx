"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { AbstractBackground } from "@/components/ui/abstract-background";
import { useCart } from "@/context/CartContext";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export default function HeroSection() {
  const { setIsCartOpen } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 1. LIGHTWEIGHT SCROLL PARALLAX (Tanpa fisika useSpring yang berat)
  const { scrollY } = useScroll();
  
  // Mengikuti scroll secara linier langsung ke GPU (0 overhead)
  const headingY = useTransform(scrollY, [0, 1000], [0, 300]);
  const cardY = useTransform(scrollY, [0, 1000], [0, 120]);
  const personScrollY = useTransform(scrollY, [0, 1000], [0, -40]);

  // 2. LIGHTWEIGHT MOUSE PARALLAX (Tanpa perhitungan fisika)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isClient) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 15; 
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      className="relative w-full bg-gradient-to-b from-orange-50/70 via-white to-white overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AbstractBackground />

      {/* White strip at the very bottom (for the next section to blend in) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-36 bg-white z-0" />

      {/* ─── MAIN STACK (fixed height, everything overlaps inside) ─── */}
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] min-h-[600px] h-[100vh]">

        {/* 1. GIANT HEADING — top, behind everything */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-20 md:top-24 left-0 right-0 text-center z-10 pointer-events-none will-change-transform"
        >
          <motion.div style={{ y: headingY }}>
            <h1
              className="font-black uppercase font-display text-transparent bg-clip-text bg-gradient-to-br from-brand-orange to-brand-orange-dark leading-[0.85] tracking-[-0.02em] select-none drop-shadow-sm"
              style={{ fontSize: "clamp(52px, 15vw, 130px)" }}
            >
              LENTERA
              <br />
              OUTDOOR
            </h1>
          </motion.div>
        </motion.div>

        {/* 2. MOUNTAIN CARD — sits at the bottom, behind person */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-4 right-4 lg:left-8 lg:right-8 z-20 min-h-[300px] h-[45vh] max-h-[400px] md:min-h-[280px] md:h-[45vh] md:max-h-[500px] will-change-transform"
        >
          <motion.div className="w-full h-full" style={{ y: cardY }}>
            <div className="relative w-full h-full rounded-t-3xl overflow-hidden shadow-[0_0_40px_rgba(255,91,4,0.1)] border-t border-white/50">
              <Image
                src="/images/hero-bg.png"
                alt="Pemandangan Gunung"
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover object-center"
                priority
                unoptimized
              />
              {/* subtle scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
          </motion.div>
        </motion.div>

        {/* 3. PERSON — centered, overlaps text AND card */}
        <motion.div 
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="absolute inset-0 z-30 pointer-events-none flex justify-center will-change-transform"
        >
          <motion.div
            style={{ x: mouseX, y: mouseY }}
            className="shrink-0 mt-8 md:-mt-10"
          >
            <motion.div
              style={{ 
                width: "clamp(910px, 75vw, 1100px)", 
                height: "clamp(800px, 140vh, 2000px)", 
                y: personScrollY
              }}
              className="relative"
            >
              <Image
                src="/images/hero.png"
                alt="Pendaki Lentera Outdoor"
                fill
                sizes="(max-width: 768px) 150vw, 100vw"
                className="object-contain object-top" 
                priority
                unoptimized
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="absolute left-0 right-0 flex flex-wrap justify-center gap-4 md:gap-6 z-40 bottom-[25vh] md:bottom-[30vh]"
        >
          <Button asChild variant="gradient" size="lg">
            <Link href="/catalog">
              Mulai Sewa
              <ArrowRight data-icon="inline-end" className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
