import { supabase } from "@/lib/supabase";
import { Product } from "@/data/products";
import CatalogClient from "./CatalogClient";

export const revalidate = 3600;

export default async function CatalogPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
  }

  const initialProducts: Product[] = data
    ? data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category as any,
        pricePerDay: item.price_per_day,
        description: item.description,
        image: item.image,
      }))
    : [];

  return <CatalogClient initialProducts={initialProducts} />;
}
