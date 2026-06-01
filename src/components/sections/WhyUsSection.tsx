import Image from "next/image";
import { Package, Sparkles, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Pilihan Alat Terlengkap",
    desc: "Tersedia berbagai perlengkapan untuk hiking, camping, mendaki gunung dari berbagai kategori.",
  },
  {
    icon: Sparkles,
    title: "Bersih & Terawat Sempurna",
    desc: "Setiap alat dibersihkan dan dicek sebelum dipinjamkan, sehingga kamu selalu mendapat peralatan prima.",
  },
  {
    icon: Clock,
    title: "Durasi Sewa Fleksibel",
    desc: "Tentukan sendiri berapa hari kamu membutuhkan peralatan. Harga yang kompetitif dan transparan.",
  },
  {
    icon: Star,
    title: "Rekomendasi Tepat",
    desc: "Bingung butuh apa? Tim kami siap membantu merekomendasikan perlengkapan sesuai destinasimu.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Gambar Kiri */}
          <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-200">
          </div>

          {/* Konten Kanan */}
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Kenapa Memilih Lentera Outdoor?
            </h2>
            <p className="text-muted-foreground mb-8">
              Peralatan terawat dan layanan terpercaya kami siap membuat setiap
              perjalanan alammu lebih aman, nyaman, dan berkesan.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="font-semibold text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
