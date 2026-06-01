# Tutorial Next.js — Lentera Outdoor
> Panduan step-by-step membangun website rental perlengkapan outdoor menggunakan Next.js 15, Tailwind CSS, dan shadcn/ui

---

## 🗺️ Peta Halaman (Sections)

Berdasarkan desain, homepage terdiri dari **9 section**:

```
1. Navbar          → Logo + Nav Links + CTA Button
2. Hero            → Background image + Judul besar + 2 Tombol CTA
3. Brand Logos     → "Our Rent Product" + logo mitra
4. Products        → Filter tab + Grid produk (8 item)
5. Why Us          → Gambar kiri + 4 keunggulan kanan
6. Packages        → 3 paket bundling dengan checklist
7. Testimonials    → Carousel testimoni pelanggan
8. CTA Banner      → Background orange + 2 tombol
9. Footer          → 4 kolom: About, Jelajahi, Bantuan, Kontak
```

---

## 🚀 Langkah 1: Setup Project

```bash
npx create-next-app@latest lentera-outdoor
```

Pilih:
```
✔ TypeScript?        → Yes
✔ ESLint?            → Yes
✔ Tailwind CSS?      → Yes
✔ src/ directory?    → Yes
✔ App Router?        → Yes
✔ Import alias?      → Yes (default @/*)
```

```bash
cd lentera-outdoor

# Setup shadcn
npx shadcn@latest init
# Pilih: Default style, Slate base color, Yes CSS variables

# Install komponen shadcn yang dibutuhkan
npx shadcn@latest add button card badge tabs sheet

# Install dependencies tambahan
npm install lucide-react
npm install next-themes
```

---

## 🎨 Langkah 2: Konfigurasi Warna Brand

Ubah CSS variables di `src/app/globals.css` agar sesuai palet Lentera Outdoor
(orange sebagai warna utama):

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14% 4%;

    /* Warna primary → Orange brand Lentera */
    --primary: 24 95% 53%;          /* #F97316 orange */
    --primary-foreground: 0 0% 100%;

    --card: 0 0% 100%;
    --card-foreground: 20 14% 4%;

    --muted: 60 5% 96%;
    --muted-foreground: 25 5% 45%;

    --border: 20 6% 90%;
    --input: 20 6% 90%;
    --ring: 24 95% 53%;

    --radius: 0.75rem;
  }
}
```

Tambahkan warna custom di `tailwind.config.ts`:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F97316",      // Warna judul hero & CTA utama
          "orange-dark": "#EA6C00",
          dark: "#1A1A1A",        // Background gelap
          "dark-soft": "#2D2D2D",
        },
      },
      fontFamily: {
        // Font tebal untuk judul besar seperti "LENTERA OUTDOOR"
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## 🗂️ Langkah 3: Struktur Folder

```
src/
├── app/
│   ├── catalog/
│   │   └── page.tsx              # Halaman katalog lengkap
│   ├── globals.css
│   ├── layout.tsx                # Root layout (Navbar + Footer)
│   └── page.tsx                  # Homepage (semua sections)
│
├── components/
│   ├── ui/                       # shadcn components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── tabs.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx            # ← Section 1
│   │   └── Footer.tsx            # ← Section 9
│   │
│   └── sections/                 # Setiap section = 1 file
│       ├── HeroSection.tsx       # ← Section 2
│       ├── BrandSection.tsx      # ← Section 3
│       ├── ProductsSection.tsx   # ← Section 4
│       ├── WhyUsSection.tsx      # ← Section 5
│       ├── PackagesSection.tsx   # ← Section 6
│       ├── TestimonialsSection.tsx  # ← Section 7
│       └── CtaBannerSection.tsx  # ← Section 8
│
├── data/
│   ├── products.ts               # Data produk rental
│   ├── packages.ts               # Data paket bundling
│   └── testimonials.ts           # Data testimoni
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
└── lib/
    └── utils.ts                  # cn() helper
```

---

## 💻 Langkah 4: Kode Tiap Section

### Root Layout — `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Lentera Outdoor — Sewa Perlengkapan Outdoor",
  description: "Sewa tenda, backpack, sepatu, dan perlengkapan outdoor terlengkap. Siap menemani setiap perjalanan alammu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

