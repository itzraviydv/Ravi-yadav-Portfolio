// components/effects/AnimatedNumber.tsx
"use client";

import * as React from "react";
import { useInView } from "framer-motion";
import { easeOutCubic } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  locale?: string;
  className?: string;
  /** Use a formatter that receives the current animated value. */
  format?: (n: number) => string;
  /** Render as a string when value is 0 to avoid empty first frame. */
  placeholder?: string;
}

export function AnimatedNumber({
  value,
  duration = 1500,
  decimals = 0,
  locale = "en-IN",
  className,
  format,
  placeholder = "0",
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [v, setV] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      setV(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setV(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const display = v === 0 && placeholder !== "0"
    ? placeholder
    : format
      ? format(v)
      : v.toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
