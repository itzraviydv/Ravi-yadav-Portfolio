// app/resume/page.tsx
import type { Metadata } from "next";
import { Section } from "@/components/effects/Section";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { Download, Linkedin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "ATS-friendly resume with 15 quantified achievement bullets. Download as PDF.",
};

const BULLETS = [
  {
    head: "₹3.19 Crore+ ad spend managed",
    body: "INR portfolio across 5 client accounts and 291 campaigns over a 3-year window (2023-2026). Plus $108K+ USD across 1 client and 187 campaigns.",
    gradient: "from-[#7c3aed] to-[#ec4899]",
  },
  {
    head: "212,351+ leads delivered",
    body: "Sourced from Meta pixel. INR lead-gen campaigns alone: 207,797 leads. USD lead-gen: 4,554 leads.",
    gradient: "from-[#ec4899] to-[#f59e0b]",
  },
  {
    head: "10,561+ purchases attributed",
    body: "INR purchase campaigns: 8,960. USD purchase campaigns: 1,601. Largest single purchase campaign: MSXSK Sales Campaign 9.2.26 (2,301 purchases, ₹29.13L spend).",
    gradient: "from-[#06b6d4] to-[#7c3aed]",
  },
  {
    head: "13.15% link CTR — best in portfolio",
    body: "FML-OG-CAMPAIGN: a single-concept creative isolation test at ₹10,766 spend. 6.7× the portfolio cold-prospecting average.",
    gradient: "from-[#f59e0b] to-[#ec4899]",
  },
  {
    head: "₹34.29 CPL — best in INR portfolio",
    body: "Same FML-OG-CAMPAIGN. 314 leads for ₹10,766. Validated a new creative-hook framework before any scaling.",
    gradient: "from-[#10b981] to-[#06b6d4]",
  },
  {
    head: "$0.84 CPL — best in USD portfolio",
    body: "2024-ToF-UTIL2-D497-Campaign-Raj. 1,577 leads at life-stage targeting, beating the interest-only cells by 70%.",
    gradient: "from-[#7c3aed] to-[#06b6d4]",
  },
  {
    head: "1.13% spend-weighted CTR (INR portfolio)",
    body: "Across all INR campaigns, spend-weighted. Blended CPC ₹14.71, blended CPM ₹154.37.",
    gradient: "from-[#ec4899] to-[#7c3aed]",
  },
  {
    head: "20% step rule · kill thresholds · 14-day LAL refresh",
    body: "Authored 7 internal playbooks. The 20% step rule protects every scale motion. The kill-threshold log protects every test.",
    gradient: "from-[#06b6d4] to-[#10b981]",
  },
  {
    head: "Retargeting 3-cohort structure",
    body: "Site-visitor / IG-FB engaged / video-75% viewer — mutually exclusive, 2/day frequency cap, 180d purchaser exclusion.",
    gradient: "from-[#f59e0b] to-[#7c3aed]",
  },
  {
    head: "88 campaigns on FML × Abhishek Pal alone",
    body: "₹1.20 Cr+ spend, 6.24 Cr+ reach, 119,678 leads, 15.92 Lakh+ link clicks. Largest single client account by surface area.",
    gradient: "from-[#7c3aed] to-[#10b981]",
  },
  {
    head: "187 campaigns on RAJ Polanki (USD)",
    body: "Multi-vertical, webinar-funnel, B2B paid acquisition. 4.14 Cr+ reach, 2.76 Lakh+ link clicks, 4,555 leads, 1,601 purchases.",
    gradient: "from-[#ec4899] to-[#06b6d4]",
  },
  {
    head: "Meta Pixel + CAPI server-side",
    body: "Full event-deduplication, advanced matching, and offline event uploads for every retargeting cohort.",
    gradient: "from-[#10b981] to-[#ec4899]",
  },
  {
    head: "Custom Meta API reporting pulls",
    body: "Supermetrics + Looker Studio dashboards refreshed daily. Spend-weighted reporting at every level (campaign → ad set → ad).",
    gradient: "from-[#06b6d4] to-[#f59e0b]",
  },
  {
    head: "71% testimonial-led video win-rate",
    body: "On MSXSK Sales Campaign 9.2.26 — testimonial UGC beat every studio-produced variant in head-to-head tests.",
    gradient: "from-[#7c3aed] to-[#f59e0b]",
  },
  {
    head: "Reporting window: 2025-01-01 → 2026-06-21",
    body: "Every number is anchored to this window and to a real campaign in the consolidated export.",
    gradient: "from-[#ec4899] to-[#10b981]",
  },
];

export default function ResumePage() {
  return (
    <Section
      eyebrow="Resume"
      title="ATS-friendly, 15 quantified achievement bullets."
      subtitle="Every number ties to a campaign in the consolidated Meta Ads Manager export."
      aurora
      auroraVariant="subtle"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        <Button
          size="lg"
          href="https://drive.google.com/file/d/1w_pXLnsghfMRqWYbpzIVVslicBrnuEH0/view?usp=sharing"
          download
          icon={<Download className="h-4 w-4" />}
        >
          Download resume (PDF)
        </Button>
        <Button
          size="lg"
          variant="glass"
          href="https://www.linkedin.com/in/ravi-yadav-60b339336"
          target="_blank"
          rel="noopener noreferrer"
          icon={<Linkedin className="h-4 w-4" />}
        >
          View LinkedIn
        </Button>
        <Button
          size="lg"
          variant="ghost"
          href="mailto:ravi.marketiing@gmail.com?subject=Resume%20request"
          icon={<Mail className="h-4 w-4" />}
        >
          Email me
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {BULLETS.map((b, i) => (
          <AnimatedSection key={i} delay={0.02 * i}>
            <div className="group relative h-full rounded-2xl p-5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
              <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${b.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${b.gradient}`} />
              <div className="relative">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <div className={`shrink-0 font-mono text-xs font-semibold w-6 bg-gradient-to-br ${b.gradient} bg-clip-text text-transparent`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base font-semibold text-white">{b.head}</h3>
                </div>
                <p className="text-sm text-white/65 leading-relaxed pl-9">{b.body}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
