// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/data";

const SITE = "https://raviyadav.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllCaseStudySlugs();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/skills`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/proof-of-work`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE}/case-studies/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}