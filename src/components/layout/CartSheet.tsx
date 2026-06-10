"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CartSheet() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.pricePerDay * item.quantity, 0);

  const handleCheckout = () => {
    let message = "Halo Lentera Outdoor, saya ingin menyewa perlengkapan berikut:\n\n";
    cartItems.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) = Rp ${(item.pricePerDay * item.quantity).toLocaleString("id-ID")}\n`;
    });
    message += `\nTotal: Rp ${total.toLocaleString("id-ID")} / hari.\n\nApakah barang tersedia?`;
    
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-[90vw] sm:max-w-md flex flex-col p-0 bg-white shadow-2xl border-l border-gray-100 z-[100]">
        <SheetHeader className="p-6 border-b border-gray-100 flex-shrink-0">
          <SheetTitle className="text-2xl font-display text-brand-dark-soft flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-brand-orange" />
            Keranjang Sewa
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 text-gray-500">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-lg font-body text-brand-dark-soft font-medium">Keranjangmu masih kosong.</p>
              <p className="text-sm font-body max-w-[250px]">Yuk pilih alat petualanganmu dulu di katalog kami!</p>
              <Button asChild onClick={() => setIsCartOpen(false)} className="mt-6 rounded-full px-8 shadow-sm" variant="outline">
                <Link href="/catalog">Lihat Katalog</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-brand-dark-soft text-sm md:text-base leading-tight truncate">{item.name}</h4>
                    <p className="text-brand-orange font-semibold text-sm mt-1">Rp {item.pricePerDay.toLocaleString("id-ID")}<span className="text-xs text-gray-400 font-normal">/hari</span></p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:text-brand-orange text-gray-500 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:text-brand-orange text-gray-500 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.02)] flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium font-body">Total Harga</span>
              <span className="text-2xl font-bold font-display text-brand-dark-soft">Rp {total.toLocaleString("id-ID")}</span>
            </div>
            <Button 
              size="lg" 
              className="w-full rounded-xl font-bold bg-[#25D366] hover:bg-[#1EBE57] text-white shadow-lg shadow-[#25D366]/30 py-6 text-lg transition-all border-none"
              onClick={handleCheckout}
            >
              Checkout ke WhatsApp
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
