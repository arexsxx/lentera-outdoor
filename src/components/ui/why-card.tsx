import { type LucideIcon } from "lucide-react";

interface WhyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function WhyCard({ icon: Icon, title, description }: WhyCardProps) {
  return (
    <div className="group p-4 bg-slate-50 hover:bg-slate-100 rounded-[20px] inline-flex flex-col justify-start items-start gap-9 w-full transition-colors duration-300 cursor-default">
      {/* Icon */}
      <div className="size-12 flex items-center justify-center rounded-xl bg-brand-orange/10 group-hover:bg-brand-orange/20 flex-shrink-0 transition-colors duration-300">
        <Icon className="size-6 text-brand-orange" />
      </div>

      {/* Text */}
      <div className="self-stretch flex flex-col justify-center items-start gap-3">
        <h3 className="font-display text-2xl font-medium text-brand-dark-soft leading-7">
          {title}
        </h3>
        <p className="self-stretch font-body text-sm font-normal text-brand-dark leading-4 text-justify">
          {description}
        </p>
      </div>
    </div>
  );
}
