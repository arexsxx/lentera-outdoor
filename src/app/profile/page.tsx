"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  CircleUserRound,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

type ProfileRow = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
};

type CheckoutDraftRow = {
  id: string;
  pickup_date: string;
  total: number;
  status: string;
  created_at: string;
};

function formatCurrency(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function ProfilePage() {
  const router = useRouter();
  const { session, isLoading } = useAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [drafts, setDrafts] = useState<CheckoutDraftRow[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!session) {
        setIsLoadingData(false);
        return;
      }

      setIsLoadingData(true);

      const [profileResult, draftsResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, email, full_name, created_at, updated_at")
          .eq("id", session.user.id)
          .single(),
        supabase
          .from("checkout_drafts")
          .select("id, pickup_date, total, status, created_at")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(3),
      ]);

      if (profileResult.error) {
        setStatusMessage(profileResult.error.message);
      } else {
        setProfile(profileResult.data as ProfileRow);
      }

      if (draftsResult.error) {
        setStatusMessage(draftsResult.error.message);
      } else {
        setDrafts((draftsResult.data ?? []) as CheckoutDraftRow[]);
      }

      setIsLoadingData(false);
    };

    loadProfile();
  }, [session]);

  const initials = useMemo(() => {
    if (!profile?.full_name) {
      return profile?.email?.slice(0, 2).toUpperCase() ?? "LT";
    }

    return profile.full_name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [profile]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center px-4 py-24 md:px-8 lg:px-[56px]">
        <div className="rounded-3xl border border-white/80 bg-white/90 px-6 py-5 text-sm text-slate-600 shadow-lg">
          Memuat akun...
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f8fc_0%,#fcfdfe_45%,#ffffff_100%)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-[-8rem] h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
          <div className="absolute top-28 left-[-7rem] h-64 w-64 rounded-full bg-brand-dark/10 blur-3xl" />
        </div>

        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1440px] items-center px-4 py-24 md:px-8 lg:px-[56px]">
          <Card className="w-full border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(7,80,86,0.12)] backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-brand-dark-soft md:text-3xl">
                Profil belum masuk
              </CardTitle>
              <CardDescription>
                Masuk atau daftar dulu untuk melihat profil dan riwayat
                checkout.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/auth">
                  <CircleUserRound className="h-5 w-5" />
                  Masuk / Daftar
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="/catalog">
                  <ShoppingBag className="h-5 w-5" />
                  Lihat katalog
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f8fc_0%,#fcfdfe_45%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-8rem] h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="absolute top-28 left-[-7rem] h-64 w-64 rounded-full bg-brand-dark/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-brand-gray/70 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-28 md:px-8 lg:px-[56px] md:pt-32">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-brand-orange" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Profil akun
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <Card className="border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(7,80,86,0.12)] backdrop-blur-md">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-brand-dark-soft md:text-3xl">
                Profil saya
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-slate-500">
                Data akun dan ringkasan checkout terbaru.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange font-bold">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Nama akun
                  </p>
                  <p className="text-lg font-bold text-brand-dark-soft">
                    {profile?.full_name || profile?.email}
                  </p>
                  <p className="text-sm text-slate-500">{profile?.email}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    User ID
                  </p>
                  <p className="mt-2 break-all text-sm font-semibold text-brand-dark-soft">
                    {profile?.id}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Akun dibuat
                  </p>
                  <p className="mt-2 text-sm font-semibold text-brand-dark-soft">
                    {profile?.created_at ? formatDate(profile.created_at) : "-"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/checkout">
                    <Package className="h-5 w-5" />
                    Ke checkout
                  </Link>
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5" />
                  Keluar
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(7,80,86,0.12)] backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-brand-dark-soft">
                  Checkout terbaru
                </CardTitle>
                <CardDescription>
                  3 draft terakhir yang tersimpan di database.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingData ? (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Memuat data checkout...
                  </div>
                ) : drafts.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Belum ada draft checkout.
                  </div>
                ) : (
                  drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-brand-dark-soft">
                            {formatDate(draft.created_at)}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            Ambil / sewa: {formatDate(draft.pickup_date)}
                          </p>
                        </div>
                        <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
                          {draft.status}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Total</span>
                        <span className="font-bold text-brand-dark-soft">
                          {formatCurrency(Number(draft.total))}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border-white/80 bg-brand-dark-soft text-white shadow-[0_20px_60px_rgba(7,80,86,0.18)] backdrop-blur-md">
              <CardContent className="space-y-3 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-brand-orange">
                    <CalendarClock className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Akun aktif di database</p>
                    <p className="text-sm leading-relaxed text-white/75">
                      Data profil tersimpan di tabel profiles, dan draft
                      checkout disimpan di checkout_drafts.
                    </p>
                  </div>
                </div>
                {statusMessage ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    {statusMessage}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
