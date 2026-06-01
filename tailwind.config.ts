import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#ff5b04",      // Primary
          "orange-dark": "#d94b00", // Darker primary
          dark: "#075056",        // Secondary
          "dark-soft": "#16232a", // Text color
          light: "#f4f8fc",       // Card
          gray: "#e4eef0",        // Tertiary
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
