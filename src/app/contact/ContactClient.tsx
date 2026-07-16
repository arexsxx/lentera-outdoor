"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Copy,
  Globe,
  MapPinned,
  PhoneCall,
  Send,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const phoneDisplay = "0857 0607 2574";
const copyablePhoneNumber = "+62 857 0607 2574";
const contactLink = `tel:+6285706072574`;
const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=Lentera+Outdoor+Krandang+Kediri";
const instagramLink = "https://www.instagram.com/lenteraoudoor45/";

type ContactFormState = {
  name: string;
  topic: string;
  visitDate: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: "",
  topic: "Tanya ketersediaan alat",
  visitDate: "",
  message: "",
};

const quickInfo = [
  {
    title: "Telepon",
    detail: phoneDisplay,
    href: contactLink,
    icon: PhoneCall,
  },
  {
    title: "Lokasi",
    detail: "Krandang, Kediri",
    href: mapsLink,
    icon: MapPinned,
  },
  {
    title: "Instagram",
    detail: "@lenteraoudoor45",
    href: instagramLink,
    icon: Globe,
  },
];

const topics = [
  "Tanya ketersediaan alat",
  "Sewa paket camping",
  "Butuh rekomendasi perlengkapan",
  "Pertanyaan pengiriman / pickup",
  "Lainnya",
];

export function ContactClient() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const contactMessage = useMemo(() => {
    return [
      "Halo Lentera Outdoor, saya ingin menghubungi untuk:",
      `- Nama: ${form.name || "(belum diisi)"}`,
      `- Topik: ${form.topic}`,
      form.visitDate ? `- Tanggal rencana: ${form.visitDate}` : null,
      form.message ? `- Pesan: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }, [form]);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name,
        topic: form.topic,
        visit_date: form.visitDate || null,
        message: contactMessage,
      });

      if (error) {
        throw error;
      }

      setForm(initialFormState);
      setSubmitMessage(
        "Pesanmu tersimpan. Kami akan menindaklanjuti secepatnya.",
      );
    } catch (error) {
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Pesan belum tersimpan. Coba lagi nanti.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyNumber = async () => {
    await navigator.clipboard.writeText(copyablePhoneNumber);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f8fc_0%,#fcfdfe_38%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-8rem] h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="absolute top-32 left-[-7rem] h-64 w-64 rounded-full bg-brand-dark/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-56 w-56 rounded-full bg-brand-gray/70 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-[1440px] px-4 pb-10 pt-28 md:px-8 lg:px-[56px] md:pt-32">
        <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-brand-orange" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                Contact Lentera
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-bold leading-tight text-brand-dark-soft md:text-5xl lg:text-6xl">
                Butuh alat outdoor atau ingin tanya cepat?
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                Sampaikan kebutuhanmu lewat form singkat di bawah. Kami simpan
                pesanmu ke sistem kami agar lebih rapi ditindaklanjuti.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="shadow-lg shadow-brand-orange/25"
              >
                <a href={contactLink}>
                  <PhoneCall className="h-5 w-5" />
                  Hubungi via Telepon
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-brand-orange/30 bg-white/80 backdrop-blur-sm"
              >
                <Link href={mapsLink} target="_blank" rel="noopener noreferrer">
                  <MapPinned className="h-5 w-5" />
                  Lihat Lokasi
                </Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {quickInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("tel:") ? undefined : "_blank"}
                    rel={
                      item.href.startsWith("tel:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="group rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_12px_30px_rgba(7,80,86,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,80,86,0.12)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-3">
                        <div className="inline-flex rounded-2xl bg-brand-orange/10 p-3 text-brand-orange">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand-dark-soft">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="rounded-3xl border border-brand-dark/10 bg-brand-dark-soft p-5 text-white shadow-[0_20px_50px_rgba(7,80,86,0.18)]">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/10 p-3 text-brand-orange">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">
                    Balasan cepat via sistem internal
                  </p>
                  <p className="text-sm leading-relaxed text-white/75">
                    Kirim pesan kapan saja. Untuk proses yang lebih cepat,
                    sertakan tanggal, jumlah peserta, dan jenis kegiatanmu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/80 bg-white/90 p-5 shadow-[0_20px_60px_rgba(7,80,86,0.12)] backdrop-blur-md sm:p-6">
            <div className="mb-6 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Kirim pesan
              </p>
              <h2 className="text-2xl font-bold text-brand-dark-soft md:text-3xl">
                Sampaikan kebutuhanmu
              </h2>
              <p className="text-sm leading-relaxed text-slate-500">
                Form ini akan menyimpan pesanmu ke database agar dapat diproses
                oleh tim kami.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-brand-dark-soft"
                >
                  Nama
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  placeholder="Tulis nama kamu"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-dark-soft outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="topic"
                  className="text-sm font-semibold text-brand-dark-soft"
                >
                  Topik
                </label>
                <select
                  id="topic"
                  value={form.topic}
                  onChange={(event) =>
                    handleChange("topic", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-dark-soft outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="visitDate"
                  className="text-sm font-semibold text-brand-dark-soft"
                >
                  Tanggal rencana
                </label>
                <input
                  id="visitDate"
                  type="date"
                  value={form.visitDate}
                  onChange={(event) =>
                    handleChange("visitDate", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-dark-soft outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-brand-dark-soft"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                  placeholder="Contoh: butuh tenda untuk 4 orang dan sleeping bag untuk akhir pekan..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-dark-soft outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full shadow-lg shadow-brand-orange/25"
                disabled={isSubmitting}
              >
                <Send className="h-5 w-5" />
                {isSubmitting ? "Menyimpan..." : "Kirim pesan"}
              </Button>
            </form>

            {submitMessage ? (
              <div className="mt-4 rounded-2xl border border-brand-orange/20 bg-brand-orange/5 px-4 py-3 text-sm leading-relaxed text-brand-dark-soft">
                {submitMessage}
              </div>
            ) : null}

            <div className="mt-5 flex flex-col gap-3 rounded-3xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Nomor kontak
                </p>
                <p className="mt-1 text-base font-bold text-brand-dark-soft">
                  {phoneDisplay}
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={copyNumber}
                className="self-start sm:self-auto"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Tersalin" : "Salin nomor"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
