// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Conditional classnames with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date for display. */
export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {
  year: "numeric", month: "long", day: "numeric",
}): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", opts);
  } catch {
    return iso;
  }
}

/** Smooth-step easing (Stripe-like). */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_STANDARD: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Counter animation: lerp from 0 -> target over `duration` ms. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}