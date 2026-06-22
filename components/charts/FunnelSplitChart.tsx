// components/charts/FunnelSplitChart.tsx
"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { fmtInt } from "@/lib/formatters";

interface FunnelSplitChartProps {
  leadsCampaigns: number;
  purchaseCampaigns: number;
  totalLeads: number;
  totalPurchases: number;
}

export function FunnelSplitChart({
  leadsCampaigns,
  purchaseCampaigns,
  totalLeads,
  totalPurchases,
}: FunnelSplitChartProps) {
  const data = [
    { name: "Lead-gen", value: leadsCampaigns, color: "#7c3aed", leads: totalLeads },
    { name: "Purchase", value: purchaseCampaigns, color: "#ec4899", purchases: totalPurchases },
  ];
  const total = leadsCampaigns + purchaseCampaigns;

  return (
    <div className="w-full">
      <div className="relative h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="funnel-purple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="funnel-pink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              animationDuration={1500}
              stroke="rgba(0,0,0,0.4)"
              strokeWidth={3}
            >
              <Cell fill="url(#funnel-purple)" />
              <Cell fill="url(#funnel-pink)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="font-mono text-4xl font-semibold text-white tracking-tight">{total}</div>
          <div className="text-xs text-white/50 uppercase tracking-wider mt-1">campaigns</div>
        </motion.div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-[#7c3aed]/[0.1] to-transparent border border-[#7c3aed]/20">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#7c3aed]" />
            <span className="text-xs font-medium text-white/80">Lead-gen</span>
          </div>
          <div className="font-mono text-2xl font-semibold text-white tracking-tight">{leadsCampaigns}</div>
          <div className="text-xs text-white/50 mt-0.5">{fmtInt(totalLeads)} leads</div>
        </div>
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-[#ec4899]/[0.1] to-transparent border border-[#ec4899]/20">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#f472b6] to-[#ec4899]" />
            <span className="text-xs font-medium text-white/80">Purchase</span>
          </div>
          <div className="font-mono text-2xl font-semibold text-white tracking-tight">{purchaseCampaigns}</div>
          <div className="text-xs text-white/50 mt-0.5">{fmtInt(totalPurchases)} purchases</div>
        </div>
      </div>
    </div>
  );
}
