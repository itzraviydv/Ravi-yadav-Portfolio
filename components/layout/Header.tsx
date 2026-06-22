// components/layout/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/process", label: "Process" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/proof-of-work", label: "Proof" },
  { href: "/resume", label: "Resume" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 50], [0.0, 0.6]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.08]);

  return (
    <motion.header
      style={{
        backgroundColor: `rgba(5, 0, 16, ${bg})`,
        borderColor: `rgba(255,255,255,${borderOpacity})`,
      }}
      className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-xl transition-colors"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-[#7c3aed] via-[#ec4899] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#7c3aed]/30 transition-transform group-hover:scale-110">
            <span className="relative z-10">R</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#7c3aed] via-[#ec4899] to-[#06b6d4] blur-lg opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
          </div>
          <span className="font-semibold text-white hidden sm:inline tracking-tight">Ravi Yadav</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/[0.06]">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors",
                  active
                    ? "text-white"
                    : "text-white/60 hover:text-white",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed]/40 to-[#ec4899]/40 border border-white/10"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/ravi-yadav-60b339336"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-white/60 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <Link
            href="mailto:ravi.marketiing@gmail.com?subject=Intro%20call%20-%20Performance%20Marketing"
            className="inline-flex items-center h-9 px-4 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#7c3aed]/40 transition-all"
          >
            Hire me
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-lg text-white/70 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/[0.08] bg-[#0a0020]/95 backdrop-blur-xl"
          >
            <nav className="px-6 py-4 space-y-1">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      active
                        ? "text-white bg-gradient-to-r from-[#7c3aed]/20 to-[#ec4899]/20 border border-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/[0.04]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="https://www.linkedin.com/in/ravi-yadav-60b339336"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/70 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <Link
                href="mailto:ravi.marketiing@gmail.com"
                onClick={() => setOpen(false)}
                className="block mt-2 px-3 py-2.5 text-sm font-semibold text-center rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white"
              >
                Hire me
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}