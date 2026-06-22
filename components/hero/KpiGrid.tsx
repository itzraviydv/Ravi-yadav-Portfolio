// components/hero/KpiGrid.tsx
"use client";

import * as React from "react";
import { KpiCard } from "@/components/ui/KpiCard";
import { fmtMoneyLakhCrore, fmtIntLakhCrore } from "@/lib/formatters";
import { type HeadlineMetrics } from "@/lib/types";
import {
  Wallet,
  Users,
  Eye,
  MousePointerClick,
  FileText,
} from "lucide-react";

interface KpiGridProps {
  metrics: HeadlineMetrics;
}

export function KpiGrid({ metrics }: KpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
      <KpiCard
        index={0}
        accent="purple"
        icon={<Wallet className="h-4 w-4" />}
        label="Total Ad Spend"
        display={fmtMoneyLakhCrore(metrics.totalSpendINR, "INR")}
        secondary={`+ ${fmtMoneyLakhCrore(metrics.totalSpendUSD, "USD")}`}
      />
      <KpiCard
        index={1}
        accent="cyan"
        icon={<Users className="h-4 w-4" />}
        label="Total Reach"
        display={fmtIntLakhCrore(metrics.totalReach)}
      />
      <KpiCard
        index={2}
        accent="pink"
        icon={<Eye className="h-4 w-4" />}
        label="Total Impressions"
        display={fmtIntLakhCrore(metrics.totalImpressions)}
      />
      <KpiCard
        index={3}
        accent="amber"
        icon={<MousePointerClick className="h-4 w-4" />}
        label="Total Clicks"
        display={fmtIntLakhCrore(metrics.totalLinkClicks)}
      />
      <KpiCard
        index={4}
        accent="emerald"
        icon={<FileText className="h-4 w-4" />}
        label="Landing Page Views"
        display={fmtIntLakhCrore(metrics.totalLandingPageViews)}
      />
    </div>
  );
}
