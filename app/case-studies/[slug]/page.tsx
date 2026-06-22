// app/case-studies/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyBody } from "@/components/case-studies/CaseStudyBody";
import { getAllCaseStudySlugs, getCaseStudy, getCaseStudies } from "@/lib/data";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: study.title,
    description: `${study.client} · ${study.tag}. ${study.currency} campaign with full objective, strategy, budget, results, learnings, and my contribution.`,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const all = await getCaseStudies();
  const idx = all.studies.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? all.studies[idx - 1] : null;
  const next = idx < all.studies.length - 1 ? all.studies[idx + 1] : null;

  return (
    <>
      <CaseStudyBody study={study} prev={prev} next={next} />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://raviyadav.com" },
            { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://raviyadav.com/case-studies" },
            { "@type": "ListItem", position: 3, name: study.title, item: `https://raviyadav.com/case-studies/${study.slug}` },
          ],
        }}
      />
    </>
  );
}