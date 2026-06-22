// components/effects/AuroraBackground.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  variant?: "default" | "warm" | "cool" | "subtle";
}

const VARIANTS = {
  default: [
    { color: "rgba(124, 58, 237, 0.6)", x: "10%", y: "20%", size: 600 },
    { color: "rgba(236, 72, 153, 0.5)", x: "75%", y: "10%", size: 500 },
    { color: "rgba(6, 182, 212, 0.45)", x: "50%", y: "75%", size: 700 },
    { color: "rgba(245, 158, 11, 0.3)", x: "85%", y: "85%", size: 400 },
  ],
  warm: [
    { color: "rgba(236, 72, 153, 0.55)", x: "20%", y: "20%", size: 600 },
    { color: "rgba(245, 158, 11, 0.45)", x: "70%", y: "30%", size: 500 },
    { color: "rgba(124, 58, 237, 0.4)", x: "40%", y: "80%", size: 600 },
  ],
  cool: [
    { color: "rgba(6, 182, 212, 0.55)", x: "20%", y: "30%", size: 600 },
    { color: "rgba(124, 58, 237, 0.5)", x: "70%", y: "20%", size: 500 },
    { color: "rgba(236, 72, 153, 0.3)", x: "50%", y: "75%", size: 700 },
  ],
  subtle: [
    { color: "rgba(124, 58, 237, 0.3)", x: "30%", y: "30%", size: 500 },
    { color: "rgba(6, 182, 212, 0.25)", x: "70%", y: "60%", size: 500 },
  ],
};

export function AuroraBackground({
  className,
  variant = "default",
}: AuroraBackgroundProps) {
  const blobs = VARIANTS[variant];
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 -z-10 overflow-hidden pointer-events-none", className)}
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(236,72,153,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Floating blurred blobs */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.1, 1],
            x: [0, i % 2 === 0 ? 40 : -40, 0],
            y: [0, i % 2 === 0 ? -30 : 30, 0],
          }}
          transition={{
            opacity: { duration: 1.5, delay: i * 0.1 },
            scale: { duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 18 + i * 3, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 22 + i * 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg-fine opacity-50" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5, 0, 16, 0.6) 90%)",
        }}
      />
    </div>
  );
}
