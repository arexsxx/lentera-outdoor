import { Tent, Compass, Map, Flame, Mountain, Trees, Footprints, Binoculars, Sun, Camera } from "lucide-react";

const icons = [
  { Icon: Tent, top: "10%", left: "5%", size: 80, rotate: 12, opacity: 0.12 },
  { Icon: Compass, top: "25%", left: "85%", size: 140, rotate: -15, opacity: 0.08 },
  { Icon: Map, top: "70%", left: "8%", size: 110, rotate: 8, opacity: 0.1 },
  { Icon: Flame, top: "40%", left: "15%", size: 60, rotate: 20, opacity: 0.15 },
  { Icon: Mountain, top: "15%", left: "55%", size: 200, rotate: -5, opacity: 0.05 },
  { Icon: Binoculars, top: "60%", left: "75%", size: 90, rotate: 35, opacity: 0.12 },
  { Icon: Trees, top: "50%", left: "40%", size: 160, rotate: 5, opacity: 0.06 },
  { Icon: Footprints, top: "85%", left: "45%", size: 70, rotate: -25, opacity: 0.12 },
  { Icon: Sun, top: "5%", left: "40%", size: 100, rotate: 45, opacity: 0.08 },
  { Icon: Camera, top: "80%", left: "85%", size: 85, rotate: -15, opacity: 0.1 },
];

export function AbstractBackground({ className = "opacity-100" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}>
      {icons.map((item, index) => {
        const { Icon, top, left, size, rotate, opacity } = item;
        return (
          <Icon
            key={index}
            className="absolute text-brand-orange"
            strokeWidth={1}
            style={{
              top,
              left,
              width: size,
              height: size,
              transform: `rotate(${rotate}deg)`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
}
