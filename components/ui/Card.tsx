// components/ui/Card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "subtle";
  hover?: boolean;
  gradientBorder?: boolean;
}

export function Card({
  className,
  variant = "default",
  hover = false,
  gradientBorder = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        gradientBorder
          ? "gradient-border"
          : variant === "default" &&
              "bg-white/[0.03] backdrop-blur-md border border-white/[0.08]",
        !gradientBorder && variant === "elevated" && "bg-white/[0.05] backdrop-blur-md border border-white/[0.1] shadow-2xl",
        !gradientBorder && variant === "outline" && "bg-transparent border border-white/[0.08]",
        !gradientBorder && variant === "subtle" && "bg-white/[0.02] border border-white/[0.06]",
        hover && !gradientBorder && "glass-card-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
