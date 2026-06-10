"use client";

import { useState, useEffect } from "react";
import { CategoryTabGroup } from "@/components/ui/category-tab";
import { Product } from "@/data/products";
import { Search, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { AbstractBackground } from "@/components/ui/abstract-background";
import { supabase } from "@/lib/supabase";

const categories = ["All", "Backpack", "Tenda", "Sepatu", "Cook", "Emergency"];

export default function CatalogPage() {
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
    <main className="min-h-screen bg-brand-light relative overflow-hidden pt-24 pb-20">
      <AbstractBackground />
      
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px]">
        
        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 mx-auto pt-8 md:pt-12">
          <h1 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight drop-shadow-sm">
            Katalog Produk
          </h1>
          <p className="max-w-2xl text-[#676B6C] text-lg font-normal font-body leading-relaxed mt-4">
            Temukan berbagai perlengkapan outdoor berkualitas untuk menemani setiap petualanganmu. Kami menyediakan pilihan terbaik dengan harga sewa terjangkau.
          </p>
        </div>

        {/* Filters and Search Container */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10 w-full bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm">
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
           
          <div className="w-[1px] h-10 bg-gray-300 hidden md:block shrink-0 mx-2"></div>
          
          <div className="relative w-full md:w-auto shrink-0">
            <div className="relative flex items-center w-full md:w-[320px] h-[48px] rounded-xl border border-gray-200 bg-white px-4 shadow-sm focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange transition-all">
              <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari perlengkapan outdoor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-brand-dark-soft text-sm font-body placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-brand-orange bg-white/50 rounded-3xl border border-dashed border-gray-300">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="text-xl font-medium font-body text-brand-dark-soft">Memuat katalog...</p>
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center text-gray-500 font-body bg-white/50 rounded-3xl border border-dashed border-gray-300">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-2xl font-display font-medium mb-2 text-brand-dark-soft">Produk tidak ditemukan</p>
              <p>Coba cari dengan kata kunci lain atau periksa ejaan Anda.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
