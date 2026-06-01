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
    image: "/assets/logo2.png",
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
  {
    id: 2,
    name: "Kelompok 4 Orang",
    image: "/assets/logo2.png",
    price: 100000,
    items: [
      "Tenda Kapasitas 4 Orang",
      "Lampu Tenda + Baterai",
      "Cooking Set Medium",
      "Kompor Portable",
      "Sleeping Bag (4pcs)",
      "Matras (4pcs)",
      "Gas Portable",
    ],
  },
  {
    id: 3,
    name: "Pasangan 2 Orang",
    image: "/assets/logo2.png",
    price: 60000,
    items: [
      "Tenda Kapasitas 2 Orang",
      "Lampu Tenda Mini",
      "Cooking Set Kecil",
      "Kompor Portable",
      "Sleeping Bag (2pcs)",
      "Matras (2pcs)",
      "Gas Portable",
    ],
  },
];
