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
  {
    name: "Budi Santoso",
    review: "Sangat membantu liburan akhir pekan kami! Kualitas bagus harga murah.",
    rating: 5,
    date: "2024-12-05",
  },
  {
    name: "Rina A.",
    review: "Cukup baik pelayanannya.",
    rating: 4,
    date: "2024-12-06",
  },
  {
    name: "Ahmad",
    review: "Mantap, sleeping bagnya wangi.",
    rating: 5,
    date: "2024-12-10",
  }
];
