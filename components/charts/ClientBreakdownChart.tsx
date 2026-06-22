// components/charts/ClientBreakdownChart.tsx
// Spend by Client — uses GroupedClient (clients collapsed by displayName).
// To add a new client: append an entry to content/clients.json with a unique
// slug. The chart will pick it up automatically.
"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { fmtMoney, fmtIntLakhCrore } from "@/lib/formatters";
import { type GroupedClient } from "@/lib/data";

// Vibrant palette — purple, pink, cyan, amber, emerald
const COLORS = [
  { main: "#7c3aed", glow: "rgba(124,58,237,0.4)" },
  { main: "#ec4899", glow: "rgba(236,72,153,0.4)" },
  { main: "#06b6d4", glow: "rgba(6,182,212,0.4)" },
  { main: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
  { main: "#10b981", glow: "rgba(16,185,129,0.4)" },
];

interface ClientBreakdownChartProps {
  clients: GroupedClient[];
}

export function ClientBreakdownChart({ clients }: ClientBreakdownChartProps) {
  const chartData = clients.map((c) => {
    // For INR: scale to lakhs (1L = 100K). For USD: scale to thousands (1K = $1,000).
    const isUSD = c.currency === "USD";
    const barValue = isUSD ? c.spend / 1_000 : c.spend / 100_000;
    return {
      name: c.shortName,           // shortName on x-axis (e.g. "Abhishek")
      fullName: c.displayName,     // full name in tooltip (e.g. "Abhishek Pal")
      currency: c.currency,
      spend: c.spend,
      barValue,
      isUSD,
      campaigns: c.campaigns,
      leads: c.leads,
      purchases: c.purchases,
      slugCount: c.slugs.length,
    };
  });

  return (
    <div className="w-full h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
          <defs>
            {COLORS.map((c, i) => (
              <linearGradient key={i} id={`bar-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.main} stopOpacity={1} />
                <stop offset="100%" stopColor={c.main} stopOpacity={0.4} />
              </linearGradient>
            ))}
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) =>
              // If the values are in thousands, show K; else show L
              v >= 1000 ? `${(v / 1000).toFixed(0)}K` :
              v >= 100 ? `${v.toFixed(0)}L` :
              v >= 1 ? `${v.toFixed(1)}L` :
              `${v.toFixed(2)}L`
            }
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              const d = payload[0].payload;
              return (
                <div className="rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl p-3 shadow-2xl">
                  <div className="text-xs font-medium text-white/60 mb-1">
                    {d.fullName}
                  </div>
                  <div className="text-xs text-white/50 mb-2">
                    {d.campaigns} campaign{d.campaigns === 1 ? "" : "s"} · {d.currency}
                    {d.slugCount > 1 && ` · ${d.slugCount} accounts`}
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-white/70">Spend</span>
                    <span className="font-mono text-white">{fmtMoney(d.spend, d.currency)}</span>
                  </div>
                  {d.leads > 0 && (
                    <div className="flex items-center justify-between gap-4 text-sm mt-1.5">
                      <span className="text-white/70">Leads</span>
                      <span className="font-mono text-white">{fmtIntLakhCrore(d.leads)}</span>
                    </div>
                  )}
                  {d.purchases > 0 && (
                    <div className="flex items-center justify-between gap-4 text-sm mt-1.5">
                      <span className="text-white/70">Purchases</span>
                      <span className="font-mono text-white">{fmtIntLakhCrore(d.purchases)}</span>
                    </div>
                  )}
                </div>
              );
            }}
          />
          <Bar dataKey="barValue" radius={[8, 8, 0, 0]} animationDuration={1400}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={`url(#bar-grad-${i % COLORS.length})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
