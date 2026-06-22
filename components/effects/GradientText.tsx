// components/effects/GradientText.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type Gradient = "brand" | "rainbow" | "purple-pink" | "cyan-amber" | "animated";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  gradient?: Gradient;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  children: React.ReactNode;
}

const gradientClass: Record<Gradient, string> = {
  brand: "text-gradient-brand",
  rainbow: "text-gradient-rainbow",
  "purple-pink": "text-gradient-purple-pink",
  "cyan-amber": "text-gradient-cyan-amber",
  animated: "text-gradient-animated",
};

export function GradientText({
  gradient = "brand",
  as: Tag = "span",
  className,
  children,
  ...props
}: GradientTextProps) {
  return (
    <Tag className={cn(gradientClass[gradient], className)} {...props}>
      {children}
    </Tag>
  );
}
