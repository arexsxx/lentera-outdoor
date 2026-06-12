export interface Product {
  id: number;
  name: string;
  description: string;
  category: "Backpack" | "Tenda" | "Sepatu" | "Cook" | "Emergency";
  pricePerDay: number;
  image: string;
}
