// components/hero/Hero.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Linkedin, Mail, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { GradientText } from "@/components/effects/GradientText";
import { Button } from "@/components/ui/Button";
import { KpiGrid } from "./KpiGrid";
import { type HeadlineMetrics } from "@/lib/types";
import { fmtIntLakhCrore } from "@/lib/formatters";

interface HeroProps {
  metrics: HeadlineMetrics;
}

export function Hero({ metrics }: HeroProps) {
  return (
    <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <AuroraBackground variant="default" />

      <Container>
        <div className="max-w-4xl">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-white/80">
              Open to Performance Marketing Lead roles · Bengaluru / Remote
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-[1.02]"
          >
            I turn Meta spend<br />
            into <GradientText gradient="animated">measurable</GradientText>{" "}
            <GradientText gradient="brand">pipeline.</GradientText>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed"
          >
            <span className="text-white font-medium">Performance Marketing Lead</span>{" "}
            with <span className="font-mono text-white">{metrics.nCampaigns}+</span> campaigns managed
            across <span className="font-mono text-white">{metrics.nClients} clients</span>.
            {" "}<span className="font-mono text-[#a78bfa]">{fmtIntLakhCrore(metrics.totalLeads)} leads delivered</span>{" "}
            and{" "}
            <span className="font-mono text-[#f472b6]">{fmtIntLakhCrore(metrics.totalPurchases)} purchases attributed</span>{" "}
            — every number traceable to a real campaign in my Meta Ads Manager.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              href="mailto:ravi.marketiing@gmail.com?subject=Intro%20call%20-%20Performance%20Marketing"
              icon={<Mail className="h-4 w-4" />}
              glow
            >
              Book a 20-min intro call
            </Button>
            <Button
              size="lg"
              variant="glass"
              href="https://www.linkedin.com/in/ravi-yadav-60b339336"
              target="_blank"
              rel="noopener noreferrer"
              icon={<Linkedin className="h-4 w-4" />}
            >
              Open LinkedIn
              <ArrowRight className="h-4 w-4 ml-0.5 opacity-60" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              href="/resume"
              icon={<Download className="h-4 w-4" />}
            >
              Resume
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/40"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#a78bfa]" />
              3+ years on Meta Ads Manager
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ec4899]" />
              6 client accounts · 2 currencies
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#06b6d4]" />
              Spend-weighted reporting at every level
            </div>
          </motion.div>
        </div>

        {/* KPI Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-28"
        >
          <KpiGrid metrics={metrics} />
          <div className="mt-4 text-xs text-white/30 text-right font-mono">
            Reporting window: {metrics.reportingWindowStart} → {metrics.reportingWindowEnd}
            {" · "}spend-weighted across {metrics.nCampaigns} campaigns
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
