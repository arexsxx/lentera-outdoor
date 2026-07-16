import Link from "next/link";
import Image from "next/image";
import { MapPin, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-brand-dark-soft pt-8 md:pt-16 pb-0 flex flex-col mt-auto">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Kolom 1: About */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.png"
                alt="Lentera"
                width={48}
                height={48}
                className="dark:invert"
                unoptimized
              />
              <div>
                <p className="font-bold text-xl leading-none text-gray-900 dark:text-white font-display tracking-wide">
                  LENTERA
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Outdoor
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-sm">
              Solusi persewaan alat outdoor tepercaya. Kami menyediakan
              perlengkapan alam bebas yang terawat, higienis, dan ramah di
              kantong untuk setiap langkah petualanganmu.
            </p>
            <a
              href="tel:+6285706072574"
              className="inline-flex items-center gap-2 text-brand-orange hover:opacity-80 transition-opacity font-medium"
            >
              <PhoneCall className="w-5 h-5" />
              <span>085706072574</span>
            </a>
          </div>

          {/* Kolom 2: Jelajahi */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 font-display">
              Jelajahi
            </h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              {[
                "Beranda",
                "About us",
                "Katalog",
                "Testimoni",
                "Paket Bundling",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Bantuan Sewa */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 font-display">
              Bantuan Sewa
            </h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              {[
                "Cara Menyewa",
                "Syarat & Ketentuan Sewa",
                "Tips Merawat Alat",
                "FAQ (Pertanyaan Umum)",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="hover:text-brand-orange transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 font-display">
              Hubungi Kami
            </h4>
            <ul className="space-y-5 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex gap-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram w-5 h-5 text-brand-orange flex-shrink-0"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Lenteraoudoor45
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-music w-5 h-5 text-brand-orange flex-shrink-0"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Lenteraoudoor
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jl. Sumberjo, Dusun Kradang, Krandang, Kec. Kras, Kabupaten
                  Kediri, Jawa Timur 64172
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-brand-orange w-full">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px] py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white font-medium">
          <p>© 2026 Lentera Outdoor. All Rights Reserved.</p>
          <p>Designed & Developed with @omcipak.project</p>
        </div>
      </div>
    </footer>
  );
}
