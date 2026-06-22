// components/effects/SiteBackground.tsx
// Unified animated background — used on every page.
// Combines: floating gradient orbs, dot grid, canvas particles, vignette, noise grain.
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Floating orbs (Framer Motion — GPU-composited, never layout-triggering)
// ---------------------------------------------------------------------------
const ORBS = [
  { color: "rgba(124,58,237,0.5)",  x: "8%",  y: "15%",  size: 520, duration: 22, delay: 0 },
  { color: "rgba(236,72,153,0.4)",  x: "72%", y: "8%",   size: 480, duration: 26, delay: -4 },
  { color: "rgba(6,182,212,0.35)",  x: "45%", y: "65%",  size: 600, duration: 30, delay: -8 },
  { color: "rgba(245,158,11,0.3)",  x: "82%", y: "75%",  size: 380, duration: 20, delay: -2 },
  { color: "rgba(16,185,129,0.25)", x: "20%", y: "80%",  size: 420, duration: 28, delay: -6 },
];

// ---------------------------------------------------------------------------
// Canvas particles hook
// ---------------------------------------------------------------------------
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>, count = 40) {
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle pool — tiny dots, two speed tiers
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,           // 0.4 – 1.6px
        o: Math.random() * 0.35 + 0.08,          // opacity 0.08 – 0.43
      });
    }

    // Soft purple-cyan palette
    const palette = [
      [124, 58, 237],   // purple
      [167, 139, 250],  // light purple
      [6, 182, 212],    // cyan
      [103, 232, 249],  // light cyan
      [236, 72, 153],   // pink (rare)
    ];

    let raf = 0;
    const LINK_DIST = 140;

    const tick = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      // Move & wrap
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;
      }

      // Connection lines (only between nearby pairs, O(n²) is fine for n=40)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.12;
            ctx!.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        const [r, g, b] = palette[Math.floor(Math.random() * palette.length)]; // stable per-frame
        ctx!.fillStyle = `rgba(${r},${g},${b},${p.o})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) raf = requestAnimationFrame(tick);

    const handler = () => {
      if (mq.matches) {
        cancelAnimationFrame(raf);
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };
    mq.addEventListener("change", handler);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", handler);
    };
  }, [canvasRef, count]);
}

// ---------------------------------------------------------------------------
// SiteBackground — drop-in for any page
// ---------------------------------------------------------------------------
interface SiteBackgroundProps {
  /** Number of particles (default 40). Set 0 to disable. */
  particleCount?: number;
  /** Show the dot-grid overlay. */
  dots?: boolean;
  /** Show the noise-grain overlay. */
  grain?: boolean;
  /** Extra class on the root. */
  className?: string;
}

export function SiteBackground({
  particleCount = 40,
  dots = true,
  grain = true,
  className,
}: SiteBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef, particleCount);

  return (
    <div
      aria-hidden
      className={cn("fixed inset-0 -z-50 pointer-events-none overflow-hidden", className)}
    >
      {/* 1. Base radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)," +
            "radial-gradient(ellipse 60% 50% at 80% 100%, rgba(236,72,153,0.08) 0%, transparent 70%)",
        }}
      />

      {/* 2. Floating gradient orbs — GPU-composited only (transform + opacity) */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(90px)",
            willChange: "transform",
          }}
          animate={{
            x: [0, i % 2 === 0 ? 35 : -35, 0],
            y: [0, i % 2 === 0 ? -25 : 30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 3. Dot grid — masked for depth */}
      {dots && (
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 30%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 30%, black 20%, transparent 70%)",
          }}
        />
      )}

      {/* 4. Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-70"
        style={{ width: "100%", height: "100%" }}
      />

      {/* 5. Vignette — keeps focus on center content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 40%, transparent 30%, rgba(5,0,16,0.7) 100%)",
        }}
      />

      {/* 6. Noise grain (CSS-only, no JS) */}
      {grain && (
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
