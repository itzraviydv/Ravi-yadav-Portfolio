// lib/formatters.ts
// Formatters that mirror the Python analyzer exactly. Same source of truth,
// no drift between the report and the live site.

export type Currency = "INR" | "USD";

/**
 * Compact money formatter (Cr / L / K).
 * 31,878,833.19 INR -> "₹3.19Cr+"
 * 107,994.40 USD    -> "$1.08L+"
 * 10,766 INR        -> "₹10.8K+"
 */
export function fmtMoneyLakhCrore(v: number | null | undefined, currency: Currency = "INR"): string {
  if (v == null || isNaN(v)) return "—";
  const sym = currency === "INR" ? "₹" : "$";
  if (v >= 1_00_00_000) return `${sym}${(v / 1_00_00_000).toFixed(2)}Cr+`;
  if (v >= 100_000) return `${sym}${(v / 100_000).toFixed(2)}L+`;
  if (v >= 1_000) return `${sym}${(v / 1_000).toFixed(1)}K+`;
  return `${sym}${v.toFixed(0)}+`;
}

/**
 * Crore / Lakh formatter for plain integers (no currency symbol).
 * 169,824,171 -> "16.98Cr+"
 * 3,714,415   -> "37.14Lakh+"
 * 2,023,650   -> "20.24Lakh+"
 */
export function fmtIntLakhCrore(v: number | null | undefined): string {
  if (v == null || isNaN(v)) return "—";
  if (v >= 1_00_00_000) return `${(v / 1_00_00_000).toFixed(2)}Cr+`;
  if (v >= 100_000) return `${(v / 100_000).toFixed(2)}Lakh+`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K+`;
  return `${Math.round(v).toLocaleString("en-IN")}+`;
}

/** Comma-separated integer with locale-aware thousands. */
export function fmtInt(v: number | null | undefined): string {
  if (v == null || isNaN(v)) return "—";
  return Math.round(v).toLocaleString("en-IN");
}

/** Percentage with 2 decimals. */
export function fmtPct(v: number | null | undefined): string {
  if (v == null || isNaN(v)) return "—";
  return `${v.toFixed(2)}%`;
}

/** Money with full precision. 10766.55 INR -> "₹10,766.55" */
export function fmtMoneyRaw(v: number | null | undefined, currency: Currency = "INR"): string {
  if (v == null || isNaN(v)) return "—";
  const sym = currency === "INR" ? "₹" : "$";
  return `${sym}${v.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

/** Compact, locale-aware. "₹3.19Cr" (no "+"). */
export function fmtMoney(v: number | null | undefined, currency: Currency = "INR"): string {
  if (v == null || isNaN(v)) return "—";
  const sym = currency === "INR" ? "₹" : "$";
  if (v >= 1_00_00_000) return `${sym}${(v / 1_00_00_000).toFixed(2)}Cr`;
  if (v >= 100_000) return `${sym}${(v / 100_000).toFixed(2)}L`;
  if (v >= 1_000) return `${sym}${(v / 1_000).toFixed(1)}K`;
  return `${sym}${v.toFixed(0)}`;
}

/** Compound spend formatter — shows both INR and USD when applicable. */
export function fmtSpendDual(inr: number, usd: number): string {
  const inrPart = fmtMoneyLakhCrore(inr, "INR");
  const usdPart = fmtMoneyLakhCrore(usd, "USD");
  return `${inrPart} (INR) + ${usdPart} (USD)`;
}

/** Convert a "2023-05" string to a long-form "May 2023" label. */
export function monthLabel(m: string): string {
  const [y, mo] = m.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(mo, 10) - 1]} ${y}`;
}

/** Strip markdown bold (**text**) for plain rendering. */
export function stripMd(s: string): string {
  return s.replace(/\*\*/g, "").trim();
}

/** Strip blockquote markdown for plain rendering. */
export function stripBlockquote(s: string): string {
  return s.replace(/^>\s*/gm, "").trim();
}