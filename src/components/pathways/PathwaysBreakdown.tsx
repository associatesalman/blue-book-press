import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ppBreakdown } from "@/data/publishingPathways";

/**
 * 6 · Which pathway fits which author, as an editorial index: each row reads
 * "If you want …" on the left and links to the matching pathway(s) on the
 * right. A brand rule sweeps beneath the row on hover.
 */
export function PathwaysBreakdown() {
  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeader size="xl" eyebrow={ppBreakdown.eyebrow} title={ppBreakdown.title} />
          <Reveal delay={0.12}>
            <p className="text-lead text-ink-muted">{ppBreakdown.intro}</p>
          </Reveal>
        </div>

        <ol className="mt-12 border-b border-line lg:mt-16">
          {ppBreakdown.rows.map((row, i) => (
            <Reveal
              as="li"
              key={row.want}
              delay={0.05 * i}
              className="group relative grid gap-4 border-t border-line py-7 sm:py-8 md:grid-cols-[3.5rem_1fr_auto] md:items-center md:gap-8"
            >
              <span
                aria-hidden
                className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-x-100"
              />
              <span className="font-serif text-[0.95rem] font-semibold tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[clamp(1.7rem,3.4vw,2.75rem)] font-bold leading-tight tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-brand">
                <span className="mr-3 align-middle text-[0.8rem] font-bold uppercase tracking-[0.14em] text-ink-muted">If you want</span>
                {row.want}
              </p>
              <ul className="flex flex-wrap gap-2 md:justify-end">
                {row.pathways.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.href}
                      className="group/link inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.95rem] font-semibold text-ink transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
                    >
                      {p.title}
                      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
