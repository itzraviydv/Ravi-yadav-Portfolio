// components/seo/JsonLd.tsx
// Server component — emits Person + Portfolio structured data for SEO.

interface JsonLdProps {
  type: "Person" | "WebSite" | "BreadcrumbList";
  // JSON-LD data is inherently schema.org-shaped, which is broader than any
  // narrow TS type. Using a `JsonValue` alias keeps the prop specific without
  // resorting to `any`.
  data: Record<string, unknown>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@type": type, ...data }),
      }}
    />
  );
}

export function PersonJsonLd() {
  return (
    <JsonLd
      type="Person"
      data={{
        name: "Ravi Yadav",
        jobTitle: "Performance Marketing Lead",
        description:
          "Performance Marketing Lead with 3+ years on Meta Ads Manager. 478 campaigns, ₹3.19Cr+ + $108K+ ad spend, 6 client accounts.",
        url: "https://raviyadav.com",
        sameAs: [
          "https://www.linkedin.com/in/ravi-yadav-60b339336",
        ],
        knowsAbout: [
          "Meta Ads",
          "Performance Marketing",
          "Media Buying",
          "Audience Testing",
          "Creative Strategy",
          "Looker Studio",
          "GA4",
          "Shopify",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Foremost Leads",
        },
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      type="WebSite"
      data={{
        name: "Ravi Yadav — Performance Marketing Portfolio",
        url: "https://raviyadav.com",
        description: "Portfolio, case studies, and proof of work from a Performance Marketing Lead specializing in Meta Ads.",
      }}
    />
  );
}