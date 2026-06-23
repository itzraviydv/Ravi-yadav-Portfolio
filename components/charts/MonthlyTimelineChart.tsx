// components/charts/MonthlyTimelineChart.tsx
"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { monthLabel, fmtMoney, fmtIntLakhCrore, fmtInt } from "@/lib/formatters";
import { type MonthlyAggregates } from "@/lib/types";

interface MonthlyTimelineChartProps {
  data: MonthlyAggregates;
}

type Metric = "spend" | "reach" | "impressions" | "leads" | "clicks" | "lpv";

interface TooltipPayloadEntry {
  dataKey: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  metric: Metric;
}

const METRIC_CONFIG: Record<Metric, {
  label: string;
  gradient: [string, string];
  combineKey?: keyof import("@/lib/types").MonthlyRow["combined"];
  format: (v: number) => string;
  accent: string;
}> = {
  spend: {
    label: "Ad Spend",
    gradient: ["rgba(124,58,237,0.6)", "rgba(124,58,237,0)"],
    format: (v) => `₹${v >= 1_00_00_000 ? (v / 1_00_00_000).toFixed(1) : (v / 100_000).toFixed(0)}L`,
    accent: "#7c3aed",
  },
  reach: {
    label: "Reach",
    gradient: ["rgba(6,182,212,0.6)", "rgba(6,182,212,0)"],
    combineKey: "reach",
    format: (v) => fmtIntLakhCrore(v),
    accent: "#06b6d4",
  },
  impressions: {
    label: "Impressions",
    gradient: ["rgba(236,72,153,0.6)", "rgba(236,72,153,0)"],
    combineKey: "impressions",
    format: (v) => fmtIntLakhCrore(v),
    accent: "#ec4899",
  },
  leads: {
    label: "Leads",
    gradient: ["rgba(245,158,11,0.6)", "rgba(245,158,11,0)"],
    combineKey: "leads",
    format: (v) => fmtInt(v),
    accent: "#f59e0b",
  },
  clicks: {
    label: "Clicks",
    gradient: ["rgba(124,58,237,0.6)", "rgba(124,58,237,0)"],
    combineKey: "link_clicks",
    format: (v) => fmtInt(v),
    accent: "#7c3aed",
  },
  lpv: {
    label: "Landing Page Views",
    gradient: ["rgba(16,185,129,0.6)", "rgba(16,185,129,0)"],
    combineKey: "landing_page_views",
    format: (v) => fmtInt(v),
    accent: "#10b981",
  },
};

function CustomTooltip({ active, payload, label, metric }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const cfg = METRIC_CONFIG[metric];
  const inrVal = payload.find((p) => p.dataKey === "inr")?.value;
  const usdVal = payload.find((p) => p.dataKey === "usd")?.value;
  const combinedVal = payload.find((p) => p.dataKey === "combined")?.value;
  return (
    <div className="rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl p-3 shadow-2xl min-w-[200px]">
      <div className="text-xs font-medium text-white/60 mb-2">{label}</div>
      {metric === "spend" ? (
        <>
          {inrVal != null && (
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: "#7c3aed" }} />
                <span className="text-white/70">INR</span>
              </div>
              <span className="font-mono text-white">{fmtMoney(inrVal, "INR")}</span>
            </div>
          )}
          {usdVal != null && (
            <div className="flex items-center justify-between gap-4 text-sm mt-1.5">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: "#06b6d4" }} />
                <span className="text-white/70">USD</span>
              </div>
              <span className="font-mono text-white">{fmtMoney(usdVal, "USD")}</span>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: cfg.accent }} />
            <span className="text-white/70">{cfg.label}</span>
          </div>
          <span className="font-mono text-white">{cfg.format(combinedVal || 0)}</span>
        </div>
      )}
    </div>
  );
}

export function MonthlyTimelineChart({ data }: MonthlyTimelineChartProps) {
  const [metric, setMetric] = React.useState<Metric>("spend");
  const cfg = METRIC_CONFIG[metric];

  const chartData = data.months.map((m) => {
    if (metric === "spend") {
      return {
        label: monthLabel(m.month),
        month: m.month,
        inr: m.inr.spend,
        usd: m.usd.spend,
      };
    }
    return {
      label: monthLabel(m.month),
      month: m.month,
      combined: m.combined[cfg.combineKey!],
    };
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-1.5">
            Timeline
          </div>
          <div className="text-2xl font-semibold text-white tracking-tight">
            {data.month_count} months · {monthLabel(data.first_month)} → {monthLabel(data.last_month)}
          </div>
        </div>
      </div>

      <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] mb-6">
        {(["spend", "reach", "impressions", "leads", "clicks", "lpv"] as Metric[]).map((m) => {
          const isActive = metric === m;
          return (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="metric-tab"
                  className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/30 to-[#ec4899]/30 rounded-lg border border-white/10"
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative z-10">{METRIC_CONFIG[m].label}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={metric}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="h-[360px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="grad-purple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-cyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-pink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-amber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-emerald" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              interval="preserveStartEnd"
              minTickGap={32}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(v) =>
                metric === "spend"
                  ? `₹${(v / 100_000).toFixed(0)}L`
                  : v >= 1_00_00_000
                    ? `${(v / 1_00_00_000).toFixed(1)}Cr`
                    : v >= 100_000
                      ? `${(v / 100_000).toFixed(0)}L`
                      : v.toString()
              }
            />
            <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ stroke: "rgba(124,58,237,0.3)", strokeWidth: 1 }} />
            {metric === "spend" ? (
              <>
                <Area
                  type="monotone"
                  dataKey="inr"
                  stackId="1"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  fill="url(#grad-purple)"
                />
                <Area
                  type="monotone"
                  dataKey="usd"
                  stackId="2"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fill="url(#grad-cyan)"
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: 8, fontSize: 12, color: "rgba(255,255,255,0.7)" }}
                  formatter={(v: string) => (v === "inr" ? "INR" : "USD")}
                />
              </>
            ) : (
              <Area
                type="monotone"
                dataKey="combined"
                stroke={cfg.accent}
                strokeWidth={2.5}
                fill={
                  metric === "reach" ? "url(#grad-cyan)" :
                  metric === "impressions" ? "url(#grad-pink)" :
                  metric === "leads" ? "url(#grad-amber)" :
                  metric === "clicks" ? "url(#grad-purple)" :
                  "url(#grad-emerald)"
                }
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
