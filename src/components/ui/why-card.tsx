import { type LucideIcon } from "lucide-react";

interface WhyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function WhyCard({ icon: Icon, title, description }: WhyCardProps) {
  return (
    <div className="group p-8 bg-[#F9F9FA] rounded-[32px] inline-flex flex-col justify-start items-start gap-8 w-full transition-all duration-300 cursor-default hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-transparent hover:border-gray-100">
      {/* Icon */}
      <div className="size-12 flex items-center justify-center rounded-2xl bg-white shadow-sm flex-shrink-0 transition-colors duration-300">
        <Icon className="size-6 text-brand-orange" strokeWidth={2} />
      </div>

      {/* Text */}
      <div className="self-stretch flex flex-col justify-center items-start gap-3">
        <h3 className="font-display text-[22px] font-bold tracking-tight text-brand-dark-soft leading-tight">
          {title}
        </h3>
        <p className="self-stretch font-body text-[15px] font-normal text-[#7A7A7A] leading-relaxed text-left">
          {description}
        </p>
      </div>
    </div>
  );
}
