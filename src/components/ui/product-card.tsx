"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onClick={() => addToCart(product)}
      className="group flex flex-col items-center p-6 md:p-8 bg-[#F9F9FA] rounded-[32px] cursor-pointer hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 h-full border border-transparent hover:border-gray-100"
      title="Klik untuk menyewa"
    >
      {/* Image Area */}
      <div className="relative w-full aspect-square mb-6 md:mb-8">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-sm mix-blend-multiply"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col items-center flex-grow w-full">
        <h3 className="text-base md:text-[17px] font-bold font-display text-brand-dark-soft text-center mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-[13px] font-body text-[#7A7A7A] text-center leading-relaxed mb-5 line-clamp-2 flex-grow px-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="text-brand-orange font-bold font-display text-[15px] mt-auto">
          Rp {product.pricePerDay.toLocaleString("id-ID")}<span className="font-semibold text-brand-orange/80">/Hari</span>
        </div>
      </div>
    </motion.div>
  );
}
