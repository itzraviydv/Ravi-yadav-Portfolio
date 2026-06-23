// scripts/build-resume.mjs
// Generates public/resume.pdf from scripts/resume-template.html using
// Microsoft Edge's headless print-to-PDF. Zero npm deps.
//
// Usage:
//   node scripts/build-resume.mjs
//
// Edit the template HTML and re-run to refresh the PDF.

import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const HTML = resolve(ROOT, "scripts", "resume-template.html");
const PDF = resolve(ROOT, "public", "resume.pdf");

// Locate Edge
const edgeCandidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const edge = edgeCandidates.find((p) => existsSync(p));
if (!edge) {
  console.error("Microsoft Edge not found. Install Edge or convert HTML to PDF another way.");
  process.exit(1);
}

if (!existsSync(HTML)) {
  console.error(`Template not found: ${HTML}`);
  process.exit(1);
}

const htmlUrl = "file:///" + HTML.replace(/\\/g, "/").replace(/ /g, "%20");
const cmd = `"${edge}" --headless --disable-gpu --no-sandbox --print-to-pdf="${PDF}" --no-pdf-header-footer "${htmlUrl}"`;

console.log("Building resume.pdf from resume-template.html...");
execSync(cmd, { stdio: "inherit" });

const size = statSync(PDF).size;
console.log(`✓ Wrote ${PDF} (${(size / 1024).toFixed(1)} KB)`);
