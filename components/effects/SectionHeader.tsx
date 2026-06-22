// components/effects/SectionHeader.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  gradient?: "brand" | "rainbow" | "purple-pink" | "cyan-amber" | "animated";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  gradient = "brand",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        align === "left" && "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-4",
            "bg-white/[0.04] border border-white/[0.08] text-white/70",
            align === "center" && "mx-auto",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
        <GradientText gradient={gradient}>{title}</GradientText>
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-white/60 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
