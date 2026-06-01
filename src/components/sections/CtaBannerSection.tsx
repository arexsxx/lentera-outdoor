import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaBannerSection() {
  return (
    <section className="relative py-20 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute inset-0 bg-brand-orange/80" />
      </div>

      {/* Konten */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-black leading-tight">
          Siap Memulai
          <br />
          Petualanganmu?
        </h2>
        <p className="mt-4 text-white/90 max-w-md mx-auto">
          Lengkapi kebutuhan mendaki dan camping-mu bersama kami. Proses sewa mudah,
          cepat, dan terpercaya.
        </p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white text-white bg-transparent hover:bg-white/20 px-8"
          >
            <Link href="/catalog">Lihat Katalog</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-brand-orange hover:bg-gray-100 px-8 font-bold"
          >
            <Link href="/sewa">Mulai Sewa</Link>
          </Button>
        </div>
      </div>

    </section>
  );
}
