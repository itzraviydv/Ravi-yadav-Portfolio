// scripts/generate-content-json.mjs
// Reads the analyzed markdown files in C:/Foremost Leads/ and writes
// structured JSON to portfolio/content/ for the Next.js site.
//
// Inputs (only required when running locally with the source files available):
//   ../case-studies.md                              (6 case studies in markdown)
//   ../proof-of-work.md                             (visual inventory)
//   ../reports/portfolio-data-summary.md            (per-client + top-10 tables)
//
// Outputs (always written; committed JSON is used as a fallback if sources are missing):
//   content/case-studies.json      (6 case studies, structured)
//   content/process.json           (5 process steps)
//   content/proof-of-work.json     (artifact inventory)
//   content/clients.json           (6 client entries)
//   content/top-campaigns.json     (top-N tables from portfolio-data-summary.md)
//
// Behaviour:
//   - Local dev: regenerates from the .md files every time.
//   - CI / Vercel build: if the .md source files are missing (which is the case
//     on Vercel, since they live outside the repo), the script SKIPS regeneration
//     for that file. The committed content/*.json is already up to date and will
//     be picked up by the Next.js build. This keeps the build idempotent.
//
// Re-run after editing the .md files (locally):
//   node scripts/generate-content-json.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FOREMOST = resolve(__dirname, "..", "..");
const PORTFOLIO = resolve(__dirname, "..");
const CONTENT_DIR = join(PORTFOLIO, "content");

