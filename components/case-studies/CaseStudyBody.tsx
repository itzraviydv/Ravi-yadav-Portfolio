// components/case-studies/CaseStudyBody.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/layout/Container";
import { GradientText } from "@/components/effects/GradientText";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { ScreenshotSlot } from "./ScreenshotSlot";
import { stripBlockquote, stripMd } from "@/lib/formatters";
import { type CaseStudy } from "@/lib/types";

interface CaseStudyBodyProps {
  study: CaseStudy;
  prev?: CaseStudy | null;
  next?: CaseStudy | null;
}

function renderMarkdown(s: string): string {
  return s
    .split("\n")
    .map((line) => {
      line = line.trim();
      if (!line) return "";
      if (line.startsWith("- ")) return `<li>${stripMd(line.slice(2))}</li>`;
      if (line.startsWith("> ")) return `<blockquote>${stripMd(line.slice(2))}</blockquote>`;
      if (/^\*\*[^*]+\*\*:/.test(line)) return `<p><strong>${line.split(":")[0].replace(/\*/g, "")}:</strong> ${stripMd(line.split(":").slice(1).join(":"))}</p>`;
      return `<p>${stripMd(line)}</p>`;
    })
    .join("\n")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/<p><\/p>/g, "");
}

export function CaseStudyBody({ study, prev, next }: CaseStudyBodyProps) {
  return (
    <div className="relative pt-32 pb-20">
      <AuroraBackground variant="subtle" />

      <Container className="relative">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs text-white/40 mb-6 font-mono"
        >
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          {" / "}
          <Link href="/case-studies" className="hover:text-white/70 transition-colors">Case Studies</Link>
          {" / "}
          <span className="text-white/70">{study.title}</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <Badge variant={study.currency === "USD" ? "cyan" : "purple"}>
              {study.currency}
            </Badge>
            <Badge variant="outline">{study.client}</Badge>
            <Badge variant="outline" size="sm">{study.window}</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white font-mono leading-[1.05]">
            <GradientText gradient="brand">{study.title}</GradientText>
          </h1>
          {study.tag && (
            <div className="mt-4 text-lg md:text-xl text-white/60">
              {study.tag}
            </div>
          )}
        </motion.div>

        {/* Objective */}
        <section className="mt-14 md:mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-5 bg-white/[0.04] border border-white/[0.08] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899]" />
            Objective
          </div>
          <div
            className="prose prose-invert prose-lg max-w-3xl
              prose-p:text-white/75 prose-p:leading-relaxed prose-p:my-3
              prose-li:text-white/75 prose-li:my-1
              prose-blockquote:border-l-[#7c3aed] prose-blockquote:text-white/70 prose-blockquote:font-normal prose-blockquote:bg-white/[0.02] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-strong:text-white prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(stripBlockquote(study.objective)) }}
          />
        </section>

        {/* Strategy */}
        <section className="mt-14 md:mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-5 bg-white/[0.04] border border-white/[0.08] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#ec4899] to-[#f59e0b]" />
            Strategy
          </div>
          <ul className="space-y-3 max-w-3xl">
            {study.strategy.map((s, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                <div className="font-mono text-sm text-transparent bg-clip-text bg-gradient-to-br from-[#7c3aed] to-[#ec4899] font-semibold w-7 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className="text-white/85 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: `<p>${stripMd(s).replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')}</p>` }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Budget */}
        {study.budget.length > 0 && (
          <section className="mt-14 md:mt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-5 bg-white/[0.04] border border-white/[0.08] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#7c3aed]" />
              Budget
            </div>
            <div className="rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/[0.08] max-w-3xl">
              <table className="w-full text-sm">
                <tbody>
                  {study.budget.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5 text-white/70 w-1/3 align-top">
                        <span dangerouslySetInnerHTML={{ __html: stripMd(row["Item"] || "") }} />
                      </td>
                      <td className="px-5 py-3.5 text-white font-mono">
                        <span dangerouslySetInnerHTML={{ __html: stripMd(row["Value"] || "") }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Results */}
        {study.results.length > 0 && (
          <section className="mt-14 md:mt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-5 bg-gradient-to-r from-[#7c3aed]/[0.1] to-[#ec4899]/[0.1] border border-[#7c3aed]/30 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899]" />
              Results
            </div>
            <div className="rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/[0.08] max-w-3xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    {Object.keys(study.results[0]).map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/60">
                        {stripMd(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {study.results.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                      {Object.entries(row).map(([, v], j) => (
                        <td
                          key={j}
                          className={`px-5 py-3.5 ${j === 0 ? "text-white/80" : "text-white font-mono"}`}
                        >
                          <span dangerouslySetInnerHTML={{ __html: stripMd(v) }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Screenshots */}
        <section className="mt-14 md:mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-2 bg-white/[0.04] border border-white/[0.08] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ec4899]" />
            Campaign Screenshots
          </div>
          <p className="text-sm text-white/55 mb-6 max-w-3xl">
            Real anonymized screenshots from Meta Ads Manager for this campaign.
            Currently placeholder slots — drop in the captured images to publish.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl">
            {Array.from({ length: 5 }).map((_, i) => (
              <ScreenshotSlot
                key={i}
                index={i + 1}
                total={5}
                label={study.screenshots[i] || [
                  "Campaign setup view (Ad Set 1)",
                  "Creative preview — winning variant",
                  "Performance breakdown — 7-day",
                  "Audience insights / breakdown",
                  "Spend / reach / frequency dashboard",
                ][i]}
              />
            ))}
          </div>
        </section>

        {/* Learnings */}
        {study.learnings.length > 0 && (
          <section className="mt-14 md:mt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-5 bg-white/[0.04] border border-white/[0.08] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4]" />
              Learnings
            </div>
            <ol className="space-y-4 max-w-3xl">
              {study.learnings.map((l, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-[#10b981]/30 transition-colors">
                  <div className="font-mono text-sm text-[#67e8f9] font-semibold w-7 shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="text-white/85 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: `<p>${stripMd(l).replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')}</p>` }}
                  />
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* My Contribution */}
        {study.contribution.length > 0 && (
          <section className="mt-14 md:mt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-5 bg-white/[0.04] border border-white/[0.08] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#7c3aed]" />
              My Contribution
            </div>
            <ul className="space-y-3 max-w-3xl">
              {study.contribution.map((c, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-[#7c3aed]/30 transition-colors">
                  <div className="font-mono text-sm text-[#a78bfa] font-semibold w-7 shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="text-white/85 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: `<p>${stripMd(c).replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')}</p>` }}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Prev/Next */}
        <nav className="mt-24 pt-8 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/case-studies/${prev.slug}`}
              className="group flex items-center gap-3 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md hover:border-white/[0.18] hover:bg-white/[0.04] transition-all"
            >
              <ArrowLeft className="h-4 w-4 text-white/40 group-hover:text-white group-hover:-translate-x-1 transition-all" />
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Previous</div>
                <div className="text-sm text-white/85 group-hover:text-white truncate max-w-[200px] mt-0.5">
                  {prev.title}
                </div>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/case-studies/${next.slug}`}
              className="group flex items-center justify-end gap-3 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md hover:border-white/[0.18] hover:bg-white/[0.04] transition-all text-right"
            >
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Next</div>
                <div className="text-sm text-white/85 group-hover:text-white truncate max-w-[200px] mt-0.5">
                  {next.title}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          ) : <div />}
        </nav>
      </Container>
    </div>
  );
}