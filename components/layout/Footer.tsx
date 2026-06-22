// components/layout/Footer.tsx
import * as React from "react";
import Link from "next/link";
import { Linkedin, Mail, FileText, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";

const SOCIAL = [
  {
    href: "https://www.linkedin.com/in/ravi-yadav-60b339336",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:ravi.marketiing@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "/resume",
    label: "Resume",
    icon: FileText,
  },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/[0.06] overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
      />

      <Container>
        <div className="py-16 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#7c3aed] via-[#ec4899] to-[#06b6d4] flex items-center justify-center text-white font-bold text-base shadow-lg shadow-[#7c3aed]/30">
                R
              </div>
              <span className="font-semibold text-white text-lg">Ravi Yadav</span>
            </div>
            <p className="text-sm text-white/55 max-w-sm leading-relaxed">
              Performance Marketing Lead. 3+ years on Meta Ads Manager.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#f472b6] font-medium">
                478 campaigns
              </span>
              , 6 clients, ₹3.19Cr+ + $108K+ managed.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-white/40 mb-4 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899]" />
              Site
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/case-studies" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                Case Studies
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
              </Link></li>
              <li><Link href="/process" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                Process
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
              </Link></li>
              <li><Link href="/experience" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                Experience
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
              </Link></li>
              <li><Link href="/skills" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                Skills
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
              </Link></li>
              <li><Link href="/proof-of-work" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                Proof of Work
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
              </Link></li>
              <li><Link href="/resume" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                Resume
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
              </Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-white/40 mb-4 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#7c3aed]" />
              Connect
            </div>
            <ul className="space-y-2.5 text-sm">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors"
                  >
                    <span className="h-7 w-7 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#7c3aed]/30 group-hover:to-[#ec4899]/30 group-hover:border-transparent transition-all">
                      <s.icon className="h-3.5 w-3.5" />
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-white/[0.06] flex flex-col md:flex-row gap-3 items-start md:items-center justify-between text-xs text-white/40">
          <div>
            © 2026 Ravi Yadav. Built with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#f472b6] font-medium">
              data from 478 real campaigns
            </span>
            .
          </div>
          <div className="font-mono">
            Reporting window: 2025-01-01 → 2026-06-21
          </div>
        </div>
      </Container>
    </footer>
  );
}