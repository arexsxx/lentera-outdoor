"use client";

import Image from "next/image";
import { Package, Sparkles, Clock, Star } from "lucide-react";
import { WhyCard } from "@/components/ui/why-card";
import { AbstractBackground } from "@/components/ui/abstract-background";
import { motion, Variants } from "framer-motion";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyUsSection() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <AbstractBackground />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">

          {/* Gambar Kiri */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative w-full lg:w-[518px] aspect-[4/5] lg:h-[668px] rounded-[20px] overflow-hidden bg-gray-200 lg:-ml-[56px] flex-shrink-0 shadow-lg"
          >
            <Image
              src="/images/whyimg.jpg"
              alt="Kenapa Memilih Lentera Outdoor"
              fill
              sizes="(max-width: 1024px) 100vw, 518px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>

          {/* Konten Kanan */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 min-w-0 flex flex-col justify-start gap-14"
          >

            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-tight">
                Kenapa Memilih Lentera Outdoor?
              </h2>
              <p className="text-gray-500 text-xl font-normal font-body leading-relaxed">
                Peralatan terawat dan layanan terpercaya kami siap membuat setiap
                perjalanan alammu lebih aman, nyaman, dan berkesan.
              </p>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-11">
              {features.map((f) => (
                <motion.div variants={itemVariants} key={f.title} className="flex h-full">
                  <WhyCard icon={f.icon} title={f.title} description={f.desc} />
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
