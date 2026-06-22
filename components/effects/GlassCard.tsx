// components/effects/GlassCard.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
  glow?: "none" | "purple" | "pink" | "cyan" | "amber";
  gradientBorder?: boolean;
  children: React.ReactNode;
}

const variantClass = {
  default: "glass",
  strong: "glass-strong",
  subtle: "bg-white/[0.02] backdrop-blur-sm border border-white/[0.06]",
};

const glowClass = {
  none: "",
  purple: "shadow-glow-purple",
  pink: "shadow-glow-pink",
  cyan: "shadow-glow-cyan",
  amber: "shadow-glow-amber",
};

export function GlassCard({
  variant = "default",
  hover = false,
  glow = "none",
  gradientBorder = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        gradientBorder ? "gradient-border" : variantClass[variant],
        hover && !gradientBorder && "glass-card-hover",
        glowClass[glow],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
