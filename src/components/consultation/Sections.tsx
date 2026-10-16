import type { ReactNode } from "react";
import { Accordion, type AccordionItem } from "@/components/common/Accordion";
import { Reveal } from "@/components/common/Reveal";
import { LineReveal } from "@/components/portfolio/motion";

type Step = { title: string; text: string };

function Heading({ id, label, title, intro }: { id: string; label: string; title: string; intro?: string }) {
  return (
    <div className="lg:col-span-4">
      <p className="eyebrow flex items-center gap-3 text-brand">
        <span aria-hidden className="h-0.5 w-8 bg-brand" />
        {label}
      </p>
      <LineReveal id={id} className="mt-5 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink" lines={[title]} />
      {intro && (
        <Reveal delay={0.1} y={14}>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Numbered editorial list of steps — rows separated by rules, no cards. */
export function NumberedSteps({
  id,
  label,
  title,
  intro,
  steps,
  children,
  tone = "white",
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  steps: Step[];
  children?: ReactNode;
  tone?: "white" | "mist";
}) {
  return (
    <section aria-labelledby={id} className={tone === "mist" ? "bg-mist py-section" : "border-t border-line bg-white py-section"}>
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Heading id={id} label={label} title={title} intro={intro} />
        <div className="lg:col-span-8">
          <ol className="border-t-2 border-ink">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.06}
                y={16}
                className="grid gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[4.5rem_minmax(0,15rem)_minmax(0,1fr)]"
              >
                <span aria-hidden className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-none tabular-nums text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.3rem] leading-snug text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="text-[1.02rem] leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Short FAQ block: heading on the left, simple accordion on the right. */
export function FaqBlock({ id, label, title, intro, items }: { id: string; label: string; title: string; intro?: string; items: AccordionItem[] }) {
  return (
    <section aria-labelledby={id} className="border-t border-line bg-white py-section">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Heading id={id} label={label} title={title} intro={intro} />
        <Reveal className="lg:col-span-8" delay={0.1} y={18}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
