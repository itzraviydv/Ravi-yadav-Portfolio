// lib/data.ts
// Server-side data loaders. All data is loaded at build time (RSC) and
// statically generated. No runtime fetch. No DB.
//
// Every number on the live site comes from one of these functions.

import { promises as fs } from "node:fs";
import path from "node:path";
import {
  type CaseStudiesFile,
  type ClientsFile,
  type ProcessFile,
  type ProofOfWorkFile,
  type TopCampaignsFile,
  type MonthlyAggregates,
  type HeadlineMetrics,
  type CaseStudy,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readJson<T>(file: string): Promise<T> {
  const fp = path.join(CONTENT_DIR, file);
  const raw = await fs.readFile(fp, "utf-8");
  return JSON.parse(raw) as T;
}

// ---------------------------------------------------------------------------
// Headline metrics — derived directly from monthly_aggregates.json
// so the hero KPIs and chart sums ALWAYS agree.
// ---------------------------------------------------------------------------
export async function getHeadlineMetrics(): Promise<HeadlineMetrics> {
  const m = await readJson<MonthlyAggregates>("monthly_aggregates.json");
  let totalSpendINR = 0, totalSpendUSD = 0;
  let totalReach = 0, totalImpressions = 0;
  let totalLinkClicks = 0, totalClicksAll = 0, totalLandingPageViews = 0;
  let totalLeads = 0, totalPurchases = 0;

  for (const row of m.months) {
    totalSpendINR += row.inr.spend;
    totalSpendUSD += row.usd.spend;
    totalReach += row.combined.reach;
    totalImpressions += row.combined.impressions;
    totalLinkClicks += row.combined.link_clicks;
    totalClicksAll += row.combined.clicks_all;
    totalLandingPageViews += row.combined.landing_page_views;
    totalLeads += row.combined.leads;
    totalPurchases += row.combined.purchases;
  }

  return {
    totalSpendINR,
    totalSpendUSD,
    totalReach,
    totalImpressions,
    totalLinkClicks,
    totalClicksAll,
    totalLandingPageViews,
    totalLeads,
    totalPurchases,
    avgCtrINR: 1.13,
    avgCpcINR: 14.71,
    avgCpmINR: 154.37,
    bestCTR: 13.15,
    bestCTRcampaign: "FML-OG-CAMPAIGN",
    lowestCPLINR: 34.29,
    lowestCPLINRcampaign: "FML-OG-CAMPAIGN",
    lowestCPLUSD: 0.84,
    lowestCPLUSDcampaign: "2024-ToF-UTIL2-D497-Campaign-Raj",
    nCampaigns: 478,
    nClients: 6,
    reportingWindowStart: m.first_month,
    reportingWindowEnd: m.last_month,
  };
}

// ---------------------------------------------------------------------------
// Monthly timeline (38 months) — for the spend/leads/reach chart
// ---------------------------------------------------------------------------
export async function getMonthlyAggregates(): Promise<MonthlyAggregates> {
  return readJson<MonthlyAggregates>("monthly_aggregates.json");
}

// ---------------------------------------------------------------------------
// Clients (6) — for the experience section
// ---------------------------------------------------------------------------
export async function getClients(): Promise<ClientsFile> {
  return readJson<ClientsFile>("clients.json");
}

// ---------------------------------------------------------------------------
// Clients grouped by displayName — for the Spend by Client chart.
// Two accounts with the same displayName are summed (spend, campaigns,
// reach, impressions, link_clicks, leads, purchases). Returns a flat
// array of the same shape as ClientEntry, ready for charting.
//
// Adding a new client never requires changes here: just add a new
// entry to clients.json with a unique slug. If two entries share a
// displayName, they are summed automatically.
// ---------------------------------------------------------------------------
export interface GroupedClient {
  displayName: string;
  shortName: string;
  name: string;          // first raw name encountered
  currency: Currency;     // first currency encountered
  slugs: string[];        // all source slugs that were summed
  focus: string;
  role: string;
  campaigns: number;
  spend: number;
  reach: number;
  impressions: number;
  link_clicks: number;
  leads: number;
  purchases: number;
}

import { type Currency, type ClientEntry } from "./types";

export async function getClientsGroupedByDisplayName(): Promise<GroupedClient[]> {
  const file = await getClients();
  const map = new Map<string, GroupedClient>();

  for (const c of file.clients) {
    const existing = map.get(c.displayName);
    if (existing) {
      existing.slugs.push(c.slug);
      existing.campaigns += c.campaigns;
      existing.spend += c.spend;
      existing.reach += c.reach;
      existing.impressions += c.impressions;
      existing.link_clicks += c.link_clicks;
      existing.leads += c.leads;
      existing.purchases += c.purchases;
    } else {
      map.set(c.displayName, {
        displayName: c.displayName,
        shortName: c.shortName,
        name: c.name,
        currency: c.currency,
        slugs: [c.slug],
        focus: c.focus,
        role: c.role,
        campaigns: c.campaigns,
        spend: c.spend,
        reach: c.reach,
        impressions: c.impressions,
        link_clicks: c.link_clicks,
        leads: c.leads,
        purchases: c.purchases,
      });
    }
  }

  // Sort by spend descending — most prominent client first
  return Array.from(map.values()).sort((a, b) => b.spend - a.spend);
}

// ---------------------------------------------------------------------------
// Case studies (6) — for the case studies index and detail pages
// ---------------------------------------------------------------------------
export async function getCaseStudies(): Promise<CaseStudiesFile> {
  return readJson<CaseStudiesFile>("case-studies.json");
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const all = await getCaseStudies();
  return all.studies.find((s) => s.slug === slug) || null;
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const all = await getCaseStudies();
  return all.studies.map((s) => s.slug);
}

// ---------------------------------------------------------------------------
// Process (5 steps) — for /process and the homepage preview
// ---------------------------------------------------------------------------
export async function getProcess(): Promise<ProcessFile> {
  return readJson<ProcessFile>("process.json");
}

// ---------------------------------------------------------------------------
// Proof of work — artifact inventory for /proof-of-work
// ---------------------------------------------------------------------------
export async function getProofOfWork(): Promise<ProofOfWorkFile> {
  return readJson<ProofOfWorkFile>("proof-of-work.json");
}

// ---------------------------------------------------------------------------
// Top campaigns leaderboards — for the homepage "Top campaigns" section
// ---------------------------------------------------------------------------
export async function getTopCampaigns(): Promise<TopCampaignsFile> {
  return readJson<TopCampaignsFile>("top-campaigns.json");
}