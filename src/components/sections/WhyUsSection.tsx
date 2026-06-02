import Image from "next/image";
import { Package, Sparkles, Clock, Star } from "lucide-react";
import { WhyCard } from "@/components/ui/why-card";

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
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-[56px]">
        <div className="flex items-start gap-12">

          {/* Gambar Kiri */}
          <div className="relative w-[518px] h-[668px] rounded-[20px] overflow-hidden bg-gray-200 -ml-[56px] flex-shrink-0">
            <Image
              src="/images/whyimg.jpg"
              alt="Kenapa Memilih Lentera Outdoor"
              fill
              sizes="518px"
              className="object-cover"
            />
          </div>

          {/* Konten Kanan */}
          <div className="flex-1 min-w-0 flex flex-col justify-start gap-14">

            {/* Header */}
            <div className="flex flex-col gap-3">
              <h2 className="text-5xl font-medium font-display leading-[57.60px]">
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
