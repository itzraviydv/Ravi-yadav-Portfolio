// app/proof-of-work/page.tsx
import type { Metadata } from "next";
import { Section } from "@/components/effects/Section";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { ArtifactCard } from "@/components/proof-of-work/ArtifactCard";
import { getProofOfWork } from "@/lib/data";

export const metadata: Metadata = {
  title: "Proof of Work",
  description: "The artifacts behind the numbers. 10 Meta Ads Manager dashboards, 6 winning creatives, 4 process playbooks.",
};

function inferType(title: string): "dashboard" | "creative" | "doc" | "before-after" {
  const t = title.toLowerCase();
  if (t.includes("creative") || t.includes("ad sample") || t.includes("video")) return "creative";
  if (t.includes("before") || t.includes("after") || t.includes("comparison")) return "before-after";
  if (t.includes("dashboard") || t.includes("manager") || t.includes("export")) return "dashboard";
  return "doc";
}

export default async function ProofOfWorkPage() {
  const pow = await getProofOfWork();
  return (
    <Section
      eyebrow="Proof of Work"
      title="The dashboards, the creatives, the playbooks."
      subtitle="Not the claims — the artifacts. Drop-in slots for screenshots of the actual work."
      aurora
      auroraVariant="default"
    >
      <div className="space-y-12">
        {pow.groups.map((group) => {
          const description = group.items.find((i) => typeof i === "string") as string | undefined;
          const rows = group.items.filter((i) => Array.isArray(i)) as string[][];
          return (
            <AnimatedSection key={group.order} as="div">
              <div className="flex items-baseline justify-between gap-2 mb-3">
                <h3 className="text-xl font-semibold text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#ec4899] font-mono">
                    {String(group.order).padStart(2, "0")}.
                  </span>{" "}
                  {group.title}
                </h3>
                <Badge variant="outline">{rows.length} artifacts</Badge>
              </div>
              {description && (
                <p className="text-sm text-white/55 mb-5 max-w-3xl">{description}</p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {rows.flat().slice(0, 8).map((label, i) => {
                  const title = (label || "").replace(/^#+\s*/, "").trim();
                  if (!title) return null;
                  return (
                    <ArtifactCard
                      key={`${group.order}-${i}`}
                      title={title}
                      description={`${group.title} · ${title}`}
                      type={inferType(group.title)}
                      index={i + 1}
                    />
                  );
                })}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </Section>
  );
}