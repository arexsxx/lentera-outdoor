import Image from "next/image";
import { AbstractBackground } from "@/components/ui/abstract-background";

const brands = [
  { name: "Greenforest",  logo: "/images/brands/greenforest.png" },
  { name: "Antarestar",   logo: "/images/brands/antarestar.png" },
  { name: "Zarventure",   logo: "/images/brands/zarventure.png" },
  { name: "Credivox",     logo: "/images/brands/credivox.png" },
  { name: "Seekday",      logo: "/images/brands/seekday2.png" },
];

export default function BrandSection() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <AbstractBackground />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] flex flex-col items-center gap-10">

        {/* Title — Figma: text-5xl font-medium font-Outfit */}
        <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-5xl font-medium font-display leading-tight">
          Brand Terpercaya
        </h2>

        {/* Logo Row — Wrap on mobile so they don't squish */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 w-full max-w-4xl">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="relative w-24 h-12 md:w-32 md:h-16 rounded-xl overflow-hidden"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 100px, 150px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
