// components/ui/KpiCard.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Accent = "default" | "purple" | "pink" | "cyan" | "amber" | "emerald";

interface KpiCardProps {
  label: string;
  /** Pre-formatted display value (e.g. "₹3.19Cr+"). */
  display: string;
  /** Optional secondary line. */
  secondary?: string;
  /** Index for stagger animation. */
  index?: number;
  /** Accent color drives the gradient strip and icon glow. */
  accent?: Accent;
  /** Icon to show above the label. */
  icon?: React.ReactNode;
}

const accentMap: Record<Accent, { gradient: string; text: string; bg: string; ring: string }> = {
  default: {
    gradient: "from-white/40 to-white/0",
    text: "text-white",
    bg: "from-white/[0.04] to-transparent",
    ring: "ring-white/10",
  },
  purple: {
    gradient: "from-[#7c3aed] to-[#ec4899]",
    text: "text-[#a78bfa]",
    bg: "from-[#7c3aed]/[0.1] to-transparent",
    ring: "ring-[#7c3aed]/20",
  },
  pink: {
    gradient: "from-[#ec4899] to-[#f59e0b]",
    text: "text-[#f472b6]",
    bg: "from-[#ec4899]/[0.1] to-transparent",
    ring: "ring-[#ec4899]/20",
  },
  cyan: {
    gradient: "from-[#06b6d4] to-[#7c3aed]",
    text: "text-[#67e8f9]",
    bg: "from-[#06b6d4]/[0.1] to-transparent",
    ring: "ring-[#06b6d4]/20",
  },
  amber: {
    gradient: "from-[#f59e0b] to-[#ec4899]",
    text: "text-[#fbbf24]",
    bg: "from-[#f59e0b]/[0.1] to-transparent",
    ring: "ring-[#f59e0b]/20",
  },
  emerald: {
    gradient: "from-emerald-400 to-cyan-500",
    text: "text-emerald-400",
    bg: "from-emerald-500/[0.1] to-transparent",
    ring: "ring-emerald-500/20",
  },
};

export function KpiCard({
  label,
  display,
  secondary,
  index = 0,
  accent = "default",
  icon,
}: KpiCardProps) {
  const cfg = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: 0.05 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3 }}
      className="group relative"
    >
      {/* Glass card with gradient border on hover */}
      <div
        className={cn(
          "relative h-full rounded-2xl p-5 md:p-6 overflow-hidden",
          "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]",
          "transition-all duration-500",
          "group-hover:border-white/15 group-hover:bg-white/[0.05]",
          "group-hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.5)]",
        )}
      >
        {/* Top gradient bar */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-px bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity",
            cfg.gradient,
          )}
        />

        {/* Background glow on hover */}
        <div
          className={cn(
            "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700",
            "bg-gradient-to-br",
            cfg.gradient,
          )}
        />

        <div className="relative">
          {icon && (
            <div className={cn("mb-3 inline-flex", cfg.text)}>{icon}</div>
          )}
          <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">
            {label}
          </div>
          <div className="font-mono text-2xl md:text-3xl font-semibold tracking-tight text-white tabular-nums">
            {display}
          </div>
          {secondary && (
            <div className="mt-1.5 text-xs text-white/50 font-mono">
              {secondary}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
