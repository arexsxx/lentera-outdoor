import Image from "next/image";

const brands = [
  { name: "Greenforest",  logo: "/images/brands/greenforest.png" },
  { name: "Antarestar",   logo: "/images/brands/antarestar.png" },
  { name: "Zarventure",   logo: "/images/brands/zarventure.png" },
  { name: "Credivox",     logo: "/images/brands/credivox.png" },
  { name: "Seekday",      logo: "/images/brands/seekday2.png" },
];

export default function BrandSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-[56px] flex flex-col items-center gap-10">

        {/* Title — Figma: text-5xl font-medium font-Outfit */}
        <h2 className="text-center text-foreground text-5xl font-medium font-display leading-[57.60px]">
          Our Rent Product
        </h2>

        {/* Logo Row — Figma: w-52 h-20 rounded-xl gap-9 */}
        <div className="flex flex-row items-center gap-6 w-full">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="relative flex-1 h-20 rounded-xl overflow-hidden"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="20vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
