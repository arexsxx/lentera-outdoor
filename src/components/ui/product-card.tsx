"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="w-full h-full p-4 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-orange/30 rounded-[20px] flex flex-col justify-between items-center gap-4 transition-colors duration-300 relative group"
    >
      <div className="self-stretch flex flex-col justify-center items-center gap-3">
        <div className="group/img relative w-full aspect-square max-w-[224px] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 224px"
            className="object-contain transition-transform duration-500 ease-out group-hover/img:scale-110"
          />
        </div>
        <div className="self-stretch flex flex-col justify-start items-center gap-1 mt-2">
          <h3 className="self-stretch text-center text-brand-dark-soft text-xl font-semibold font-body leading-6 line-clamp-1">
            {product.name}
          </h3>
          <p className="self-stretch text-center text-[#676B6C] text-sm font-normal font-body leading-tight line-clamp-2 min-h-[36px]">
            {product.description}
          </p>
        </div>
      </div>
      <div className="self-stretch flex flex-col gap-3 w-full mt-2">
        <div className="text-center text-brand-orange text-sm font-bold font-body">
          Rp {product.pricePerDay.toLocaleString("id-ID")}<span className="text-gray-400 font-normal text-xs">/Hari</span>
        </div>
        <Button 
          onClick={() => addToCart(product)}
          variant="outline" 
          className="w-full h-11 rounded-xl border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Sewa
        </Button>
      </div>
    </motion.div>
  );
}
