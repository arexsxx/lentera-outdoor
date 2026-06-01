"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategoryTabGroup } from "@/components/ui/category-tab";
import { products } from "@/data/products";
import { ListFilter } from "lucide-react";

const categories = ["All", "Backpack", "Tenda", "Sepatu", "Cook", "Emergency"];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-10 mx-auto">
          <h2 className="max-w-[828px] text-foreground text-5xl font-medium font-display leading-[57.60px]">
            Pilihan Perlengkapan Terbaik
          </h2>
          <p className="max-w-[774px] text-[#676B6C] text-xl font-normal font-body leading-6 mt-2">
            Siap disewa untuk menemani perjalanan alammu
          </p>
        </div>

        {/* Filter Tabs & Filter Button */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
          <CategoryTabGroup
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          
          <div className="w-[1px] h-10 bg-gray-300 hidden md:block"></div>
          
          <button className="px-4 py-3 rounded-xl inline-flex justify-center items-center gap-3 transition-colors bg-slate-50 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] hover:text-brand-orange text-black font-body font-medium text-xl leading-6 group">
            <span className="size-7 flex items-center justify-center rounded-md flex-shrink-0" style={{ backgroundColor: "#F4F8FC" }}>
              <ListFilter size={18} className="text-black group-hover:text-brand-orange transition-colors" strokeWidth={1.75} />
            </span>
            Filter
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow group"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-2 text-brand-orange font-bold text-sm">
                  Rp {product.pricePerDay.toLocaleString("id-ID")}/day
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="rounded-full px-8 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
          >
            Lihat Lainnya →
          </Button>
        </div>

      </div>
    </section>
  );
}
