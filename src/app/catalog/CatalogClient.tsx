"use client";

import { useState, useEffect, useRef } from "react";
import { CategoryTabGroup } from "@/components/ui/category-tab";
import { Product } from "@/data/products";
import { Search, Heart } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import Image from "next/image";

const categories = ["All", "Backpack", "Tenda", "Sepatu", "Cook", "Emergency"];

export default function CatalogClient({ initialProducts }: { initialProducts: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  let filtered =
    activeCategory === "All"
      ? [...initialProducts]
      : initialProducts.filter((p) => p.category === activeCategory);

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
    );
  }

  // ── CAROUSEL STATE ──
  const bannerProducts = initialProducts.slice(0, 3);
  const showBanner = searchQuery === "";
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !showBanner || bannerProducts.length === 0) return;
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerProducts.length);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, showBanner]);

  return (
    <main className="min-h-screen bg-transparent pt-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px]">

        {/* ── PAGE HEADER ── */}
        <div className="flex items-center justify-between py-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-black font-display text-brand-dark-soft tracking-tight">
              Browse Catalog
            </h1>
          </div>
        </div>

        {/* ── HERO BANNER CAROUSEL ── */}
        {mounted && showBanner && bannerProducts.length > 0 && (
          <div className="relative w-full h-[200px] md:h-[300px] rounded-[28px] overflow-hidden mb-10 shadow-md">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {bannerProducts.map((product, i) => (
                <div key={product.id} className="relative w-full h-full shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center scale-110"
                    unoptimized
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 via-brand-dark/40 to-transparent" />
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                    <div>
                      <p className="text-white/60 text-xs font-body uppercase tracking-widest mb-1">Populer Disewa</p>
                      <h2 className="text-white text-2xl md:text-4xl font-black font-display leading-tight tracking-tight drop-shadow-sm">
                        {product.name}
                      </h2>
                      {product.description && (
                        <p className="text-white/70 text-sm font-body mt-1 line-clamp-1 max-w-xs">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <p className="text-white font-bold font-display text-lg">
                      Rp {product.pricePerDay.toLocaleString("id-ID")}<span className="text-white/60 text-sm font-normal">/hari</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {bannerProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeSlide ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── FILTER TABS & SEARCH ── */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8 w-full relative z-20">
          <div className="w-full md:w-auto overflow-x-auto pb-2 -mb-2 md:pb-0 md:mb-0 no-scrollbar">
            <div className="flex w-max md:w-auto md:flex-wrap gap-3 mx-auto">
              <CategoryTabGroup
                categories={categories}
                active={activeCategory}
                onChange={setActiveCategory}
                className="flex-nowrap md:flex-wrap"
              />
            </div>
          </div>

          <div className="w-[1px] h-10 bg-gray-300 hidden md:block shrink-0" />

          <div className="relative w-full md:w-auto shrink-0">
            <div className="relative flex items-center w-full md:w-64 h-[44px] rounded-full border border-gray-200 bg-white px-4 hover:border-gray-300 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari perlengkapan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-brand-dark-soft text-[15px] font-body placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* ── PRODUCT GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20 relative z-10">
          {filtered.length > 0 ? (
            filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full py-24 text-center text-gray-500 font-body">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-xl font-display font-medium mb-2 text-brand-dark-soft">Produk tidak ditemukan</p>
              <p>Coba cari dengan kata kunci lain atau pilih kategori "All".</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
