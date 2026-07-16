"use client";

import { LayoutGrid, Backpack, Tent, Footprints, ChefHat, HeartPulse } from "lucide-react";

// ── Icon map ─────────────────────────────────────────────────────────────────
function CategoryIcon({ category, isActive }: { category: string; isActive: boolean }) {
  // Use brand-orange for active, gray-500 for inactive
  const color = isActive ? "#ff5b04" : "#6b7280";
  const iconProps = { size: 16, color, strokeWidth: 2 };

  const iconMap: Record<string, React.ReactNode> = {
    All:       <LayoutGrid {...iconProps} />,
    Backpack:  <Backpack   {...iconProps} />,
    Tenda:     <Tent       {...iconProps} />,
    Sepatu:    <Footprints {...iconProps} />,
    Cook:      <ChefHat    {...iconProps} />,
    Emergency: <HeartPulse {...iconProps} />,
  };

  const icon = iconMap[category] ?? <LayoutGrid {...iconProps} />;

  return (
    <span className="flex items-center justify-center flex-shrink-0">
      {icon}
    </span>
  );
}


// ── CategoryTab ───────────────────────────────────────────────────────────────
interface CategoryTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryTab({ label, isActive, onClick }: CategoryTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full inline-flex justify-center items-center gap-2.5 transition-all duration-300 border ${
        isActive 
          ? "border-brand-orange bg-brand-orange/5 text-brand-orange" 
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
      } outline-none font-medium font-body text-[15px]`}
    >
      <CategoryIcon category={label} isActive={isActive} />
      <span>{label}</span>
    </button>
  );
}

// ── CategoryTabGroup ──────────────────────────────────────────────────────────
interface CategoryTabGroupProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
  className?: string;
}

export function CategoryTabGroup({ categories, active, onChange, className = "" }: CategoryTabGroupProps) {
  return (
    <div className={`flex flex-wrap gap-2.5 justify-center ${className}`}>
      {categories.map((cat) => (
        <CategoryTab
          key={cat}
          label={cat}
          isActive={active === cat}
          onClick={() => onChange(cat)}
        />
      ))}
    </div>
  );
}
