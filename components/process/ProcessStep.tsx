// components/process/ProcessStep.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { type ProcessStep as ProcessStepType } from "@/lib/types";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
}

const ICON_MAP: Record<string, any> = {
  Search: LucideIcons.Search,
  FlaskConical: LucideIcons.FlaskConical,
  Users: LucideIcons.Users,
  TrendingUp: LucideIcons.TrendingUp,
  Settings: LucideIcons.Settings,
};

const accentMap = {
  1: {
    from: "from-[#7c3aed]",
    to: "to-[#ec4899]",
    text: "text-[#a78bfa]",
    ring: "ring-[#7c3aed]/30",
    bg: "from-[#7c3aed]/[0.1] to-[#ec4899]/[0.05]",
  },
  2: {
    from: "from-[#ec4899]",
    to: "to-[#f59e0b]",
    text: "text-[#f472b6]",
    ring: "ring-[#ec4899]/30",
    bg: "from-[#ec4899]/[0.1] to-[#f59e0b]/[0.05]",
  },
  3: {
    from: "from-[#06b6d4]",
    to: "to-[#7c3aed]",
    text: "text-[#67e8f9]",
    ring: "ring-[#06b6d4]/30",
    bg: "from-[#06b6d4]/[0.1] to-[#7c3aed]/[0.05]",
  },
  4: {
    from: "from-[#f59e0b]",
    to: "to-[#ec4899]",
    text: "text-[#fbbf24]",
    ring: "ring-[#f59e0b]/30",
    bg: "from-[#f59e0b]/[0.1] to-[#ec4899]/[0.05]",
  },
  5: {
    from: "from-[#10b981]",
    to: "to-[#06b6d4]",
    text: "text-emerald-400",
    ring: "ring-emerald-500/30",
    bg: "from-emerald-500/[0.1] to-[#06b6d4]/[0.05]",
  },
} as const;

export function ProcessStep({ step, index }: ProcessStepProps) {
  const Icon = ICON_MAP[step.icon] || LucideIcons.Circle;
  const accent = accentMap[step.step as 1 | 2 | 3 | 4 | 5];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative h-full"
    >
      <div
        className={`relative h-full rounded-2xl overflow-hidden p-6 md:p-8
        bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
        transition-all duration-500
        group-hover:border-white/[0.18] group-hover:bg-white/[0.05]
        group-hover:shadow-[0_30px_60px_-30px_rgba(124,58,237,0.4)]
        bg-gradient-to-br ${accent.bg}`}
      >
        {/* Top gradient line */}
        <div
          className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${accent.from} ${accent.to} opacity-50 group-hover:opacity-100 transition-opacity`}
        />

        {/* Corner glow on hover */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${accent.from} ${accent.to}`}
        />

        <div className="relative">
          <div className="flex items-start gap-4 mb-5">
            <div
              className={`shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br ${accent.from} ${accent.to} flex items-center justify-center shadow-lg ring-1 ${accent.ring} group-hover:scale-110 transition-transform duration-500`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xs text-white/40 font-mono">Step 0{step.step}</div>
              <h3 className="text-xl font-semibold text-white mt-0.5">{step.title}</h3>
            </div>
          </div>

          <p className="text-sm font-medium text-white/85 mb-2">{step.tagline}</p>
          <p className="text-sm text-white/65 leading-relaxed mb-6">
            {step.description}
          </p>

          <div className="pt-5 border-t border-white/[0.06] space-y-4">
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Outcome
              </div>
              <div className={`font-mono text-3xl font-semibold tracking-tight ${accent.text}`}>
                {step.stat.value}
              </div>
              <div className="text-xs text-white/55 mt-0.5">{step.stat.label}</div>
            </div>

            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Example
              </div>
              <div className="text-xs text-white/75 font-mono">
                {step.exampleCampaign}
              </div>
            </div>

            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                Tools
              </div>
              <div className="flex flex-wrap gap-1.5">
                {step.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/75 hover:border-white/20 hover:bg-white/[0.06] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
