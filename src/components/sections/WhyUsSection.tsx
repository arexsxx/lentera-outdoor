import Image from "next/image";
import { Package, Sparkles, Clock, Star } from "lucide-react";
import { WhyCard } from "@/components/ui/why-card";
import { AbstractBackground } from "@/components/ui/abstract-background";

const features = [
  {
    icon: Package,
    title: "Pilihan Alat Terlengkap",
    desc: "Mulai dari tenda, carrier, hingga alat masak dan sepatu gunung, temukan berbagai perlengkapan dari merek andalan untuk segala rute pendakianmu.",
  },
  {
    icon: Sparkles,
    title: "Bersih & Terawat Sempurna",
    desc: "Setiap barang selalu dipastikan kelayakannya, dicek, dan dicuci bersih setelah dipakai. Kamu bisa langsung fokus muncak tanpa khawatir soal alat rusak.",
  },
  {
    icon: Clock,
    title: "Durasi Sewa Fleksibel",
    desc: "Hitungan sewa harian yang mudah disesuaikan dengan jadwalmu. Sangat cocok untuk camping ceria akhir pekan maupun ekspedisi panjang berhari-hari.",
  },
  {
    icon: Star,
    title: "Rekomendasi Tepat",
    desc: "Bingung butuh alat kapasitas berapa? Tim kami siap membantu merekomendasikan perlengkapan yang paling pas dengan destinasi dan jumlah rombonganmu.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <AbstractBackground />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">

          {/* Gambar Kiri */}
          <div className="group relative w-full lg:w-[518px] aspect-[4/5] lg:h-[668px] rounded-[20px] overflow-hidden bg-gray-200 lg:-ml-[56px] flex-shrink-0 shadow-lg">
            <Image
              src="/images/whyimg.jpg"
              alt="Kenapa Memilih Lentera Outdoor"
              fill
              sizes="518px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Konten Kanan */}
          <div className="flex-1 min-w-0 flex flex-col justify-start gap-14">

            {/* Header */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium font-display leading-tight">
                Kenapa Memilih Lentera Outdoor?
              </h2>
              <p className="text-[#676B6C] text-xl font-normal font-body leading-6">
                Peralatan terawat dan layanan terpercaya kami siap membuat setiap
                perjalanan alammu lebih aman, nyaman, dan berkesan.
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-11">
              {/* Baris 1 */}
              <div className="flex gap-11">
                {features.slice(0, 2).map((f) => (
                  <WhyCard key={f.title} icon={f.icon} title={f.title} description={f.desc} />
                ))}
              </div>
              {/* Baris 2 */}
              <div className="flex gap-11">
                {features.slice(2, 4).map((f) => (
                  <WhyCard key={f.title} icon={f.icon} title={f.title} description={f.desc} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
