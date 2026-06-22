// components/case-studies/ScreenshotSlot.tsx
"use client";

import * as React from "react";
import { Image as ImageIcon } from "lucide-react";

interface ScreenshotSlotProps {
  label: string;
  index: number;
  total: number;
}

export function ScreenshotSlot({ label, index, total }: ScreenshotSlotProps) {
  return (
    <div className="group relative aspect-[16/10] rounded-xl border border-dashed border-white/[0.12] bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden">
      {/* Hover glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#7c3aed]/20 to-[#ec4899]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
        <div className="h-10 w-10 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3 group-hover:bg-gradient-to-br group-hover:from-[#7c3aed]/30 group-hover:to-[#ec4899]/30 transition-all">
          <ImageIcon className="h-5 w-5 text-white/40 group-hover:text-white/80 transition-colors" />
        </div>
        <div className="text-xs text-white/40 group-hover:text-white/70 transition-colors font-mono">
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className="text-xs text-white/55 mt-2 max-w-[220px] line-clamp-2">
          {label}
        </div>
      </div>
    </div>
  );
}
