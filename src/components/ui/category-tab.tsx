"use client";

import { LayoutGrid, Backpack, Tent, Footprints, ChefHat, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

// ── Icon map ─────────────────────────────────────────────────────────────────
function CategoryIcon({ category, isActive }: { category: string; isActive: boolean }) {
  const color = isActive ? "#ff5b04" : "#ff5b04";
  const iconProps = { size: 18, color, strokeWidth: 1.75 };

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
    <span
      className="size-7 flex items-center justify-center rounded-md flex-shrink-0"
      style={{ backgroundColor: "#F4F8FC" }}
    >
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
      className={`relative px-4 py-3 rounded-xl inline-flex justify-center items-center gap-3 transition-colors bg-slate-50 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] group border border-transparent outline-none`}
    >
      {isActive && (
        <motion.div
          layoutId="activeCategoryBorder"
          className="absolute inset-0 rounded-xl border border-brand-orange z-0 pointer-events-none"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className="relative z-10 flex items-center gap-3">
        <CategoryIcon category={label} isActive={isActive} />
        <span className={`text-xl font-medium font-body leading-6 transition-colors ${isActive ? "text-brand-orange" : "text-black group-hover:text-brand-orange"}`}>
          {label}
        </span>
      </div>
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
    <div className={`flex flex-wrap gap-3 justify-center ${className}`}>
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
