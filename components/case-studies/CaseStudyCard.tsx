// components/case-studies/CaseStudyCard.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { type CaseStudy } from "@/lib/types";

interface CaseStudyCardProps {
  study: CaseStudy;
  index?: number;
}

function pickHeadlineMetric(study: CaseStudy): { label: string; value: string; gradient: string } {
  const findValue = (key: string): string | null => {
    for (const row of study.results) {
      for (const k of Object.keys(row)) {
        if (k.toLowerCase().includes(key.toLowerCase())) return row[k];
      }
    }
    return null;
  };

  if (study.currency === "USD") {
    if (findValue("CPL")) {
      return { label: "CPL", value: findValue("CPL")!, gradient: "from-[#06b6d4] to-[#67e8f9]" };
    }
    return { label: "CPP", value: findValue("CPP") || findValue("Cost per purchase") || "—", gradient: "from-[#06b6d4] to-[#67e8f9]" };
  }
  if (findValue("CTR") && parseFloat(findValue("CTR")!.replace(/[^0-9.]/g, "")) > 5) {
    return { label: "CTR", value: findValue("CTR")!, gradient: "from-[#ec4899] to-[#f472b6]" };
  }
  if (findValue("CPL")) {
    return { label: "CPL", value: findValue("CPL")!, gradient: "from-[#7c3aed] to-[#a78bfa]" };
  }
  return { label: "Result", value: findValue("Purchases") || findValue("Leads") || "—", gradient: "from-white to-white/60" };
}

export function CaseStudyCard({ study, index = 0 }: CaseStudyCardProps) {
  const head = pickHeadlineMetric(study);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: 0.05 + (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link href={`/case-studies/${study.slug}`} className="block">
        <div className="relative h-full rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.05] group-hover:shadow-[0_30px_80px_-30px_rgba(124,58,237,0.5)]">

          {/* Top gradient line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />

          {/* Hover glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br from-[#7c3aed] to-[#ec4899]" />

          <div className="relative p-6">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant={study.currency === "USD" ? "cyan" : "purple"}
                  size="sm"
                >
                  {study.currency}
                </Badge>
                <span className="text-xs text-white/40">{study.client}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#7c3aed] group-hover:to-[#ec4899] group-hover:border-transparent transition-all duration-300">
                <ArrowUpRight className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white leading-snug mb-2 font-mono">
              {study.title}
            </h3>

            {study.tag && (
              <div className="text-sm text-white/55 mb-6 line-clamp-2">{study.tag}</div>
            )}

            {/* Big metric with gradient text */}
            <div className="pt-5 border-t border-white/[0.06] flex items-end justify-between gap-3">
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  {head.label}
                </div>
                <div className={`font-mono text-3xl font-semibold tracking-tight bg-gradient-to-br ${head.gradient} bg-clip-text text-transparent`}>
                  {head.value}
                </div>
              </div>
              <div className="text-xs text-white/35 font-mono text-right leading-tight">
                {study.window.split(" → ")[0]?.trim()}<br />
                <span className="text-white/25">{study.window.split(" → ")[1]?.trim()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
