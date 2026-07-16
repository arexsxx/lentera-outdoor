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
  const BrandSet = () => (
    <div className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="relative w-36 h-20 md:w-56 md:h-28 flex-shrink-0"
        >
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            sizes="(max-width: 768px) 150px, 250px"
            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-8 md:py-16 bg-white overflow-hidden">

      
      {/* Inline Styles untuk animasi Infinite Scroll Marquee */}
      <style>{`
        @keyframes marquee-brands {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-brands {
          animation: marquee-brands 30s linear infinite;
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] flex flex-col items-center mb-12">
        <h2 className="text-center text-3xl md:text-4xl font-display text-brand-dark-soft tracking-tight leading-tight">
          <span className="font-medium">Didukung Oleh</span> <span className="font-bold">Brand Terpercaya</span>
        </h2>
      </div>

      {/* Area Marquee */}
      <div className="relative z-10 w-full flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex w-max animate-marquee-brands items-center">
          <BrandSet />
          <BrandSet />
          <BrandSet />
          <BrandSet />
        </div>
      </div>
    </section>
  );
}
