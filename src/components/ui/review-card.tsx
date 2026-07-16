import { Quote, Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  review: string;
  rating?: number; // Nilai default 5 akan dipakai jika tidak diisi
}

export function ReviewCard({ name, review, rating = 5 }: ReviewCardProps) {
  return (
    <div className="flex flex-col bg-[#F9F9FA] rounded-[32px] p-8 transition-all duration-300 h-[320px] w-full text-left justify-between group cursor-default hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-transparent hover:border-gray-100">
      
      {/* Ikon Kutipan (Quote) dari Lucide React */}
      <div className="flex-shrink-0">
        <Quote 
          className="w-8 h-8 text-brand-orange/20 transition-colors duration-300 fill-current" 
          strokeWidth={1}
        />
      </div>

      {/* Teks Review menggunakan font-body tema Lentera */}
      <div className="relative flex-1 overflow-hidden mt-6 mb-4">
        <p className="text-brand-dark-soft text-[17px] font-medium font-body leading-relaxed">
          “{review}”
        </p>
        {/* Mask untuk efek memudar menyesuaikan warna background card */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F9F9FA] to-transparent pointer-events-none"></div>
      </div>

      {/* Bintang & Nama User */}
      <div className="flex-shrink-0 flex flex-col gap-2.5">
        {/* Render Bintang */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-[#ff5b04] fill-[#ff5b04]" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-[#7A7A7A] font-medium font-body text-sm tracking-wide">
          {name}
        </span>
      </div>
      
    </div>
  );
}
