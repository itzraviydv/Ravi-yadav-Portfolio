// components/proof-of-work/ArtifactCard.tsx
"use client";

import * as React from "react";
import { ImageIcon, FileText, BarChart3, Layers } from "lucide-react";

interface ArtifactCardProps {
  title: string;
  description: string;
  type: "dashboard" | "creative" | "doc" | "before-after";
  index: number;
}

const typeIcon = {
  dashboard: BarChart3,
  creative: ImageIcon,
  doc: FileText,
  "before-after": Layers,
};

const typeLabel = {
  dashboard: "Meta Ads Manager",
  creative: "Creative",
  doc: "Document",
  "before-after": "Before / After",
};

// Vibrant gradient per artifact index for visual variety
const GRADIENTS = [
  "from-[#7c3aed] to-[#ec4899]",
  "from-[#ec4899] to-[#f59e0b]",
  "from-[#06b6d4] to-[#7c3aed]",
  "from-[#f59e0b] to-[#ec4899]",
  "from-[#10b981] to-[#06b6d4]",
  "from-[#a78bfa] to-[#7c3aed]",
];

export function ArtifactCard({ title, description, type, index }: ArtifactCardProps) {
  const Icon = typeIcon[type];
  const gradient = GRADIENTS[(index - 1) % GRADIENTS.length];
  return (
    <div className="group relative h-full rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-500">
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${gradient}`} />

      <div className="relative">
        <div className="aspect-[16/10] flex flex-col items-center justify-center gap-2 border-b border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent group-hover:from-white/[0.04] transition-colors">
          <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="text-xs text-white/40 font-mono">
            {String(index).padStart(2, "0")} · {typeLabel[type]}
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
          <p className="text-xs text-white/55 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}