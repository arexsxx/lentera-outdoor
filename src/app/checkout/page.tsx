"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, CreditCard, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

type CheckoutDraft = {
  id: string;
  userId: string;
  email: string;
  createdAt: string;
  pickupDate: string;
  notes: string;
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    pricePerDay: number;
  }>;
  total: number;
};

function formatCurrency(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { session, userEmail, isLoading } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [pickupDate, setPickupDate] = useState("");
  const [notes, setNotes] = useState("");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const total = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + item.pricePerDay * item.quantity,
        0,
      ),
    [cartItems],
  );

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/auth?next=/checkout");
    }
  }, [isLoading, router, session]);

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center px-4 py-24 md:px-8 lg:px-[56px]">
        <div className="rounded-3xl border border-white/80 bg-white/90 px-6 py-5 text-sm text-slate-600 shadow-lg">
          Memuat status akun...
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  const handleSaveCheckout = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      setSaveMessage(
        "Keranjang kosong. Tambahkan perlengkapan dulu sebelum checkout.",
      );
      return;
    }

    if (!pickupDate) {
      setSaveMessage("Pilih tanggal pengambilan atau sewa terlebih dahulu.");
      return;
    }

    setIsSaving(true);

    const draft: CheckoutDraft = {
      id: crypto.randomUUID(),
      userId: session.user.id,
      email: userEmail || session.user.email || "",
      createdAt: new Date().toISOString(),
      pickupDate,
      notes,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        pricePerDay: item.pricePerDay,
      })),
      total,
    };

    try {
      const { error } = await supabase.from("checkout_drafts").insert({
        user_id: draft.userId,
        email: draft.email,
        pickup_date: draft.pickupDate,
        notes: draft.notes,
        items: draft.items,
        total: draft.total,
        status: "draft",
      });

      if (error) {
        throw error;
      }

      clearCart();
      setSaveMessage(`Checkout tersimpan di database untuk ${draft.email}.`);
    } catch (error) {
      setSaveMessage(
        error instanceof Error
          ? error.message
          : "Checkout belum tersimpan. Coba lagi nanti.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f8fc_0%,#fcfdfe_40%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-8rem] h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="absolute top-28 left-[-7rem] h-64 w-64 rounded-full bg-brand-dark/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-56 w-56 rounded-full bg-brand-gray/70 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-28 md:px-8 lg:px-[56px] md:pt-32">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm"
          >
            <Link href="/catalog">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke katalog
            </Link>
          </Button>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm">
            <LockKeyhole className="h-4 w-4 text-brand-orange" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Checkout akun aktif
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <Card className="border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(7,80,86,0.12)] backdrop-blur-md">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-brand-dark-soft md:text-3xl">
                Selesaikan checkout
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-slate-500">
                Akun aktif: {userEmail || session.user.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Status", value: "Akun login" },
                  { label: "Keranjang", value: `${cartItems.length} item` },
                  { label: "Total", value: formatCurrency(total) },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-brand-dark-soft">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <form className="space-y-4" onSubmit={handleSaveCheckout}>
                <div className="space-y-2">
                  <label
                    htmlFor="pickupDate"
                    className="text-sm font-semibold text-brand-dark-soft"
                  >
                    Tanggal sewa / ambil barang
                  </label>
                  <input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(event) => setPickupDate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-dark-soft outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="text-sm font-semibold text-brand-dark-soft"
                  >
                    Catatan tambahan
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Contoh: perlu diambil sore, minta set lengkap, atau ada ukuran khusus."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-dark-soft outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                {saveMessage ? (
                  <div className="rounded-2xl border border-brand-orange/20 bg-brand-orange/5 px-4 py-3 text-sm leading-relaxed text-brand-dark-soft">
                    {saveMessage}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSaving || cartItems.length === 0}
                >
                  <CreditCard className="h-5 w-5" />
                  {isSaving ? "Menyimpan..." : "Simpan checkout ke akun"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(7,80,86,0.12)] backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-brand-dark-soft">
                  Ringkasan pesanan
                </CardTitle>
                <CardDescription>
                  Item yang akan disimpan sebagai draft checkout.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Keranjang kosong. Tambahkan produk dulu dari katalog.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div>
                        <p className="font-semibold text-brand-dark-soft">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.quantity}x {formatCurrency(item.pricePerDay)} /
                          hari
                        </p>
                      </div>
                      <p className="text-sm font-bold text-brand-dark-soft">
                        {formatCurrency(item.pricePerDay * item.quantity)}
                      </p>
                    </div>
                  ))
                )}

                <div className="flex items-center justify-between rounded-3xl bg-brand-dark-soft px-5 py-4 text-white">
                  <span className="text-sm text-white/75">Total estimasi</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(total)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/80 bg-brand-dark-soft text-white shadow-[0_20px_60px_rgba(7,80,86,0.18)] backdrop-blur-md">
              <CardContent className="space-y-3 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-brand-orange">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Checkout tetap di website</p>
                    <p className="text-sm leading-relaxed text-white/75">
                      Setelah akun dibuat, pesanan disimpan sebagai draft di
                      akun ini untuk alur checkout internal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
