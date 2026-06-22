// components/charts/TopCampaignsChart.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type CaseStudyTableRow } from "@/lib/types";

interface TopCampaignsChartProps {
  title: string;
  subtitle?: string;
  rows: CaseStudyTableRow[];
  metric: string;
  accent?: "default" | "purple" | "cyan" | "emerald" | "amber" | "pink";
  metricLabel?: string;
}

const accentGradient: Record<string, string> = {
  default: "from-white/60 to-white/10",
  purple: "from-[#7c3aed] to-[#a78bfa]",
  pink: "from-[#ec4899] to-[#f472b6]",
  cyan: "from-[#06b6d4] to-[#67e8f9]",
  emerald: "from-emerald-400 to-cyan-500",
  amber: "from-[#f59e0b] to-[#fbbf24]",
};

const accentText: Record<string, string> = {
  default: "text-white",
  purple: "text-[#a78bfa]",
  pink: "text-[#f472b6]",
  cyan: "text-[#67e8f9]",
  emerald: "text-emerald-400",
  amber: "text-[#fbbf24]",
};

function parseNumeric(s: string): number {
  if (!s) return 0;
  const cleaned = s.replace(/[₹$,%\s]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  if (s.includes("Cr")) return num * 1_00_00_000;
  if (s.includes("L") || s.includes("Lakh")) return num * 100_000;
  if (s.includes("K")) return num * 1_000;
  return num;
}

export function TopCampaignsChart({
  title,
  subtitle,
  rows,
  metric,
  accent = "default",
  metricLabel,
}: TopCampaignsChartProps) {
  const values = rows.map((r) => parseNumeric(r[metric] || "0"));
  const max = Math.max(...values, 0.001);

  return (
    <div className="w-full">
      <div className="mb-5">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-xs font-medium uppercase tracking-wider text-white/50">
            {title}
          </div>
          {subtitle && (
            <div className="text-xs text-white/40 font-mono">{subtitle}</div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((row, i) => {
          const value = parseNumeric(row[metric] || "0");
          const width = `${(value / max) * 100}%`;
          const campaign = row["Campaign"] || row["Client"] || "";
          return (
            <motion.div
              key={`${campaign}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <div className="text-sm text-white/85 truncate font-medium" title={campaign}>
                  {campaign}
                </div>
                <div className={cn("text-sm font-mono tabular-nums font-semibold", accentText[accent])}>
                  {row[metric]}
                </div>
              </div>
              <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full bg-gradient-to-r", accentGradient[accent])}
                  initial={{ width: 0 }}
                  whileInView={{ width }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 1.2, delay: 0.1 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {metricLabel && (
        <div className="mt-4 text-xs text-white/40">{metricLabel}</div>
      )}
    </div>
  );
}
