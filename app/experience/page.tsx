// app/experience/page.tsx
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/effects/Section";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { getClients } from "@/lib/data";
import { fmtMoney, fmtIntLakhCrore, fmtInt } from "@/lib/formatters";
import * as LucideIcons from "lucide-react";

export const metadata: Metadata = {
  title: "Experience",
  description: "6 client accounts across INR and USD portfolios. Lead-gen and purchase-optimised campaigns.",
};

const PRINCIPLES = [
  {
    icon: "TrendingUp",
    title: "20% step rule",
    body: "Daily budget changes greater than 20% reset the learning phase and tank ROAS for ~5 days. I scale in 3-4 steps, not 1.",
    gradient: "from-[#7c3aed] to-[#ec4899]",
  },
  {
    icon: "Target",
    title: "Hard kill thresholds",
    body: "Any ad set whose 7-day rolling CPA drifts >20% above the campaign median gets paused. No exceptions, no second chances.",
    gradient: "from-[#ec4899] to-[#f59e0b]",
  },
  {
    icon: "BarChart3",
    title: "Spend-weighted reporting",
    body: "Portfolio averages are spend-weighted — a ₹1L campaign moves the needle more than a ₹1K test.",
    gradient: "from-[#06b6d4] to-[#7c3aed]",
  },
  {
    icon: "FlaskConical",
    title: "Single-variable testing",
    body: "One variable per ad set. Impression caps to suppress algorithmic bias. Decision rules pre-registered before the test starts.",
    gradient: "from-[#f59e0b] to-[#ec4899]",
  },
];

export default async function ExperiencePage() {
  const clients = await getClients();
  return (
    <>
      <Section
        eyebrow="Experience"
        title="6 client accounts. 478 campaigns. 3+ years on Meta."
        subtitle="INR portfolio (5 clients, lead-gen + purchase) and a USD portfolio (1 client, 187 campaigns, multi-vertical)."
        aurora
        auroraVariant="subtle"
      >
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            aria-hidden
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#7c3aed]/50 via-[#ec4899]/50 via-[#06b6d4]/50 to-transparent"
          />

          <div className="space-y-8 md:space-y-12">
            {clients.clients.map((c, i) => (
              <AnimatedSection
                key={c.slug}
                delay={0.05 * i}
                as="div"
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center ${
                  i % 2 === 0 ? "" : "md:[&>:first-child]:order-2"
                }`}
              >
                {/* Connector dot */}
                <div
                  aria-hidden
                  className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#ec4899] ring-4 ring-[#0a0020] z-10"
                />

                <div className={`pl-14 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="text-xs text-white/40 font-mono mb-2">CLIENT {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-2xl font-semibold text-white mb-1">
                    {c.name}
                  </h3>
                  <div className="text-sm text-white/60 mb-2">{c.role}</div>
                  <Badge variant={c.currency === "USD" ? "cyan" : "purple"}>
                    {c.currency}
                  </Badge>
                </div>

                <div className={`pl-14 md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                  <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 hover:border-white/[0.18] hover:bg-white/[0.05] transition-all">
                    <p className="text-sm text-white/70 mb-5 leading-relaxed">{c.focus}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.06]">
                      <div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">Campaigns</div>
                        <div className="font-mono text-lg text-white mt-1">{c.campaigns}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">Spend</div>
                        <div className="font-mono text-lg text-white mt-1">
                          {fmtMoney(c.spend, c.currency)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">Reach</div>
                        <div className="font-mono text-lg text-white mt-1">
                          {fmtIntLakhCrore(c.reach)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">
                          {c.purchases > 0 ? "Purchases" : "Leads"}
                        </div>
                        <div className="font-mono text-lg text-white mt-1">
                          {c.purchases > 0
                            ? fmtInt(c.purchases)
                            : fmtIntLakhCrore(c.leads)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Operating principles"
        title="The four rules I never break."
        subtitle="These are the disciplines that compound across 6 months. I&apos;d rather kill a campaign than let it bleed budget."
        aurora
        auroraVariant="subtle"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => {
            const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[p.icon];
            return (
              <AnimatedSection key={p.title} delay={0.05 * i}>
                <div className="group relative h-full rounded-2xl p-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-500 overflow-hidden">
                  <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${p.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${p.gradient}`} />
                  <div className="relative">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      {Icon && <Icon className="h-6 w-6 text-white" />}
                    </div>
                    <div className="font-mono text-xs text-white/40 mb-1.5">0{i + 1}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-white/65 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>
    </>
  );
}