---

### Homepage — `src/app/page.tsx`

```tsx
import HeroSection from "@/components/sections/HeroSection";
import BrandSection from "@/components/sections/BrandSection";
import ProductsSection from "@/components/sections/ProductsSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import PackagesSection from "@/components/sections/PackagesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandSection />
      <ProductsSection />
      <WhyUsSection />
      <PackagesSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </main>
  );
}
```

---

### ① Navbar — `src/components/layout/Navbar.tsx`

```tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Review", href: "/review" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Lentera Outdoor" width={32} height={32} />
          <div className="leading-tight">
            <p className="font-bold text-sm">LENTERA</p>
            <p className="text-xs text-muted-foreground">Outdoor</p>
          </div>
        </Link>

        {/* Nav Links — Desktop */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Button className="hidden md:flex bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-6">
            Sewa sekarang
          </Button>

          {/* Hamburger Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium">
                    {link.label}
                  </Link>
                ))}
                <Button className="mt-4 bg-brand-orange hover:bg-brand-orange-dark text-white w-full">
                  Sewa sekarang
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
```

---

### ② Hero Section — `src/components/sections/HeroSection.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"   // foto gunung/alam
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Konten */}
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-black uppercase leading-none text-brand-orange drop-shadow-lg">
          LENTERA
          <br />
          OUTDOOR
        </h1>
        <p className="mt-4 text-white text-lg md:text-xl max-w-md">
          Peralatan terbaik untuk menemani setiap perjalanan alammu
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white text-white bg-transparent hover:bg-white/10 px-8"
          >
            <Link href="/catalog">Lihat Katalog</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white px-8"
          >
            <Link href="/sewa">Mulai Sewa</Link>
          </Button>
        </div>
      </div>

    </section>
  );
}
```

---

### ③ Brand Section — `src/components/sections/BrandSection.tsx`

```tsx
import Image from "next/image";

const brands = [
  { name: "Greenforest", logo: "/images/brands/greenforest.png" },
  { name: "Antarestar", logo: "/images/brands/antarestar.png" },
  { name: "Zafira", logo: "/images/brands/zafira.png" },
  { name: "Credifox", logo: "/images/brands/credifox.png" },
  { name: "Seeday", logo: "/images/brands/seeday.png" },
];

