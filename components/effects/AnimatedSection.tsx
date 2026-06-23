// components/effects/AnimatedSection.tsx
"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  margin?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  margin = "-10% 0px",
  as: Tag = "div",
}: AnimatedSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  // MarginType is a template-literal union; widening the prop to string keeps
  // the public API flexible. The cast below satisfies framer-motion's narrow type.
  const inView = useInView(ref, { once, margin: margin as `${number}% ${number}px` });
  // `motion[Tag]` returns a union of motion components; the dynamic indexing
  // pattern needs a cast. ESLint flags `any`, so use `unknown` and then narrow
  // it to the motion component type framer-motion expects at the JSX site.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion[Tag] as any;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
