"use client";

import { useState, useEffect } from "react";
import { CategoryTabGroup } from "@/components/ui/category-tab";
import { Product } from "@/data/products";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const categories = ["All", "Backpack", "Tenda", "Sepatu", "Cook", "Emergency"];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        const mappedProducts: Product[] = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category as any,
          pricePerDay: item.price_per_day,
          description: item.description,
          image: item.image,
        }));
        setProducts(mappedProducts);
      }
      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  let filtered =
    activeCategory === "All"
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
    );
  }

  return (
    <section className="py-16 bg-transparent">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px]">

        {/* Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-10 mx-auto">
          <h2 className="max-w-[828px] text-foreground text-3xl md:text-4xl lg:text-5xl font-medium font-display leading-tight">
            Pilihan Perlengkapan Terbaik
          </h2>
          <p className="max-w-[774px] text-[#676B6C] text-lg font-normal font-body leading-6 mt-2">
            Siap disewa untuk menemani perjalanan alammu
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
            <div className="relative flex items-center w-full md:w-64 h-[48px] rounded-xl border border-gray-200 bg-white px-4 shadow-sm focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange transition-all">
              <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari perlengkapan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-brand-dark-soft text-sm font-body placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {isLoading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-brand-orange">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="text-gray-500 font-body">Memuat produk...</p>
            </div>
          ) : filtered.length > 0 ? (
            filtered.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500 font-body">
              <p className="text-xl font-medium mb-2">Produk tidak ditemukan</p>
              <p>Coba cari dengan kata kunci lain atau pilih kategori "All".</p>
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button size="lg" className="rounded-full">
            Lihat Lainnya
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

      </div>
    </section>
  );
}
