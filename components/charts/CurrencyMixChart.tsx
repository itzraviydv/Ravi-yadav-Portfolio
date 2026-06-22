// components/charts/CurrencyMixChart.tsx
"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { fmtMoney } from "@/lib/formatters";

interface CurrencyMixChartProps {
  totalINR: number;
  totalUSD: number;
}

export function CurrencyMixChart({ totalINR, totalUSD }: CurrencyMixChartProps) {
  const data = [
    { name: "INR", value: totalINR, color: "#7c3aed" },
    { name: "USD", value: totalUSD, color: "#06b6d4" },
  ];

  return (
    <div className="w-full">
      <div className="relative h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="cur-purple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="cur-cyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              animationDuration={1500}
              stroke="rgba(0,0,0,0.4)"
              strokeWidth={3}
            >
              <Cell fill="url(#cur-purple)" />
              <Cell fill="url(#cur-cyan)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="text-xs text-white/50 uppercase tracking-wider">Currency</div>
          <div className="font-mono text-2xl font-semibold text-white mt-1">2</div>
        </motion.div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-[#7c3aed]/[0.1] to-transparent border border-[#7c3aed]/20">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#7c3aed]" />
            <span className="text-xs font-medium text-white/80">INR</span>
          </div>
          <div className="font-mono text-base font-semibold text-white tracking-tight">{fmtMoney(totalINR, "INR")}</div>
          <div className="text-xs text-white/50 mt-0.5">5 clients</div>
        </div>
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-[#06b6d4]/[0.1] to-transparent border border-[#06b6d4]/20">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#67e8f9] to-[#06b6d4]" />
            <span className="text-xs font-medium text-white/80">USD</span>
          </div>
          <div className="font-mono text-base font-semibold text-white tracking-tight">{fmtMoney(totalUSD, "USD")}</div>
          <div className="text-xs text-white/50 mt-0.5">1 client</div>
        </div>
      </div>
    </div>
  );
}
