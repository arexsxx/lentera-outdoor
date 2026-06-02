"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategoryTabGroup } from "@/components/ui/category-tab";
import { products } from "@/data/products";
import { ListFilter, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";

const categories = ["All", "Backpack", "Tenda", "Sepatu", "Cook", "Emergency"];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 bg-transparent">
      <div className="mx-auto max-w-[1440px] px-[56px]">

        {/* Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-10 mx-auto">
          <h2 className="max-w-[828px] text-foreground text-5xl font-medium font-display leading-[57.60px]">
            Pilihan Perlengkapan Terbaik
          </h2>
          <p className="max-w-[774px] text-[#676B6C] text-lg font-normal font-body leading-6 mt-2">
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
          
          <Button variant="outline" size="lg" className="gap-2">
            <ListFilter size={16} />
            Filter
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.name}
              description={product.description}
              price={product.pricePerDay}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button size="lg">
            Lihat Lainnya
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

      </div>
    </section>
  );
}
