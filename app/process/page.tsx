// app/process/page.tsx
import type { Metadata } from "next";
import { Section } from "@/components/effects/Section";
import { ProcessStep } from "@/components/process/ProcessStep";
import { getProcess } from "@/lib/data";

export const metadata: Metadata = {
  title: "My Meta Ads Process",
  description: "Research → Creative Testing → Audience Testing → Scaling → Optimization. The 5-step process I apply to every campaign.",
};

export default async function ProcessPage() {
  const process = await getProcess();
  return (
    <Section
      eyebrow="My Meta Ads Process"
      title="Five steps, applied the same way to every campaign."
      subtitle="The 20% step rule and the kill-threshold log are the two that actually compound over months. The rest is hygiene."
      aurora
      auroraVariant="warm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {process.steps.map((step, i) => (
          <ProcessStep key={step.id} step={step} index={i} />
        ))}
      </div>
    </Section>
  );
}