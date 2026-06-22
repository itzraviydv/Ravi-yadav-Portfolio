// app/case-studies/page.tsx
import type { Metadata } from "next";
import { Section } from "@/components/effects/Section";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { getCaseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "6 deep-dive case studies pinned to specific campaigns in Meta Ads Manager.",
};

export default async function CaseStudiesIndex() {
  const studies = await getCaseStudies();
  return (
    <Section
      eyebrow="Case studies"
      title="6 campaigns, each one a deliberate test."
      subtitle="Each case study is pinned to a specific campaign in my Meta Ads Manager. Every budget, every CTR, every CPL is traceable."
      align="left"
      aurora
      auroraVariant="subtle"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studies.studies.map((s, i) => (
          <CaseStudyCard key={s.slug} study={s} index={i} />
        ))}
      </div>
    </Section>
  );
}