import type { Metadata } from "next";

import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Lentera Outdoor",
  description:
    "Hubungi Lentera Outdoor untuk sewa perlengkapan camping, tanya ketersediaan, atau minta rekomendasi alat outdoor.",
};

export default function ContactPage() {
  return <ContactClient />;
}
