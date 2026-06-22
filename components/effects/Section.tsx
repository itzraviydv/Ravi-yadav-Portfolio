// components/effects/Section.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { AuroraBackground } from "./AuroraBackground";
import { SectionHeader } from "./SectionHeader";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Show an aurora glow background. */
  aurora?: boolean;
  /** Variant of the aurora glow. */
  auroraVariant?: "default" | "warm" | "cool" | "subtle";
  /** Children */
  children: React.ReactNode;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  aurora = false,
  auroraVariant = "default",
  children,
  className,
  containerSize = "xl",
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      {aurora && <AuroraBackground variant={auroraVariant} />}
      <Container size={containerSize}>
        {(eyebrow || title || subtitle) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title || ""}
            subtitle={subtitle}
            align={align}
          />
        )}
        {children}
      </Container>
    </section>
  );
}
