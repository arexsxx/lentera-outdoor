import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display font-semibold whitespace-nowrap tracking-wide transition-all duration-300 outline-none select-none focus-visible:ring-3 focus-visible:ring-brand-orange/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-orange text-white shadow-[0_4px_14px_rgba(255,91,4,0.3)] hover:bg-brand-orange-dark hover:shadow-[0_6px_20px_rgba(255,91,4,0.4)] hover:-translate-y-0.5",
        
        secondary:
          "bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5",
        
        tertiary:
          "bg-brand-dark text-white shadow-sm hover:bg-brand-dark-soft hover:shadow-md hover:-translate-y-0.5",
        
        outline:
          "border-2 border-brand-orange text-brand-orange bg-transparent hover:bg-brand-orange/5",
        
        "border-secondary":
          "border-2 border-white text-white bg-transparent hover:bg-white/10",

        gradient:
          "bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-1",

        ghost:
          "hover:bg-brand-orange/10 hover:text-brand-orange text-gray-600",
          
        link: "text-brand-orange underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 gap-2 text-base",
        xs: "h-8 px-4 gap-1.5 text-xs rounded-full",
        sm: "h-10 px-6 gap-2 text-sm",
        lg: "h-14 px-10 gap-3 text-lg font-bold",
        icon: "size-12",
        "icon-xs": "size-8 rounded-full",
        "icon-sm": "size-10 rounded-full",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
