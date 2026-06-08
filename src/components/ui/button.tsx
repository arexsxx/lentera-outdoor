import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl font-body text-sm font-medium leading-6 whitespace-nowrap tracking-wide transition-colors duration-300 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5",

        secondary:
          "bg-white text-primary border border-gray-100 shadow-sm hover:bg-orange-50/50 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5",

        tertiary:
          "bg-brand-dark text-white shadow-sm hover:bg-brand-dark-soft hover:shadow-md hover:-translate-y-0.5",

        outline:
          "border border-primary/20 bg-transparent text-primary hover:bg-primary/5 hover:border-primary/40",

        "border-secondary":
          "bg-transparent text-white",

        gradient:
          "bg-gradient-to-r from-brand-dark to-primary text-white hover:opacity-90",

        ghost:
          "hover:bg-muted hover:text-foreground",

        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 px-5 gap-2",
        xs: "h-6 gap-1 text-xs rounded-lg px-2.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 px-4 gap-1.5 text-sm rounded-xl [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 px-7 gap-2.5 text-base",
        icon: "size-11",
        "icon-xs": "size-6 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-12",
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
