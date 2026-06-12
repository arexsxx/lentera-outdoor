import HeroSection from "@/components/sections/HeroSection";
import BrandSection from "@/components/sections/BrandSection";
import ProductsSection from "@/components/sections/ProductsSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";
import { supabase } from "@/lib/supabase";
import { Product } from "@/data/products";

// Revalidate every hour or adjust as needed, or omit if you want purely dynamic
export const revalidate = 3600;

export default async function HomePage() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  const initialProducts: Product[] = data
    ? data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category as any,
        pricePerDay: item.price_per_day,
        description: item.description,
        image: item.image,
      }))
    : [];

  return (
    <main>
      <HeroSection />
      <BrandSection />
      <ProductsSection initialProducts={initialProducts} />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </main>
  );
}
