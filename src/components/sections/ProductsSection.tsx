"use client";

import { useState } from "react";
import { CategoryTabGroup } from "@/components/ui/category-tab";
import { Product } from "@/data/products";
import { Search, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";

const categories = ["All", "Backpack", "Tenda", "Sepatu", "Cook", "Emergency"];

export default function ProductsSection({ initialProducts }: { initialProducts: Product[] }) {
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

  return (
    <section className="py-8 md:py-16 bg-transparent">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px]">

        {/* Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-12 mx-auto">
          <h2 className="text-4xl md:text-5xl font-display text-brand-dark-soft tracking-tight mb-4 leading-tight">
            <span className="font-medium">Eksplorasi Perlengkapan</span><br />
            <span className="font-bold">Outdoor Terbaik</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-body max-w-2xl">
            Peralatan berkualitas tinggi dan siap disewa untuk petualangan Anda selanjutnya.
          </p>
        </div>

        {/* Filter Tabs & Search */}
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
           
          <div className="w-[1px] h-10 bg-gray-300 hidden md:block shrink-0"></div>
          
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

        {/* Product Grid / Slider on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 no-scrollbar">
          {filtered.length > 0 ? (
            filtered.slice(0, 8).map((product, index) => (
              <div key={product.id} className="w-[75vw] sm:w-auto shrink-0 snap-center sm:snap-align-none">
                <ProductCard
                  product={product}
                  index={index}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500 font-body w-full shrink-0">
              <p className="text-xl font-medium mb-2">Produk tidak ditemukan</p>
              <p>Coba cari dengan kata kunci lain atau pilih kategori "All".</p>
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button variant="default" className="shadow-lg">
            Lihat Semua Katalog
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

      </div>
    </section>
  );
}
