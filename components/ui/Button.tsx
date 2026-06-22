// components/ui/Button.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"        // gradient purple→pink
  | "secondary"      // gradient cyan→purple
  | "outline"        // glass outline
  | "ghost"          // text only
  | "amber"          // gradient pink→amber
  | "glass";         // glass card

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  glow?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white shadow-[0_8px_32px_-8px_rgba(124,58,237,0.6)] hover:shadow-[0_12px_48px_-8px_rgba(236,72,153,0.7)]",
  secondary:
    "bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] text-white shadow-[0_8px_32px_-8px_rgba(6,182,212,0.5)] hover:shadow-[0_12px_48px_-8px_rgba(6,182,212,0.7)]",
  amber:
    "bg-gradient-to-r from-[#ec4899] to-[#f59e0b] text-white shadow-[0_8px_32px_-8px_rgba(245,158,11,0.5)] hover:shadow-[0_12px_48px_-8px_rgba(245,158,11,0.7)]",
  glass:
    "bg-white/[0.04] backdrop-blur-md text-white border border-white/10 hover:bg-white/[0.08] hover:border-white/20",
  outline:
    "bg-transparent text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.04]",
  ghost: "text-white/70 hover:text-white hover:bg-white/5",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg gap-1.5",
  md: "h-11 px-5 text-[15px] rounded-xl gap-2",
  lg: "h-13 px-6 text-base rounded-xl gap-2.5",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  fullWidth,
  href,
  target,
  rel,
  download,
  glow = false,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050010]",
    "disabled:opacity-50 disabled:cursor-not-allowed select-none",
    "active:scale-[0.98]",
    variantClass[variant],
    sizeClass[size],
    fullWidth && "w-full",
    glow && "ring-1 ring-white/10",
    className,
  );

  const inner = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        download={download}
        className={cls}
      >
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {inner}
    </button>
  );
}
