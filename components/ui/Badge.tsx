// components/ui/Badge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "info" | "outline" | "gradient" | "purple" | "pink" | "cyan" | "amber";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  pulse?: boolean;
}

const variantClass: Record<BadgeVariant, string> = {
  default: "bg-white/[0.06] text-white/80 border-white/10",
  success: "bg-emerald-500/[0.1] text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/[0.1] text-amber-400 border-amber-500/30",
  info: "bg-cyan-500/[0.1] text-cyan-400 border-cyan-500/30",
  outline: "bg-transparent text-white/70 border-white/15",
  gradient:
    "bg-gradient-to-r from-[#7c3aed]/20 to-[#ec4899]/20 text-white border-[#7c3aed]/30",
  purple: "bg-[#7c3aed]/[0.15] text-[#a78bfa] border-[#7c3aed]/30",
  pink: "bg-[#ec4899]/[0.15] text-[#f472b6] border-[#ec4899]/30",
  cyan: "bg-[#06b6d4]/[0.15] text-[#67e8f9] border-[#06b6d4]/30",
  amber: "bg-[#f59e0b]/[0.15] text-[#fbbf24] border-[#f59e0b]/30",
};

export function Badge({
  className,
  variant = "default",
  size = "sm",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium backdrop-blur-md",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