export default function BrandSection() {
  return (
    <section className="py-12 bg-white border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-semibold mb-8 text-gray-700">
          Our Rent Product
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <div key={brand.name} className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={40}
                className="object-contain h-10 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### ④ Products Section — `src/components/sections/ProductsSection.tsx`

```tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";   // ← data produk

const categories = ["All", "Backpack", "Tenda", "Sepatu", "Cook", "Emergency"];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Pilihan Perlengkapan Terbaik</h2>
          <p className="text-muted-foreground mt-2">
            Siap disewa untuk menemani perjalanan alammu
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-brand-orange text-white border-brand-orange"
                  : "bg-white text-gray-600 border-gray-200 hover:border-brand-orange"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow group"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-2 text-brand-orange font-bold text-sm">
                  Rp {product.pricePerDay.toLocaleString("id-ID")}/day
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="rounded-full px-8 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
          >
            Lihat Lainnya →
          </Button>
        </div>

      </div>
    </section>
  );
}
```

---

### ⑤ Why Us Section — `src/components/sections/WhyUsSection.tsx`

```tsx
import Image from "next/image";
import { Package, Sparkles, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Pilihan Alat Terlengkap",
    desc: "Tersedia berbagai perlengkapan untuk hiking, camping, mendaki gunung dari berbagai kategori.",
  },
  {
    icon: Sparkles,
    title: "Bersih & Terawat Sempurna",
    desc: "Setiap alat dibersihkan dan dicek sebelum dipinjamkan, sehingga kamu selalu mendapat peralatan prima.",
  },
  {
    icon: Clock,
    title: "Durasi Sewa Fleksibel",
    desc: "Tentukan sendiri berapa hari kamu membutuhkan peralatan. Harga yang kompetitif dan transparan.",
  },
  {
    icon: Star,
    title: "Rekomendasi Tepat",
    desc: "Bingung butuh apa? Tim kami siap membantu merekomendasikan perlengkapan sesuai destinasimu.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Gambar Kiri */}
          <div className="relative h-[400px] rounded-3xl overflow-hidden">
            <Image
              src="/images/why-us.jpg"   // foto alam/camping
              alt="Kenapa Lentera Outdoor"
              fill
              className="object-cover"
            />
          </div>

          {/* Konten Kanan */}
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Kenapa Memilih Lentera Outdoor?
            </h2>
            <p className="text-muted-foreground mb-8">
              Peralatan terawat dan layanan terpercaya kami siap membuat setiap
              perjalanan alammu lebih aman, nyaman, dan berkesan.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="font-semibold text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

---

### ⑥ Packages Section — `src/components/sections/PackagesSection.tsx`

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { packages } from "@/data/packages";

export default function PackagesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Paket Hemat & Praktis</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Tidak perlu bingung menyusun daftar bawaan. Pilih paket bundling kami
            yang sudah disesuaikan dengan jumlah rombonganmu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border hover:shadow-xl transition-shadow"
            >
              {/* Foto Paket */}
              <div className="relative h-48">
                <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
              </div>

              {/* Detail */}
              <div className="p-5">
                <h3 className="font-bold text-lg">{pkg.name}</h3>
                <ul className="mt-3 space-y-1">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Mulai dari</p>
                    <p className="font-bold text-brand-orange">
                      Rp {pkg.price.toLocaleString("id-ID")}/hari
                    </p>
                  </div>
                  <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-4">
                    Pilih Paket
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

---

### ⑦ Testimonials Section — `src/components/sections/TestimonialsSection.tsx`

```tsx
"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  // Tampilkan 4 testimoni per slide (bisa digeser)
  const visible = testimonials.slice(current, current + 4);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Apa yang sobat Lentera katakan</h2>
            <p className="text-muted-foreground mt-2 max-w-sm">
              Dipercaya oleh para pendaki dan keluarga untuk merasakan momen terbaik di alam.
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-orange-dark transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {visible.map((t, i) => (
            <div key={i} className="border rounded-2xl p-5 bg-white hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${si < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700 line-clamp-4">"{t.review}"</p>
              <p className="mt-4 font-semibold text-sm text-brand-orange">{t.name}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

---

### ⑧ CTA Banner — `src/components/sections/CtaBannerSection.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaBannerSection() {
  return (
    <section className="relative py-20 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.jpg"    // foto tenda/api unggun
          alt="CTA Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-orange/80" />
      </div>

      {/* Konten */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-black leading-tight">
          Siap Memulai
          <br />
          Petualanganmu?
        </h2>
        <p className="mt-4 text-white/90 max-w-md mx-auto">
          Lengkapi kebutuhan mendaki dan camping-mu bersama kami. Proses sewa mudah,
          cepat, dan terpercaya.
        </p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white text-white bg-transparent hover:bg-white/20 px-8"
          >
            <Link href="/catalog">Lihat Katalog</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-brand-orange hover:bg-gray-100 px-8 font-bold"
          >
            <Link href="/sewa">Mulai Sewa</Link>
          </Button>
        </div>
      </div>

    </section>
  );
}
```

---

### ⑨ Footer — `src/components/layout/Footer.tsx`

```tsx
import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Kolom 1: About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo-white.png" alt="Lentera" width={28} height={28} />
              <div>
                <p className="font-bold text-sm">LENTERA</p>
                <p className="text-xs text-gray-400">Outdoor</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Solusi penyewaan perlengkapan outdoor terlengkap dan terpercaya
              untuk para petualang Indonesia.
            </p>
          </div>

          {/* Kolom 2: Jelajahi */}
          <div>
            <h4 className="font-semibold mb-4">Jelajahi</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Beranda", "Katalog", "Paket", "Review", "About Us"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-brand-orange transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Bantuan Sewa */}
          <div>
            <h4 className="font-semibold mb-4">Bantuan Sewa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Cara Pemesanan", "Syarat & Ketentuan", "Kebijakan Privasi", "FAQ"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-brand-orange transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami */}
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2 items-start">
                <Instagram className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                <span>@lenteraoutdoor</span>
              </li>
              <li className="flex gap-2 items-start">
                <Phone className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                <span>Jl. Outdoor No. 1, Bandung</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© 2025 Lentera Outdoor. All rights reserved.</p>
          <p>Designed with ❤️ for adventurers</p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 📊 Langkah 5: Data Layer

### `src/data/products.ts`

```ts
export interface Product {
  id: number;
  name: string;
  description: string;
  category: "Backpack" | "Tenda" | "Sepatu" | "Cook" | "Emergency";
  pricePerDay: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Tenda Kapasitas 4-5 Orang",
    description: "Tenda dome ringan dan tahan air, cocok untuk keluarga.",
    category: "Tenda",
    pricePerDay: 35000,
    image: "/images/products/tenda-45.jpg",
  },
  {
    id: 2,
    name: "Sepatu Tracking",
    description: "Sepatu gunung anti slip dengan sol karet tebal.",
    category: "Sepatu",
    pricePerDay: 25000,
    image: "/images/products/sepatu.jpg",
  },
  // ... tambahkan produk lainnya
];
```

### `src/data/packages.ts`

```ts
export interface Package {
  id: number;
  name: string;
  image: string;
  items: string[];
  price: number;
}

export const packages: Package[] = [
  {
    id: 1,
    name: "Keluarga 6 Orang",
    image: "/images/packages/family-6.jpg",
    price: 150000,
    items: [
      "Tenda Kapasitas 6 Orang",
      "Lampu Tenda + Baterai",
      "Cooking Set + Bahan",
      "Headlamp + Baterai",
      "Kompor Portable",
      "Sleeping Bag (6pcs)",
      "Carrier 45 liter",
      "Gas Portable",
      "P3K",
    ],
  },
  // ... paket 4 orang, 2 orang
];
```

### `src/data/testimonials.ts`

```ts
export interface Testimonial {
  name: string;
  review: string;
  rating: number;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Zaki Zaki",
    review: "Barang nya sangat bagus dan bersih cocok untuk info dakimu. Pelayanan responsif dan pengirimannya tepat waktu.",
    rating: 5,
    date: "2024-12-01",
  },
  // ... tambahkan testimoni lainnya
];
```

---

## 🗃️ Langkah 6: Folder `public/images/`

```
public/
└── images/
    ├── logo.png              # Logo Lentera Outdoor (berwarna)
    ├── logo-white.png        # Logo versi putih (untuk footer)
    ├── hero-bg.jpg           # Foto gunung/alam untuk hero
    ├── why-us.jpg            # Foto camping untuk section Why Us
    ├── cta-bg.jpg            # Foto api unggun untuk CTA Banner
    ├── brands/
    │   ├── greenforest.png
    │   ├── antarestar.png
    │   ├── zafira.png
    │   ├── credifox.png
    │   └── seeday.png
    ├── products/
    │   ├── tenda-45.jpg
    │   ├── sepatu.jpg
    │   ├── carrier-45.jpg
    │   └── ...
    └── packages/
        ├── family-6.jpg
        ├── family-4.jpg
        └── family-2.jpg
```

---

## ▶️ Langkah 7: Jalankan Project

```bash
npm run dev
```

Buka **http://localhost:3000** — kamu akan melihat semua section berjalan! 🎉

---

## ✅ Checklist Pengembangan Lanjutan

- [ ] Halaman `/catalog` dengan filter & search yang lebih lengkap
- [ ] Form pemesanan sewa dengan kalender (gunakan `react-day-picker`)
- [ ] Halaman `/review` dengan pagination
- [ ] Integrasi WhatsApp untuk CTA "Sewa sekarang"
- [ ] Animasi scroll dengan `framer-motion`
- [ ] SEO: `metadata` lengkap per halaman
- [ ] Image optimization: gunakan WebP dan `sizes` attribute
- [ ] Deploy ke Vercel

---

## 📚 Referensi

- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Lucide Icons](https://lucide.dev/icons)
