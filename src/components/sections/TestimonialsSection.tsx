"use client";
import { testimonials } from "@/data/testimonials";
import { ReviewCard } from "@/components/ui/review-card";
import { AbstractBackground } from "@/components/ui/abstract-background";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function TestimonialsSection() {
  // Komponen Helper untuk satu set kartu (menjamin jarak gap konsisten saat di-loop)
  const TestimonialSet = () => (
    <div className="flex gap-6 pr-6">
      {testimonials.map((t, i) => (
        <div key={i} className="w-[300px] md:w-[350px] flex-shrink-0">
          <ReviewCard
            name={t.name}
            review={t.review}
            rating={t.rating}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-8 md:py-16 bg-white overflow-hidden">

      
      {/* Inline Styles untuk animasi Infinite Scroll Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          /* Opsional: Berhenti saat disentuh mouse agar mudah dibaca */
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] relative">
        {/* Heading disesuaikan dengan gaya ProductsSection */}
        <div className="flex flex-col items-center justify-center text-center mb-12 mx-auto">
          <h2 className="text-4xl md:text-5xl font-display text-brand-dark-soft tracking-tight mb-4 leading-tight">
            <span className="font-medium">Pengalaman Nyata</span><br />
            <span className="font-bold">Sobat Lentera</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-body max-w-2xl">
            Dipercaya oleh ribuan pendaki dan keluarga untuk merasakan momen terbaik di alam.
          </p>
        </div>
      </div>

      {/* Area Marquee yang meluber ke layar */}
      <div className="relative w-full flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] pb-8 pt-4">
        {/* Lebar w-max memastikan isinya memanjang ke kanan */}
        <div className="flex w-max animate-marquee">
          {/* Kita pasang 4 set agar sangat panjang menutupi layar PC sekalipun */}
          <TestimonialSet />
          <TestimonialSet />
          <TestimonialSet />
          <TestimonialSet />
        </div>
      </div>

      {/* Call to Action (CTA) */}
      <div className="flex justify-center mt-6">
        <Button variant="default" asChild>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Lentera+Outdoor+Krandang+Kediri" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MapPin className="w-4 h-4" />
            Tulis Ulasan di Google Maps
          </a>
        </Button>
      </div>

    </section>
  );
}
