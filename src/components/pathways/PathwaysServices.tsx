import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { pathways } from "@/data/publishingPathways";
import { cn } from "@/lib/cn";

/**
 * 4 · All eight core services as layered cards: each card sits on a soft
 * brand-tinted "sheet" that slides out on hover, like a page lifting from a
 * stack. On wide screens alternate cards drop to form a gentle wave.
 */
export function PathwaysServices() {
  return (
    <section id="pathways" className="scroll-mt-[var(--spacing-header)] bg-white py-section">
      <div className="container-site">
        <SectionHeader
          size="xl"
          align="center"
          eyebrow="Core Publishing Services"
          title="Eight pathways. Each one handled with care."
          intro="Choose one pathway or combine several. Every service has its own page with the full process and answers to common questions."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5 xl:pb-10">
          {pathways.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal as="li" key={p.slug} delay={(i % 4) * 0.08} className={cn("flex", i % 2 === 1 && "xl:translate-y-10")}>
                <div className="group relative flex w-full">
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-3xl border border-brand/15 bg-brand/[0.04] transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-3 group-hover:translate-y-3"
                  />
                  <Link
                    href={p.href}
                    data-cursor="hover"
                    className="relative flex w-full flex-col rounded-3xl border border-line bg-white p-6 transition-[border-color,translate] duration-500 ease-[var(--ease-soft)] group-hover:-translate-y-1 group-hover:border-brand/60 sm:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-brand/20 text-brand transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <Icon aria-hidden className="size-5.5" />
                      </span>
                      <span className="font-serif text-[0.95rem] font-semibold tabular-nums text-ink-muted transition-colors duration-500 group-hover:text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[1.35rem] font-semibold leading-snug text-ink">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{p.text}</p>
                    <p className="mt-5 rounded-xl bg-brand/[0.05] px-4 py-3 text-[0.92rem] leading-snug text-ink-soft">
                      <span className="font-semibold text-brand">Best for · </span>
                      {p.useCase}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[0.95rem] text-ink-soft">
                          <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.95rem] font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
                      Learn more
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
