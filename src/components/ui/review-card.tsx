import { Quote, Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  review: string;
  rating?: number; // Nilai default 5 akan dipakai jika tidak diisi
}

export function ReviewCard({ name, review, rating = 5 }: ReviewCardProps) {
  return (
    <div className="flex flex-col bg-slate-50 hover:bg-slate-100 rounded-[20px] p-8 transition-colors duration-300 h-[320px] w-full text-left justify-between group cursor-default">
      
      {/* Ikon Kutipan (Quote) dari Lucide React */}
      <div className="flex-shrink-0">
        <Quote 
          className="w-10 h-10 text-muted transition-colors group-hover:text-primary/20 duration-300 fill-current" 
          strokeWidth={1}
        />
      </div>

      {/* Teks Review menggunakan font-body tema Lentera */}
      <div className="relative flex-1 overflow-hidden mt-6 mb-4">
        <p className="text-black text-xl font-normal font-['Plus_Jakarta_Sans'] leading-6">
          “{review}”
        </p>
        {/* Mask untuk efek memudar menyesuaikan warna background card */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent group-hover:from-slate-100 group-hover:via-slate-100/90 transition-colors duration-300 pointer-events-none"></div>
      </div>

      {/* Bintang & Nama User */}
      <div className="flex-shrink-0 flex flex-col gap-2.5">
        {/* Render Bintang */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-primary font-semibold font-display text-lg tracking-wide uppercase">
          {name}
        </span>
      </div>
      
    </div>
  );
}
