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
    image: "/assets/logo2.png",
  },
  {
    id: 2,
    name: "Sepatu Tracking",
    description: "Sepatu gunung anti slip dengan sol karet tebal.",
    category: "Sepatu",
    pricePerDay: 25000,
    image: "/assets/logo2.png",
  },
  {
    id: 3,
    name: "Carrier 45 Liter",
    description: "Tas gunung ukuran medium, nyaman di punggung.",
    category: "Backpack",
    pricePerDay: 20000,
    image: "/assets/logo2.png",
  },
  {
    id: 4,
    name: "Kompor Portable Mini",
    description: "Kompor lipat praktis untuk masak di alam.",
    category: "Cook",
    pricePerDay: 10000,
    image: "/assets/logo2.png",
  },
  {
    id: 5,
    name: "Headlamp LED",
    description: "Lampu kepala terang dengan baterai awet.",
    category: "Emergency",
    pricePerDay: 5000,
    image: "/assets/logo2.png",
  },
  {
    id: 6,
    name: "Cooking Set Aluminium",
    description: "Panci dan wajan ringan khusus outdoor.",
    category: "Cook",
    pricePerDay: 15000,
    image: "/assets/logo2.png",
  },
  {
    id: 7,
    name: "Tenda Kapasitas 2 Orang",
    description: "Tenda dome praktis dan ringan untuk 2 orang.",
    category: "Tenda",
    pricePerDay: 20000,
    image: "/assets/logo2.png",
  },
  {
    id: 8,
    name: "Matras Spons",
    description: "Alas tidur tebal dan empuk.",
    category: "Emergency",
    pricePerDay: 5000,
    image: "/assets/logo2.png",
  }
];
