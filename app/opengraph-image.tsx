// app/opengraph-image.tsx
// Dynamic OG image — edge runtime so it doesn't break on Windows.
export const runtime = "edge";

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ravi Yadav — Performance Marketing Lead";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          background: "linear-gradient(135deg, #000 0%, #0a0a0a 100%)",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(99,91,255,0.25), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 22,
              color: "#000",
            }}
          >
            R
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>Ravi Yadav</div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          I turn Meta spend into{" "}
          <span
            style={{
              background: "linear-gradient(120deg, #635BFF 0%, #00D4FF 50%, #00DC82 100%)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            measurable pipeline
          </span>
          .
        </div>

        {/* Stats */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          3.19Cr+ INR + $108K+ ad spend · 478 campaigns · 6 clients · 212K+ leads.
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 16,
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <div style={{ fontFamily: "ui-monospace, monospace" }}>raviyadav.com</div>
          <div>·</div>
          <div>Performance Marketing Lead</div>
          <div>·</div>
          <div>Meta Ads Specialist</div>
        </div>
      </div>
    ),
    size,
  );
}
