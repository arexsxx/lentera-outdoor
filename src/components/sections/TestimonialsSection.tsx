"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  // Tampilkan 4 testimoni per slide (bisa digeser)
  const visible = testimonials.slice(current, current + 4);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-[56px]">

        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Apa yang sobat Lentera katakan</h2>
            <p className="text-muted-foreground mt-2 max-w-sm">
              Dipercaya oleh para pendaki dan keluarga untuk merasakan momen terbaik di alam.
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-orange-dark transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {visible.map((t, i) => (
            <div key={i} className="border rounded-2xl p-5 bg-white hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${si < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700 line-clamp-4">"{t.review}"</p>
              <p className="mt-4 font-semibold text-sm text-brand-orange">{t.name}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
