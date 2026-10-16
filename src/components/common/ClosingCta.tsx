import { Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { DrawLine, Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";

type Link = { label: string; href: string };

export type ClosingCtaContent = {
  eyebrow: string;
  /** Heading; `accent` follows it in brand blue. */
  title: string;
  accent: string;
  text: string;
  points: string[];
  primary: Link;
  secondary: Link;
};

/**
 * Closing consultation section for service category pages. A centred
 * statement on white, framed by self-drawing brand rules, with a soft blue
 * halo behind the heading.
 */
export function ClosingCta({ content }: { content: ClosingCtaContent }) {
  return (
    <section className="relative overflow-hidden bg-white py-[clamp(4.5rem,9vw,8rem)]">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[min(56rem,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.06] blur-3xl"
      />
      <div className="container-site relative">
        <div className="mx-auto max-w-xs">
          <DrawLine className="bg-brand" />
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2.5 text-brand">
              <span aria-hidden className="size-2 rounded-full bg-brand" />
              {content.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-[clamp(2.4rem,5.6vw,4.9rem)] font-bold leading-[1.03] tracking-[-0.035em] text-ink">
              {content.title} <span className="text-brand">{content.accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-lead text-ink-muted">{content.text}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button href={content.primary.href} arrow>
                {content.primary.label}
              </Button>
              <Button href={content.secondary.href} variant="outline">
                {content.secondary.label}
              </Button>
            </div>
          </Reveal>
          <Stagger as="ul" className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3" stagger={0.08}>
            {content.points.map((p) => (
              <StaggerItem as="li" key={p} className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink-soft">
                <Check aria-hidden className="size-4 text-brand" />
                {p}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mx-auto mt-14 max-w-xs">
          <DrawLine className="bg-brand" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
