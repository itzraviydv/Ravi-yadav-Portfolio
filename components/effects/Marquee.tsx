// components/effects/Marquee.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  reverse?: boolean;
}

const speedMap = {
  slow: "60s",
  normal: "40s",
  fast: "20s",
};

export function Marquee({
  children,
  className,
  speed = "normal",
  pauseOnHover = true,
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-4 pr-4",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee ${speedMap[speed]} linear infinite${
            reverse ? " reverse" : ""
          }`,
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 gap-4 pr-4",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee ${speedMap[speed]} linear infinite${
            reverse ? " reverse" : ""
          }`,
        }}
        aria-hidden
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
