// app/not-found.tsx
import { Container } from "@/components/layout/Container";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { GradientText } from "@/components/effects/GradientText";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <AuroraBackground variant="subtle" />
      <Container className="text-center relative">
        <div className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3 font-mono">
          Error 404
        </div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
          That route doesn&apos;t <GradientText gradient="brand">exist</GradientText>.
        </h1>
        <p className="mt-6 text-lg text-white/65 max-w-xl mx-auto">
          The URL you tried isn&apos;t on this site. The dashboard screenshots might be, though.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button variant="glass" href="/case-studies">View case studies</Button>
        </div>
      </Container>
    </div>
  );
}