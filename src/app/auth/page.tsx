"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LockKeyhole, Sparkles, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "signup";

function normalizeNextPath(value: string | null) {
  if (!value || !value.startsWith("/")) {
    return "/checkout";
  }

  return value;
}

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, isLoading } = useAuth();
  const nextPath = useMemo(
    () => normalizeNextPath(searchParams.get("next")),
    [searchParams],
  );
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (session) {
      router.replace(nextPath);
    }
  }, [nextPath, router, session]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        router.replace(nextPath);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${nextPath}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.replace(nextPath);
        return;
      }

      setMessage("Cek email untuk verifikasi.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#f4f8fc_0%,#fbfcfd_38%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="absolute right-[-5rem] top-[-3rem] h-72 w-72 rounded-full bg-brand-dark/10 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-gray/70 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-[1440px] items-center justify-center px-4 py-16 md:px-8 lg:px-[56px]">
        <div className="w-full max-w-[430px]">
          <Card className="overflow-hidden border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(7,80,86,0.12)] backdrop-blur-md">
            <div className="h-1 bg-gradient-to-r from-brand-orange via-brand-orange-dark to-brand-dark-soft" />
            <CardContent className="space-y-5 p-6 pt-7 md:p-8 md:pt-9">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-dark shadow-sm">
                  <Sparkles className="h-4 w-4 text-brand-orange" />
                  Lentera
                </div>
              </div>

              <div className="flex rounded-[1.2rem] bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`flex-1 rounded-[0.95rem] px-4 py-3 text-sm font-semibold transition ${
                    mode === "signup"
                      ? "bg-white text-brand-dark-soft shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Daftar
                </button>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`flex-1 rounded-[0.95rem] px-4 py-3 text-sm font-semibold transition ${
                    mode === "login"
                      ? "bg-white text-brand-dark-soft shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Masuk
                </button>
              </div>

              <div className="space-y-1 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-brand-dark-soft md:text-4xl">
                  {mode === "signup" ? "Daftar" : "Masuk"}
                </h1>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  {mode === "signup" ? "Buat akun" : "Lanjut checkout"}
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Email"
                      className="w-full rounded-[1.15rem] border border-slate-200 bg-white px-11 py-3 text-sm text-brand-dark-soft outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Password"
                      className="w-full rounded-[1.15rem] border border-slate-200 bg-white px-11 py-3 text-sm text-brand-dark-soft outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                    />
                  </div>
                </div>

                {message ? (
                  <div className="rounded-2xl border border-brand-orange/20 bg-brand-orange/5 px-4 py-3 text-sm text-brand-dark-soft">
                    {message}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-[1.15rem]"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting
                    ? "..."
                    : mode === "signup"
                      ? "Daftar"
                      : "Masuk"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>

              <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                <Link href="/catalog" className="hover:text-brand-orange">
                  Katalog
                </Link>
                <span>Lentera Outdoor</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
