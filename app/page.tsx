// app/page.tsx
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Layers,
  Image as ImageIcon,
  FileText,
  Mail,
  Linkedin,
  Download,
  Sparkles,
} from "lucide-react";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/effects/Section";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MonthlyTimelineChart } from "@/components/charts/MonthlyTimelineChart";
import { ClientBreakdownChart } from "@/components/charts/ClientBreakdownChart";
import { FunnelSplitChart } from "@/components/charts/FunnelSplitChart";
import { CurrencyMixChart } from "@/components/charts/CurrencyMixChart";
import { TopCampaignsChart } from "@/components/charts/TopCampaignsChart";
import { ProcessStep } from "@/components/process/ProcessStep";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Marquee } from "@/components/effects/Marquee";
import {
  getHeadlineMetrics,
  getMonthlyAggregates,
  getClients,
  getClientsGroupedByDisplayName,
  getCaseStudies,
  getProcess,
  getTopCampaigns,
} from "@/lib/data";

export default async function HomePage() {
  const [metrics, monthly, clients, groupedClients, studies, process, top] = await Promise.all([
    getHeadlineMetrics(),
    getMonthlyAggregates(),
    getClients(),
    getClientsGroupedByDisplayName(),
    getCaseStudies(),
    getProcess(),
    getTopCampaigns(),
  ]);

  const purchaseClients = clients.clients.filter((c) => c.purchases > 0);
  const leadClients = clients.clients.filter((c) => c.purchases === 0 && c.leads > 0);
  const leadsCampaigns = leadClients.reduce((s, c) => s + c.campaigns, 0);
  const purchaseCampaigns = purchaseClients.reduce((s, c) => s + c.campaigns, 0);
  const totalLeads = leadClients.reduce((s, c) => s + c.leads, 0);
  const totalPurchases = purchaseClients.reduce((s, c) => s + c.purchases, 0);

  // Tech-marquee entries
  const techStack = [
    "Meta Ads Manager",
    "Meta Pixel + CAPI",
    "Advantage+ / ASC+",
    "Looker Studio",
    "GA4",
    "Shopify",
    "Klaviyo",
    "Supermetrics",
    "Canva",
    "Capcut",
    "Creative Hub",
    "Experiments (A/B)",
  ];

  return (
    <>
      <Hero metrics={metrics} />

      {/* Tech stack marquee */}
      <section className="relative py-10 border-y border-white/[0.06] bg-white/[0.01]">
        <Container>
          <div className="text-center mb-4">
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">
              The stack I run every day
            </span>
          </div>
        </Container>
        <Marquee speed="slow" className="py-2">
          {techStack.map((tech) => (
            <div
              key={tech}
              className="shrink-0 px-5 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] text-sm font-medium text-white/80 hover:text-white hover:border-white/20 transition-colors"
            >
              {tech}
            </div>
          ))}
        </Marquee>
      </section>

      {/* Metrics dashboard */}
      <Section
        id="metrics"
        eyebrow="Metrics dashboard"
        title="The numbers, end to end."
        subtitle="Every figure is sourced from 478 real campaigns in my Meta Ads Manager exports. No invented KPIs."
        aurora
        auroraVariant="default"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <AnimatedSection delay={0}>
            <Card hover className="p-5 group">
              <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">Campaigns</div>
              <div className="font-mono text-3xl font-semibold text-white tracking-tight">{metrics.nCampaigns}</div>
              <div className="text-xs text-white/50 mt-1">{metrics.nClients} client accounts</div>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <Card hover className="p-5 group">
              <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">Leads delivered</div>
              <div className="font-mono text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] to-[#ec4899] tracking-tight">
                {(metrics.totalLeads).toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Meta pixel
              </div>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Card hover className="p-5 group">
              <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">Purchases</div>
              <div className="font-mono text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#fbbf24] to-[#ec4899] tracking-tight">
                {(metrics.totalPurchases).toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Meta pixel
              </div>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <Card hover className="p-5 group">
              <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">Best CTR</div>
              <div className="font-mono text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#67e8f9] to-[#7c3aed] tracking-tight">
                {metrics.bestCTR.toFixed(2)}%
              </div>
              <div className="text-xs text-white/50 mt-1 truncate" title={metrics.bestCTRcampaign}>
                {metrics.bestCTRcampaign}
              </div>
            </Card>
          </AnimatedSection>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <AnimatedSection className="lg:col-span-2">
            <Card className="p-5 md:p-6 h-full">
              <MonthlyTimelineChart data={monthly} />
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Card className="p-5 md:p-6 h-full flex flex-col">
              <div className="mb-3">
                <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-1">Spend by client</div>
                <div className="text-sm text-white/65">6 client accounts · INR + USD</div>
              </div>
              <ClientBreakdownChart clients={groupedClients} />
            </Card>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <AnimatedSection>
            <Card className="p-5 md:p-6 h-full">
              <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-1">Funnel split</div>
              <div className="text-sm text-white/65 mb-4">Lead-gen vs purchase campaigns</div>
              <FunnelSplitChart
                leadsCampaigns={leadsCampaigns}
                purchaseCampaigns={purchaseCampaigns}
                totalLeads={totalLeads}
                totalPurchases={totalPurchases}
              />
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <Card className="p-5 md:p-6 h-full">
              <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-1">Currency mix</div>
              <div className="text-sm text-white/65 mb-4">INR · USD</div>
              <CurrencyMixChart
                totalINR={metrics.totalSpendINR}
                totalUSD={metrics.totalSpendUSD}
              />
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Card className="p-5 md:p-6 h-full">
              <div className="text-xs font-medium uppercase tracking-wider text-white/50 mb-1">Lowest CPL — INR</div>
              <div className="text-sm text-white/65 mb-4">Top 5 by lead-cost efficiency</div>
              <TopCampaignsChart
                title=""
                rows={top.lowestCPLINR.slice(0, 5)}
                metric="CPL"
                accent="purple"
              />
            </Card>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <AnimatedSection>
            <Card className="p-5 md:p-6 h-full">
              <TopCampaignsChart
                title="Top by spend (INR)"
                subtitle="Top 6"
                rows={top.bySpendINR.slice(0, 6)}
                metric="Spend"
                accent="pink"
              />
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <Card className="p-5 md:p-6 h-full">
              <TopCampaignsChart
                title="Top by CTR"
                subtitle="Top 6"
                rows={top.byCTR.slice(0, 6)}
                metric="CTR (link)"
                accent="cyan"
              />
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Card className="p-5 md:p-6 h-full">
              <TopCampaignsChart
                title="Top by reach"
                subtitle="Top 6"
                rows={top.byReach.slice(0, 6)}
                metric="Reach"
                accent="amber"
              />
            </Card>
          </AnimatedSection>
        </div>
      </Section>

      {/* Case Studies */}
      <Section
        eyebrow="Case studies"
        title="6 campaigns, each one a deliberate test."
        subtitle="Every case study is pinned to a specific campaign in my Meta Ads Manager. The objective, strategy, budget, results, and learnings are all there."
        aurora
        auroraVariant="warm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studies.studies.map((s, i) => (
            <CaseStudyCard key={s.slug} study={s} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/case-studies" variant="glass" iconRight={<ArrowRight className="h-4 w-4" />}>
            View all 6 case studies
          </Button>
        </div>
      </Section>

      {/* My Process */}
      <Section
        eyebrow="My Meta Ads Process"
        title="How I scale spend without resetting the learning phase."
        subtitle="Five steps, applied the same way to every campaign. The 20% step rule and the kill-threshold log are the two that actually compound over months."
        aurora
        auroraVariant="cool"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {process.steps.map((step, i) => (
            <ProcessStep key={step.id} step={step} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/process" variant="glass" iconRight={<ArrowRight className="h-4 w-4" />}>
            Read the full process
          </Button>
        </div>
      </Section>

      {/* Proof of Work preview */}
      <Section
        eyebrow="Proof of Work"
        title="The dashboards, the creatives, the playbooks."
        subtitle="Not the claims — the artifacts. 10 Meta Ads Manager dashboards, 6 winning creative samples, 4 process playbooks, all anonymized where required."
        aurora
        auroraVariant="default"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BarChart3, title: "Dashboards", count: 10, label: "Meta Ads Manager", gradient: "from-[#7c3aed] to-[#ec4899]" },
            { icon: ImageIcon, title: "Creatives", count: 6, label: "Winning variants", gradient: "from-[#ec4899] to-[#f59e0b]" },
            { icon: Layers, title: "Before / After", count: 4, label: "CPL / CTR deltas", gradient: "from-[#06b6d4] to-[#7c3aed]" },
            { icon: FileText, title: "Playbooks", count: 7, label: "Internal docs", gradient: "from-[#f59e0b] to-[#ec4899]" },
          ].map((b, i) => (
            <AnimatedSection key={b.title} delay={0.05 * i}>
              <Link href="/proof-of-work">
                <div className="group relative h-full rounded-2xl p-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
                  <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${b.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${b.gradient}`} />
                  <div className="relative">
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <b.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="font-mono text-3xl font-semibold text-white tracking-tight">{b.count}</div>
                    <div className="text-sm text-white/85 mt-1 font-medium">{b.title}</div>
                    <div className="text-xs text-white/50 mt-0.5">{b.label}</div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/proof-of-work" variant="glass" iconRight={<ArrowRight className="h-4 w-4" />}>
            See the full inventory
          </Button>
        </div>
      </Section>

      {/* Contact / CTA — premium gradient section */}
      <Section
        id="contact"
        eyebrow="Contact"
        title="Let&apos;s open the dashboards."
        subtitle="I&apos;m looking for Performance Marketing Lead / Senior Media Buyer roles where Meta spend is core and the test-and-scale discipline matters. Bengaluru or remote."
        aurora
        auroraVariant="default"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Email card */}
          <AnimatedSection>
            <div className="group relative h-full rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-[#7c3aed]/[0.15] to-[#ec4899]/[0.05] backdrop-blur-xl border border-white/[0.08] hover:border-[#7c3aed]/40 transition-all duration-500">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#7c3aed] to-[#ec4899] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-br from-[#7c3aed] to-[#ec4899]" />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center mb-5 shadow-lg shadow-[#7c3aed]/40 group-hover:scale-110 transition-transform duration-500">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <Badge variant="purple" size="sm" className="mb-3">Direct · 24h reply</Badge>
                <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                <p className="text-sm text-white/65 mb-6">Best for intros, role briefs, and formal conversations.</p>
                <div className="font-mono text-sm text-white/85 mb-6 break-all">ravi.marketiing@gmail.com</div>
                <Button
                  variant="primary"
                  href="mailto:ravi.marketiing@gmail.com?subject=Intro%20call%20-%20Performance%20Marketing"
                  size="md"
                  fullWidth
                >
                  <Mail className="h-4 w-4" />
                  Send email
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* LinkedIn card */}
          <AnimatedSection delay={0.05}>
            <div className="group relative h-full rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-[#06b6d4]/[0.15] to-[#7c3aed]/[0.05] backdrop-blur-xl border border-white/[0.08] hover:border-[#06b6d4]/40 transition-all duration-500">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-br from-[#06b6d4] to-[#7c3aed]" />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#06b6d4] to-[#7c3aed] flex items-center justify-center mb-5 shadow-lg shadow-[#06b6d4]/40 group-hover:scale-110 transition-transform duration-500">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
                <Badge variant="cyan" size="sm" className="mb-3">Profile · Endorsements</Badge>
                <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
                <p className="text-sm text-white/65 mb-6">Best for quick chat, referrals, and 1st-degree intros.</p>
                <div className="font-mono text-sm text-white/85 mb-6 break-all">linkedin.com/in/ravi-yadav-60b339336</div>
                <Button
                  variant="secondary"
                  href="https://www.linkedin.com/in/ravi-yadav-60b339336"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  fullWidth
                  iconRight={<ArrowRight className="h-4 w-4" />}
                >
                  <Linkedin className="h-4 w-4" />
                  Open LinkedIn
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Secondary CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="glass"
            href="/resume"
            icon={<Download className="h-4 w-4" />}
            size="lg"
          >
            Download resume (PDF)
          </Button>
          <Button
            variant="ghost"
            href="/case-studies"
            iconRight={<ArrowRight className="h-4 w-4" />}
            size="lg"
          >
            See the 6 case studies
          </Button>
        </div>

        {/* Trust line */}
        <AnimatedSection delay={0.2}>
          <div className="mt-10 max-w-2xl mx-auto p-4 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] flex items-start gap-3">
            <div className="shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white mb-0.5">Available for new roles</div>
              <div className="text-xs text-white/55">Open to Performance Marketing Lead / Senior Media Buyer roles · Bengaluru or remote · Available for 20-min intro calls within 24h.</div>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}