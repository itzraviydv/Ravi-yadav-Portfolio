// app/skills/page.tsx
import type { Metadata } from "next";
import { Section } from "@/components/effects/Section";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import {
  Target,
  BarChart3,
  Sparkles,
  ShoppingCart,
  Wrench,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Skills",
  description: "Meta stack, analytics, creative, e-commerce, PM tools. Funnel-stage expertise from TOF to BOF.",
};

const STACK = [
  {
    icon: Target,
    title: "Meta stack",
    description: "The core surface area for every campaign I run.",
    tools: [
      "Meta Ads Manager",
      "Meta Business Suite",
      "Meta Pixel + CAPI (server-side)",
      "Advantage+ / ASC+",
      "Creative Hub",
      "Experiments (A/B + holdout)",
    ],
    gradient: "from-[#7c3aed] to-[#ec4899]",
    bg: "from-[#7c3aed]/[0.12] to-[#ec4899]/[0.04]",
  },
  {
    icon: BarChart3,
    title: "Analytics & reporting",
    description: "Optimise against a P&L, not a dashboard.",
    tools: [
      "Google Analytics 4",
      "Looker Studio",
      "Google Sheets + Supermetrics",
      "Custom Meta API pulls",
      "Cohort + funnel analysis",
    ],
    gradient: "from-[#06b6d4] to-[#7c3aed]",
    bg: "from-[#06b6d4]/[0.12] to-[#7c3aed]/[0.04]",
  },
  {
    icon: Sparkles,
    title: "Creative",
    description: "Hook × format matrices tested every 7-14 days.",
    tools: [
      "Canva",
      "Capcut",
      "Fiverr (briefing + QA)",
      "Static + UGC video + carousel",
    ],
    gradient: "from-[#ec4899] to-[#f59e0b]",
    bg: "from-[#ec4899]/[0.12] to-[#f59e0b]/[0.04]",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce & funnel",
    description: "Closing the loop pixel → checkout → retention.",
    tools: [
      "Shopify",
      "Klaviyo (post-iMpression flows)",
      "Northbeam / Triple Whale (familiar)",
      "AppsFlyer (familiar)",
    ],
    gradient: "from-[#f59e0b] to-[#ec4899]",
    bg: "from-[#f59e0b]/[0.12] to-[#ec4899]/[0.04]",
  },
  {
    icon: Wrench,
    title: "Project management",
    description: "Internal docs, client reporting, async.",
    tools: ["Notion", "Slack", "Trello", "Asana (familiar)"],
    gradient: "from-[#10b981] to-[#06b6d4]",
    bg: "from-emerald-500/[0.12] to-[#06b6d4]/[0.04]",
  },
];

const FUNNEL = [
  {
    stage: "TOF",
    label: "Top of funnel",
    weight: "55%",
    desc: "Broad targeting, video-led creative, ASC+ prospecting",
    gradient: "from-[#7c3aed] to-[#ec4899]",
  },
  {
    stage: "MOF",
    label: "Middle of funnel",
    weight: "25%",
    desc: "LAL 1-5%, engagement retargeting, education-led",
    gradient: "from-[#ec4899] to-[#f59e0b]",
  },
  {
    stage: "BOF",
    label: "Bottom of funnel",
    weight: "20%",
    desc: "Site-visitor / IG-engaged / video-75% retargeting, always-on",
    gradient: "from-[#06b6d4] to-[#7c3aed]",
  },
];

const CERTS = [
  { name: "Meta Blueprint", status: "Q3 2026 (in progress)", tier: "Meta Certified Media Planning Professional" },
  { name: "Google Ads Measurement", status: "Self-study", tier: "In progress via Skillshop" },
];

export default function SkillsPage() {
  return (
    <>
      <Section
        eyebrow="Skills"
        title="A Meta-first stack, with the analytics depth to back it up."
        subtitle="I optimise against a P&L, not a dashboard. Every tool here has shipped real work in the last 90 days."
        aurora
        auroraVariant="default"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STACK.map((s, i) => (
            <AnimatedSection key={s.title} delay={0.05 * i}>
              <div className={`group relative h-full rounded-2xl overflow-hidden p-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-500 bg-gradient-to-br ${s.bg}`}>
                <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${s.gradient}`} />
                <div className="relative">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5">{s.title}</h3>
                  <p className="text-xs text-white/55 mb-5 leading-relaxed">{s.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tools.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/75 hover:border-white/20 hover:bg-white/[0.06] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Funnel expertise"
        title="How I split the spend across the funnel."
        subtitle="My average portfolio split, spend-weighted. I run TOF aggressively, MOF as the conversion engine, and BOF as the always-on safety net."
        aurora
        auroraVariant="warm"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FUNNEL.map((f, i) => (
            <AnimatedSection key={f.stage} delay={0.05 * i}>
              <div className={`group relative h-full rounded-2xl overflow-hidden p-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-500`}>
                <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${f.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${f.gradient}`} />
                <div className="relative">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className={`font-mono text-4xl font-semibold tracking-tight bg-gradient-to-br ${f.gradient} bg-clip-text text-transparent`}>
                      {f.stage}
                    </div>
                    <div className="font-mono text-2xl text-white/40">{f.weight}</div>
                  </div>
                  <div className="text-sm text-white/85 mb-2 font-medium">{f.label}</div>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Internal playbooks authored"
        title="7 playbooks I&apos;ve written and live by."
        subtitle="These get updated as the platform changes. The 20% step rule and the kill-threshold log are the two that actually move the P&L."
        aurora
        auroraVariant="cool"
      >
        <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 md:p-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Creative testing framework (hook × format matrices)",
              "LAL refresh cadence (14-day)",
              "Kill thresholds (7-day rolling CPA drift >20%)",
              "20% daily-budget step rule",
              "CBO vs ABO decision tree",
              "Retargeting cohort structure (3 mutually exclusive)",
              "Retargeting-creative variants (warm-traffic specific)",
            ].map((p, i) => (
              <li key={p} className="flex gap-3 text-sm text-white/85 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <span className={`shrink-0 h-6 w-6 rounded-md bg-gradient-to-br ${
                  i % 3 === 0 ? "from-[#7c3aed] to-[#ec4899]" :
                  i % 3 === 1 ? "from-[#ec4899] to-[#f59e0b]" :
                  "from-[#06b6d4] to-[#7c3aed]"
                } flex items-center justify-center text-white text-xs font-semibold`}>
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: p }} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        eyebrow="Certifications"
        title="Currently in progress"
        subtitle="I keep the cert list honest. Here&apos;s what I&apos;ve actually earned and what&apos;s in flight."
        aurora
        auroraVariant="subtle"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTS.map((c, i) => (
            <AnimatedSection key={c.name} delay={0.05 * i}>
              <div className="group relative h-full rounded-2xl p-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#f59e0b] to-[#ec4899] opacity-60" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ec4899] flex items-center justify-center shadow-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/[0.1] border border-amber-500/30 text-xs font-medium text-amber-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                    </span>
                    {c.status}
                  </div>
                </div>
                <div className="text-base font-semibold text-white">{c.name}</div>
                <div className="text-sm text-white/55 mt-1">{c.tier}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>
    </>
  );
}