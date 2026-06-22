// lib/types.ts
// TypeScript interfaces for the structured data used by the site.

export type Currency = "INR" | "USD";

export interface MonthlyMetric {
  spend: number;
  reach: number;
  impressions: number;
  link_clicks: number;
  clicks_all: number;
  landing_page_views: number;
  leads: number;
  purchases: number;
  campaigns_active: number;
}

export interface MonthlyRow {
  month: string; // "2023-05"
  inr: MonthlyMetric;
  usd: MonthlyMetric;
  combined: MonthlyMetric & { spend_inr: number; spend_usd: number };
}

export interface MonthlyAggregates {
  generated: string;
  source: string;
  methodology: string;
  month_count: number;
  first_month: string;
  last_month: string;
  months: MonthlyRow[];
}

export interface ClientEntry {
  name: string;
  displayName: string;
  shortName: string;
  slug: string;
  currency: Currency;
  role: string;
  focus: string;
  campaigns: number;
  spend: number;
  reach: number;
  impressions: number;
  link_clicks: number;
  leads: number;
  purchases: number;
}

export interface ClientsFile {
  generated: string;
  source: string;
  count: number;
  display_count: number;
  notes: string;
  clients: ClientEntry[];
}

export interface CaseStudyTableRow {
  [key: string]: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  currency: Currency;
  window: string;
  tag: string;
  objective: string;
  strategy: string[];
  budget: CaseStudyTableRow[];
  results: CaseStudyTableRow[];
  learnings: string[];
  contribution: string[];
  screenshots: string[];
}

export interface CaseStudiesFile {
  generated: string;
  source: string;
  count: number;
  studies: CaseStudy[];
}

export interface ProcessStep {
  id: "research" | "creative-testing" | "audience-testing" | "scaling" | "optimization";
  step: 1 | 2 | 3 | 4 | 5;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  exampleCampaign: string;
  stat: { label: string; value: string };
  tools: string[];
}

export interface ProcessFile {
  generated: string;
  source: string;
  steps: ProcessStep[];
}

export interface ProofOfWorkGroup {
  order: number;
  title: string;
  items: (string | string[])[];
}

export interface ProofOfWorkFile {
  generated: string;
  source: string;
  groups: ProofOfWorkGroup[];
}

export interface TopCampaignsFile {
  generated: string;
  source: string;
  bySpendINR: CaseStudyTableRow[];
  bySpendUSD: CaseStudyTableRow[];
  byReach: CaseStudyTableRow[];
  byCTR: CaseStudyTableRow[];
  lowestCPLINR: CaseStudyTableRow[];
  lowestCPLUSD: CaseStudyTableRow[];
  lowestCPMINR: CaseStudyTableRow[];
  lowestCPMUSD: CaseStudyTableRow[];
}

export interface HeadlineMetrics {
  totalSpendINR: number;
  totalSpendUSD: number;
  totalReach: number;
  totalImpressions: number;
  totalLinkClicks: number;
  totalClicksAll: number;
  totalLandingPageViews: number;
  totalLeads: number;
  totalPurchases: number;
  avgCtrINR: number;
  avgCpcINR: number;
  avgCpmINR: number;
  bestCTR: number;
  bestCTRcampaign: string;
  lowestCPLINR: number;
  lowestCPLINRcampaign: string;
  lowestCPLUSD: number;
  lowestCPLUSDcampaign: string;
  nCampaigns: number;
  nClients: number;
  reportingWindowStart: string;
  reportingWindowEnd: string;
}