// scripts/filter-monthly-data.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const monthlyPath = join(process.cwd(), "../reports/monthly_aggregates.json");
const outputPath = join(process.cwd(), "content/monthly_aggregates.json");

const monthly = JSON.parse(readFileSync(monthlyPath, "utf-8"));

// Filter to only include January 2025 onwards
const START_MONTH = "2025-01";
const filteredMonths = monthly.months.filter((m) => m.month >= START_MONTH);

// Recalculate counts
const firstMonth = filteredMonths[0]?.month || "2025-01";
const lastMonth = filteredMonths[filteredMonths.length - 1]?.month || "2026-06";
const monthCount = filteredMonths.length;

// Recalculate sums
const sums = {
  inr: { spend: 0, reach: 0, impressions: 0, link_clicks: 0, clicks_all: 0, landing_page_views: 0, leads: 0, purchases: 0 },
  usd: { spend: 0, reach: 0, impressions: 0, link_clicks: 0, clicks_all: 0, landing_page_views: 0, leads: 0, purchases: 0 },
  combined: { spend: 0, reach: 0, impressions: 0, link_clicks: 0, clicks_all: 0, landing_page_views: 0, leads: 0, purchases: 0 },
};

for (const m of filteredMonths) {
  sums.inr.spend += m.inr.spend;
  sums.inr.reach += m.inr.reach;
  sums.inr.impressions += m.inr.impressions;
  sums.inr.link_clicks += m.inr.link_clicks;
  sums.inr.clicks_all += m.inr.clicks_all;
  sums.inr.landing_page_views += m.inr.landing_page_views;
  sums.inr.leads += m.inr.leads;
  sums.inr.purchases += m.inr.purchases;

  sums.usd.spend += m.usd.spend;
  sums.usd.reach += m.usd.reach;
  sums.usd.impressions += m.usd.impressions;
  sums.usd.link_clicks += m.usd.link_clicks;
  sums.usd.clicks_all += m.usd.clicks_all;
  sums.usd.landing_page_views += m.usd.landing_page_views;
  sums.usd.leads += m.usd.leads;
  sums.usd.purchases += m.usd.purchases;

  sums.combined.spend += m.combined.spend;
  sums.combined.reach += m.combined.reach;
  sums.combined.impressions += m.combined.impressions;
  sums.combined.link_clicks += m.combined.link_clicks;
  sums.combined.clicks_all += m.combined.clicks_all;
  sums.combined.landing_page_views += m.combined.landing_page_views;
  sums.combined.leads += m.combined.leads;
  sums.combined.purchases += m.combined.purchases;
}

const filtered = {
  ...monthly,
  first_month: firstMonth,
  last_month: lastMonth,
  month_count: monthCount,
  months: filteredMonths,
  totals: {
    inr: sums.inr,
    usd: sums.usd,
    combined: sums.combined,
  },
};

writeFileSync(outputPath, JSON.stringify(filtered, null, 2), "utf-8");
console.log(`✓ Filtered monthly_aggregates.json: ${firstMonth} → ${lastMonth} (${monthCount} months)`);
console.log(`  - Written to: ${outputPath}`);