if (!existsSync(CONTENT_DIR)) mkdirSync(CONTENT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function read(path, optional = false) {
  const fullPath = join(FOREMOST, path);
  if (!existsSync(fullPath)) {
    if (optional) {
      console.log(`  (skip) ${path} — not found, keeping existing content/${path.replace(".md", ".json")}`);
      return null;
    }
    throw new Error(`Source file not found: ${fullPath}`);
  }
  return readFileSync(fullPath, "utf-8");
}

function writeJson(path, data) {
  const out = join(CONTENT_DIR, path);
  writeFileSync(out, JSON.stringify(data, null, 2), "utf-8");
  console.log(`  Wrote ${path}`);
}

// ---------------------------------------------------------------------------
// Slugify a campaign name for URL use
// ---------------------------------------------------------------------------
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

// ---------------------------------------------------------------------------
// Parse case-studies.md into 6 structured objects
// ---------------------------------------------------------------------------
function parseCaseStudies(md) {
  const blocks = md.split(/^##\s+/m).filter((b) => b.startsWith("Case Study"));
  const studies = [];

  for (const block of blocks) {
    const lines = block.split("\n");
    const titleLine = lines[0]; // "Case Study 1 — FML-OG-CAMPAIGN"
    const title = titleLine.split("—").slice(1).join("—").trim();

    const meta = {};
    const bulletList = (section) => {
      const idx = block.indexOf(section);
      if (idx < 0) return [];
      const tail = block.slice(idx);
      const items = [];
      for (const line of tail.split("\n").slice(1)) {
        if (line.startsWith("### ") || line.startsWith("## ")) break;
        const m = line.replace(/\r/g, "").match(/^(?:[-*]|\d+\.)\s+(.+)/);
        if (m) items.push(m[1].trim());
      }
      return items;
    };
    const sectionText = (section) => {
      const idx = block.indexOf(section);
      if (idx < 0) return "";
      let text = block.slice(idx).split("\n").slice(1).join("\n");
      text = text.split(/\n###\s+/)[0];
      text = text.split(/\n##\s+/)[0];
      return text.trim();
    };
    const table = (header) => {
      const idx = block.indexOf(header);
      if (idx < 0) return [];
      const after = block.slice(idx).split("\n").slice(1);
      const rows = [];
      let headers = null;
      let pastSeparator = false;
      for (const line of after) {
        if (line.startsWith("### ") || line.startsWith("## ")) break;
        const m = line.replace(/\r/g, "").match(/^\|(.+)\|$/);
        if (!m) continue;
        const cells = m[1].split("|").map((c) => c.trim());
        const isSeparator = cells.every((c) => /^[-:]+$/.test(c));
        if (!headers) {
          if (isSeparator) continue;
          headers = cells;
        } else if (isSeparator) {
          pastSeparator = true;
        } else if (pastSeparator) {
          const obj = {};
          headers.forEach((h, i) => (obj[h] = cells[i] || ""));
          rows.push(obj);
        }
      }
      return rows;
    };

    // Meta lines (Client, Currency, Window, Tag) — search the full block, stop at newline OR " · **"
    const field = (label) => {
      const re = new RegExp(`\\*\\*${label}:\\*\\*\\s+([^\\r\\n]+)`);
      const m = block.match(re);
      if (!m) return "";
      // Stop at " · **" separator or newline
      return m[1].split(/\s*·\s+\*\*/)[0].trim();
    };
    const clientMatch = field("Client");
    const currencyMatch = field("Currency");
    const windowMatch = field("Window");
    const tagMatch = field("Tag");

    const slug = slugify(title);
    studies.push({
      slug,
      title,
      client: clientMatch,
      currency: currencyMatch,
      window: windowMatch,
      tag: tagMatch,
      objective: sectionText("### Objective"),
      strategy: bulletList("### Strategy"),
      budget: table("### Budget"),
      results: table("### Results"),
      learnings: bulletList("### Learnings"),
      contribution: bulletList("### My Contribution"),
      screenshots: (() => {
        const idx = block.indexOf("**Screenshots");
        if (idx < 0) return [];
        const tail = block.slice(idx).split("\n").slice(1);
        const items = [];
        for (const line of tail) {
          if (line.startsWith("### ") || line.startsWith("## ")) break;
          const m = line.match(/^\s*-\s+\[ \]\s+(.+)/);
          if (m) items.push(m[1].trim());
        }
        return items;
      })(),
    });
  }
  return studies;
}

// ---------------------------------------------------------------------------
// Parse 5 process steps
// ---------------------------------------------------------------------------
function buildProcess() {
  return [
    {
      id: "research",
      step: 1,
      icon: "Search",
      title: "Research",
      tagline: "Every campaign starts with a hypothesis, not a budget.",
      description:
        "I start every campaign with a pre-registered decision rule: a specific CPL or ROAS threshold, a kill threshold, and a scale threshold. The hypothesis is written before the budget is set. The decision rule is what makes the test fair — without it, every campaign ends in a vibes-based 'let me check tomorrow' loop.",
      exampleCampaign: "FML-OG-CAMPAIGN",
      stat: { label: "Decision rules pre-registered on every test", value: "100%" },
      tools: ["Notion", "Google Sheets", "Meta Ads Manager"],
    },
    {
      id: "creative-testing",
      step: 2,
      icon: "FlaskConical",
      title: "Creative Testing",
      tagline: "Single-variable isolation. One concept per ad set. No algorithmic bias.",
      description:
        "Every winning creative in this portfolio beat its peers in an isolation test — one concept per ad set, equal budget, impression caps to suppress algorithmic bias. I run hook × format matrices (24 variants in MSXSK, 18 in GN-CA Scale) and only scale the top 3. The dominant winner-format: testimonial-led video (won 71% of head-to-head tests on the largest purchase campaign).",
      exampleCampaign: "FML-OG-CAMPAIGN (13.15% CTR, ₹34.29 CPL)",
      stat: { label: "Testimonial-led video win-rate (MSXSK)", value: "71%" },
      tools: ["Meta Creative Hub", "Canva", "Capcut", "Fiverr"],
    },
    {
      id: "audience-testing",
      step: 3,
      icon: "Users",
      title: "Audience Testing",
      tagline: "Life-stage beats interest for utility. Purchasers beat video-viewers for LAL seeding.",
      description:
        "I test audience hypotheses with the same discipline I test creatives: 8-cell matrices, equal budget per cell, pre-registered decision rules. The life-stage vs interest test on 2024-ToF-UTIL2-D497 won 3 of 4 head-to-head cells. The rule I ship across the portfolio: always seed LALs from the bottom of the funnel, not from video viewers.",
      exampleCampaign: "2024-ToF-UTIL2-D497 ($0.84/lead, 1,577 leads)",
      stat: { label: "Life-stage CPL vs interest CPL", value: "$0.71 vs $2.40" },
      tools: ["Meta Ads Manager", "GA4", "Looker Studio"],
    },
    {
      id: "scaling",
      step: 4,
      icon: "TrendingUp",
      title: "Scaling",
      tagline: "20% per week. Hard pause at 7-day ROAS < 2.5×. LAL refresh every 14 days.",
      description:
        "The 20% daily-budget step rule is the single biggest scaling discipline in the portfolio. A 100% jump from ₹4K/day to ₹8K/day dropped MSXSK ROAS to 2.8× for 6 days; the same scale in three 20% steps kept ROAS in the 4.0–4.5× band. Hard kill thresholds protect every scale motion: any ad set whose 7-day rolling CPA drifts >20% above the campaign median gets paused.",
      exampleCampaign: "MSXSK Sales Campaign 9.2.26 (₹29.13L spend, 2,301 purchases)",
      stat: { label: "Largest single-campaign spend", value: "₹29.13L+" },
      tools: ["Meta Ads Manager", "Looker Studio", "Google Sheets"],
    },
    {
      id: "optimization",
      step: 5,
      icon: "Settings",
      title: "Optimization",
      tagline: "Spend-weighted reporting. Kill-threshold enforcement. Weekly creative refresh.",
      description:
        "I optimise against a P&L, not a dashboard. Every portfolio-level average I report is spend-weighted (so a ₹1L spend campaign moves the needle more than a ₹1K test). The kill-threshold log is enforced every Friday. The retargeting layer is a permanent fixture across every FML-X-ABHISHEK-PAL campaign structure — site-visitor / IG-FB engaged / video-75% viewer cohorts, mutually exclusive, 2/day frequency cap.",
      exampleCampaign: "RETARGETING-CAMPAIGN [22-12-25] (7.52% CTR)",
      stat: { label: "Retargeting CTR vs cold prospecting", value: "6.7×" },
      tools: ["Meta Ads Manager", "Meta Pixel + CAPI", "Supermetrics", "Looker Studio"],
    },
  ];
}

// ---------------------------------------------------------------------------
// Parse proof-of-work.md into inventory
// ---------------------------------------------------------------------------
function parseProofOfWork(md) {
  const groups = [];
  const sections = md.split(/\n##\s+(\d+)\.\s+/).slice(1);
  for (let i = 0; i < sections.length; i += 2) {
    const num = sections[i];
    const body = sections[i + 1] || "";
    const titleMatch = body.match(/^([^\n]+)/);
    const title = titleMatch ? titleMatch[1].trim() : "";
    const lines = body.split("\n").slice(1);
    const items = [];
    let inTable = false;
    for (const line of lines) {
      if (/^\|/.test(line)) {
        inTable = true;
        const m = line.replace(/\r/g, "").match(/^\|(.+)\|$/);
        if (m) {
          const cells = m[1].split("|").map((c) => c.trim());
          if (!/^[-:]+$/.test(cells[0])) items.push(cells);
        }
      } else if (line.startsWith("##") || line.startsWith("#")) {
        break;
      } else if (line.trim() === "") {
        if (inTable) inTable = false;
      } else if (line.trim().startsWith("- ")) {
        items.push(["text", line.trim().slice(2)]);
      }
    }
    groups.push({ order: parseInt(num), title, items });
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Parse clients from portfolio-data-summary.md
// ---------------------------------------------------------------------------
function parseClients() {
  // Hardcoded from the consolidated data — these are stable per-client totals
  // that match reports/portfolio-metrics.md
  // displayName = client-facing label on charts (full name in tooltips)
  // shortName   = x-axis label when space is limited
  // Two entries with the same displayName are summed on the Spend-by-Client chart
  return [
    {
      name: "FML × Abhishek Pal",
      displayName: "Abhishek Pal",
      shortName: "Abhishek",
      slug: "fml-abhishek-pal",
      currency: "INR",
      role: "Performance Marketing Lead — Lead Generation",
      focus: "lead-gen on Meta, creative testing, CPL discipline",
      campaigns: 88,
      spend: 12021050.86,
      reach: 62383989,
      impressions: 146300824,
      link_clicks: 1591951,
      leads: 119678,
      purchases: 0,
    },
    {
      name: "A Hishek Pal — FML",
      displayName: "Abhishek Pal",
      shortName: "Abhishek",
      slug: "a-hishek-pal-fml",
      currency: "INR",
      role: "Performance Marketing Lead — Lead Generation",
      focus: "lead-gen on Meta, creative testing, CPL discipline",
      campaigns: 54,
      spend: 7389838.99,
      reach: 37566151,
      impressions: 82923664,
      link_clicks: 845942,
      leads: 64098,
      purchases: 0,
    },
    {
      name: "SSA × Satyam Khandelwal",
      displayName: "Satyam Khandelwal",
      shortName: "Satyam",
      slug: "ssa-satyam-khandelwal",
      currency: "INR",
      role: "Performance Marketing Lead — DTC Purchase Campaigns",
      focus: "purchase-optimised Meta Ads, ROAS-driven scaling, LAL refresh cadence",
      campaigns: 19,
      spend: 6819247.91,
      reach: 9746262,
      impressions: 42518982,
      link_clicks: 419031,
      leads: 0,
      purchases: 6786,
    },
    {
      name: "Agrika Khatri 2",
      displayName: "Agrika Khatri",
      shortName: "Agrika",
      slug: "agrika-khatri-2",
      currency: "INR",
      role: "Performance Marketing Lead — DTC Purchase Campaigns",
      focus: "purchase-optimised Meta Ads, ROAS-driven scaling, LAL refresh cadence",
      campaigns: 118,
      spend: 4423674.34,
      reach: 6451355,
      impressions: 13523736,
      link_clicks: 162351,
      leads: 0,
      purchases: 2174,
    },
    {
      name: "Piyush Ahuja",
      displayName: "Piyush Ahuja",
      shortName: "Piyush",
      slug: "piyush-ahuja",
      currency: "INR",
      role: "Performance Marketing Lead — Lead Generation",
      focus: "lead-gen on Meta, creative testing, CPL discipline",
      campaigns: 12,
      spend: 1290845.32,
      reach: 12317966,
      impressions: 24378825,
      link_clicks: 419106,
      leads: 24020,
      purchases: 0,
    },
    {
      name: "RAJ Polanki",
      displayName: "Raj Polanki",
      shortName: "Raj",
      slug: "raj-polanki",
      currency: "USD",
      role: "Performance Marketing Lead — Multi-Market (USD)",
      focus: "USD-denominated scaling, webinar funnels, B2B paid acquisition",
      campaigns: 187,
      spend: 107994.40,
      reach: 41358448,
      impressions: 90723059,
      link_clicks: 276034,
      leads: 4555,
      purchases: 1601,
    },
  ];
}

// ---------------------------------------------------------------------------
// Top campaigns tables from portfolio-data-summary.md
// ---------------------------------------------------------------------------
function parseTopCampaigns() {
  const md = read("reports/portfolio-data-summary.md", true);
  const out = { bySpendINR: [], bySpendUSD: [], byReach: [], byCTR: [], lowestCPLINR: [], lowestCPLUSD: [], lowestCPMINR: [], lowestCPMUSD: [] };
  if (!md) return out; // source file not available — keep existing content/top-campaigns.json
  function grabTable(header) {
    const idx = md.indexOf(header);
    if (idx < 0) return [];
    const after = md.slice(idx).split("\n").slice(1);
    const rows = [];
    let headers = null;
    for (const line of after) {
      if (line.startsWith("### ") || line.startsWith("## ")) break;
      const m = line.replace(/\r/g, "").match(/^\|(.+)\|$/);
      if (!m) continue;
      const cells = m[1].split("|").map((c) => c.trim());
      if (!headers) {
        if (cells.every((c) => /^[-:]+$/.test(c))) continue;
        headers = cells;
      } else if (cells.every((c) => /^[-:]+$/.test(c))) continue;
      else {
        const obj = {};
        headers.forEach((h, i) => (obj[h] = cells[i] || ""));
        rows.push(obj);
      }
    }
    return rows;
  }
  out.bySpendINR = grabTable("### 3.1 By Ad Spend (INR)");
  out.bySpendUSD = grabTable("### 3.2 By Ad Spend (USD — RAJ POLANKI)");
  out.byReach = grabTable("### 3.3 By Reach (top 10, all currencies)");
  out.byCTR = grabTable("## 4. Best CTR Campaigns");
  out.lowestCPLINR = grabTable("### 5.1 Lowest CPL — INR");
  out.lowestCPLUSD = grabTable("### 5.2 Lowest CPL — USD");
  out.lowestCPMINR = grabTable("### 6.1 Lowest CPM — INR");
  out.lowestCPMUSD = grabTable("### 6.2 Lowest CPM — USD");
  return out;
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
console.log("Generating content JSON...");

const csMd = read("case-studies.md", true);
const powMd = read("proof-of-work.md", true);

if (csMd) {
  writeJson("case-studies.json", {
    generated: "2026-06-21",
    source: "case-studies.md",
    count: 6,
    studies: parseCaseStudies(csMd),
  });
} else {
  console.log("  (skip) case-studies.json — source not available");
}

if (powMd) {
  writeJson("proof-of-work.json", {
    generated: "2026-06-21",
    source: "proof-of-work.md",
    groups: parseProofOfWork(powMd),
  });
} else {
  console.log("  (skip) proof-of-work.json — source not available");
}

// process.json is generated from the case studies (hardcoded patterns) — always write
writeJson("process.json", {
  generated: "2026-06-21",
  source: "case-studies.md cross-case-study patterns",
  steps: buildProcess(),
});

// clients.json: data comes from the hardcoded totals in this script (matching portfolio-metrics.md)
// Always written — no external source required.
writeJson("clients.json", {
  generated: "2026-06-22",
  source: "reports/portfolio-data-summary.md + reports/portfolio-metrics.md",
  count: 6,
  display_count: 5,
  notes: "displayName is the client-facing label shown on charts. Two accounts (FML × Abhishek Pal and A Hishek Pal — FML) collapse to 'Abhishek Pal' on the Spend by Client chart. Spend/campaigns/etc. are summed across the collapsed accounts. Add a new client by appending an entry with a unique slug and a displayName.",
  clients: parseClients(),
});

// top-campaigns.json: needs portfolio-data-summary.md; skip if not available
const topCampaigns = parseTopCampaigns();
const hasTopData = Object.values(topCampaigns).some(arr => arr.length > 0);
if (hasTopData) {
  writeJson("top-campaigns.json", {
    generated: "2026-06-21",
    source: "reports/portfolio-data-summary.md",
    ...topCampaigns,
  });
} else {
  console.log("  (skip) top-campaigns.json — source not available");
}

console.log("Done.");