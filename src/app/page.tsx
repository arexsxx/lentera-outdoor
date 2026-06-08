import HeroSection from "@/components/sections/HeroSection";
import BrandSection from "@/components/sections/BrandSection";
import ProductsSection from "@/components/sections/ProductsSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandSection />
      <ProductsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </main>
  );
}
