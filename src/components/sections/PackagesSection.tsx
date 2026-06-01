import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { packages } from "@/data/packages";

export default function PackagesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Paket Hemat & Praktis</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Tidak perlu bingung menyusun daftar bawaan. Pilih paket bundling kami
            yang sudah disesuaikan dengan jumlah rombonganmu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border hover:shadow-xl transition-shadow"
            >
              {/* Foto Paket */}
              <div className="relative h-48 bg-gray-200">
                <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
              </div>

              {/* Detail */}
              <div className="p-5">
                <h3 className="font-bold text-lg">{pkg.name}</h3>
                <ul className="mt-3 space-y-1">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Mulai dari</p>
                    <p className="font-bold text-brand-orange">
                      Rp {pkg.price.toLocaleString("id-ID")}/hari
                    </p>
                  </div>
                  <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-4">
                    Pilih Paket
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
