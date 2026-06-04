import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export function ProductCard({ image, title, description, price }: ProductCardProps) {
  return (
    <div className="w-full h-full px-3 py-6 bg-slate-50 hover:bg-slate-100 rounded-[20px] flex flex-col justify-between items-center gap-5 transition-colors duration-300">
      <div className="self-stretch flex flex-col justify-center items-center gap-3">
        <div className="group/img relative w-full aspect-square max-w-[224px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 224px"
            className="object-contain transition-transform duration-500 ease-out group-hover/img:scale-110"
          />
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <h3 className="self-stretch text-center text-brand-dark-soft text-xl font-semibold font-body leading-6">
            {title}
          </h3>
          <p className="self-stretch text-center text-[#676B6C] text-sm font-normal font-body leading-tight line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      <div className="self-stretch text-center text-brand-orange text-sm font-semibold font-body leading-4">
        Rp {price.toLocaleString("id-ID")}/Day
      </div>
    </div>
  );
}
