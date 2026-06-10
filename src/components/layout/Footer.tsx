import Link from "next/link";
import Image from "next/image";
import { AtSign, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-orange text-white py-12">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[56px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Kolom 1: About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo-white.png" alt="Lentera" width={28} height={28} />
              <div>
                <p className="font-bold text-sm">LENTERA</p>
                <p className="text-xs text-white/80">Outdoor</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Solusi penyewaan perlengkapan outdoor terlengkap dan terpercaya
              untuk para petualang Indonesia.
            </p>
          </div>

          {/* Kolom 2: Jelajahi */}
          <div>
            <h4 className="font-semibold mb-4">Jelajahi</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {["Beranda", "Katalog", "Review", "About Us"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Bantuan Sewa */}
          <div>
            <h4 className="font-semibold mb-4">Bantuan Sewa</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {["Cara Pemesanan", "Syarat & Ketentuan", "Kebijakan Privasi", "FAQ"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami */}
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex gap-2 items-start">
                <AtSign className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <span>@lenteraoutdoor</span>
              </li>
              <li className="flex gap-2 items-start">
                <Phone className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <span>Jl. Outdoor No. 1, Bandung</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/60">
          <p>© 2025 Lentera Outdoor. All rights reserved.</p>
          <p>Designed by @omcipak.project</p>
        </div>
      </div>
    </footer>
  );
}
